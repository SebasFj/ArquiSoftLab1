package com.udea.lab12026p.mapper;

import com.udea.lab12026p.dto.TransactionDTO;
import com.udea.lab12026p.entity.Transaction;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-03T23:20:34-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23.0.1 (Oracle Corporation)"
)
public class TransactionMapperImpl implements TransactionMapper {

    @Override
    public TransactionDTO toDTO(Transaction transaction) {
        if ( transaction == null ) {
            return null;
        }

        TransactionDTO transactionDTO = new TransactionDTO();

        transactionDTO.setId( transaction.getId() );
        transactionDTO.setSenderAccountNumber( transaction.getSenderAccountNumber() );
        transactionDTO.setReceiverAccountNumber( transaction.getReceiverAccountNumber() );
        transactionDTO.setAmount( transaction.getAmount() );
        transactionDTO.setTimestamp( transaction.getTimestamp() );

        return transactionDTO;
    }
}
