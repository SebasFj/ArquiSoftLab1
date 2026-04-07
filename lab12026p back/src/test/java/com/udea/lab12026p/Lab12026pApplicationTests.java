package com.udea.lab12026p;

import com.udea.lab12026p.dto.TransactionDTO;
import com.udea.lab12026p.entity.Customer;
import com.udea.lab12026p.repository.CustomerRepository;
import com.udea.lab12026p.repository.TransactionRepository;
import com.udea.lab12026p.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.concurrent.CountDownLatch;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class Lab12026pApplicationTests {

	@Autowired
	private TransactionService transactionService;

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private TransactionRepository transactionRepository;

	@BeforeEach
	void setUp() {
		// Limpia la base de datos antes de cada test
		transactionRepository.deleteAllInBatch();
		customerRepository.deleteAllInBatch();

		// Crear cuentas de prueba
		Customer c1 = new Customer();
		c1.setAccountNumber("A1");
		c1.setFirstName("Juan");
		c1.setLastName("Perez");
		c1.setBalance(1000.0);

		Customer c2 = new Customer();
		c2.setAccountNumber("A2");
		c2.setFirstName("Maria");
		c2.setLastName("Gomez");
		c2.setBalance(500.0);

		customerRepository.save(c1);
		customerRepository.save(c2);
	}

	@Test
	void transferenciaExitosa() {
		TransactionDTO dto = new TransactionDTO();
		dto.setSenderAccountNumber("A1");
		dto.setReceiverAccountNumber("A2");
		dto.setAmount(200.0);
		dto.setTimestamp(LocalDateTime.now());

		TransactionDTO result = transactionService.transferMoney(dto);

		assertNotNull(result.getId());

		Customer sender = customerRepository.findByAccountNumber("A1").get();
		Customer receiver = customerRepository.findByAccountNumber("A2").get();

		assertEquals(800.0, sender.getBalance());
		assertEquals(700.0, receiver.getBalance());
	}

	@Test
	void saldoInsuficiente() {
		TransactionDTO dto = new TransactionDTO();
		dto.setSenderAccountNumber("A1");
		dto.setReceiverAccountNumber("A2");
		dto.setAmount(5000.0);

		Exception exception = assertThrows(IllegalArgumentException.class, () -> {
			transactionService.transferMoney(dto);
		});

		assertEquals("Saldo insuficiente en la cuenta del remitente.", exception.getMessage());
	}

	@Test
	void cuentaNoExiste() {
		TransactionDTO dto = new TransactionDTO();
		dto.setSenderAccountNumber("NO_EXISTE");
		dto.setReceiverAccountNumber("A2");
		dto.setAmount(100.0);

		assertThrows(IllegalArgumentException.class, () -> {
			transactionService.transferMoney(dto);
		});
	}

	@Test
	void concurrenciaTransferencias_detectaRaceCondition() throws InterruptedException {

		int numThreads = 2;
		CountDownLatch ready = new CountDownLatch(numThreads);
		CountDownLatch start = new CountDownLatch(1);
		CountDownLatch done = new CountDownLatch(numThreads);

		Runnable task = () -> {
			try {
				ready.countDown();     // listo
				start.await();         // espera disparo

				TransactionDTO dto = new TransactionDTO();
				dto.setSenderAccountNumber("A1");
				dto.setReceiverAccountNumber("A2");
				dto.setAmount(300.0);

				transactionService.transferMoney(dto);

			} catch (Exception e) {
				// esperado si hay @Version
				System.out.println("Excepción: " + e.getClass().getSimpleName());
			} finally {
				done.countDown();
			}
		};

		new Thread(task).start();
		new Thread(task).start();

		ready.await();   // esperar que ambos estén listos
		start.countDown(); // lanzar ambos
		done.await();    // esperar que terminen

		Customer sender = customerRepository.findByAccountNumber("A1").get();
		Customer receiver = customerRepository.findByAccountNumber("A2").get();

		double senderBalance = sender.getBalance();
		double receiverBalance = receiver.getBalance();

		System.out.println("Sender: " + senderBalance);
		System.out.println("Receiver: " + receiverBalance);

		// 🔥 VALIDACIÓN REAL

		boolean caso1 = senderBalance == 700.0 && receiverBalance == 800.0;
		boolean caso2 = senderBalance == 400.0 && receiverBalance == 1100.0;

		assertTrue(caso1 || caso2,
				"Race condition detectado: estado inconsistente -> sender="
						+ senderBalance + ", receiver=" + receiverBalance);
	}
}