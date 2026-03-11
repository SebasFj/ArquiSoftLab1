import { useState } from "react";
import api from "../../services/api";
import "./Transactions.css";

function Transactions() {

  const [transactions, setTransactions] = useState([]);

  const [accountSearch, setAccountSearch] = useState("");
  const [searchError, setSearchError] = useState("");

  const [newTransaction, setNewTransaction] = useState({
    senderAccountNumber: "",
    receiverAccountNumber: "",
    amount: ""
  });

  const [errorTransaction, setErrorTransaction] = useState({
    senderAccountNumber: "",
    receiverAccountNumber: "",
    amount:""
  })

  const [createTransactionError, setCreateTransactionError] = useState("")

  const handleChange = (e) => {
    setCreateTransactionError("")
    const {value, name} = e.target
    setNewTransaction((prev)=>({
        ...prev,
        [name]: value
    }))
    if ((name === "amount" && !/^[0-9]+(\.[0-9]+)?$/.test(value)) ||
         (!/^[0-9]+$/.test(value) && name != "amount")
        ){
        setErrorTransaction((prev)=>({
            ...prev,
            [name]: `This field must be a number`
        }))
    }else{
        setErrorTransaction((prev)=>({
            ...prev,
            [name]:""
        }))
    }
  }


  const createTransaction = async () => {

    try {
      if (!Object.values(newTransaction).every(value=>value==="")){
          const payload = {
            ...newTransaction,
            amount: parseFloat(newTransaction.amount)
          };
    
          await api.post("/transactions", payload);
    
          alert("Transaction created");
    
          setNewTransaction({
            senderAccountNumber: "",
            receiverAccountNumber: "",
            amount: ""
          });
        setCreateTransactionError("")
      }

    } catch (error) {
      console.error(error);
      if(error.response.data){
        setCreateTransactionError(error.response.data)
      }
    }

  };


  const searchTransactions = async () => {

    try {

      setSearchError("");

      const response = await api.get(
        `/transactions/${accountSearch}`
      );

      setTransactions(response.data);
      if (!response.data.length){
        alert("Transactions not found")
      }

    } catch (error) {

      setTransactions([]);

      if (error.response) {
        setSearchError(error.response.data);
      }

    }

    
};

  const hasErrors = 
    errorTransaction.senderAccountNumber ||
    errorTransaction.receiverAccountNumber ||
    errorTransaction.amount

  return (
    <div className="transactions-container">

      <h1>Transactions</h1>


      {/* CREATE TRANSACTION */}

      <div className="section">

        <h2>Create Transaction</h2>

        <input
          name="senderAccountNumber"
          placeholder="Sender Account Number"
          value={newTransaction.senderAccountNumber}
          onChange={handleChange}
        />

        <input
          name="receiverAccountNumber"
          placeholder="Receiver Account Number"
          value={newTransaction.receiverAccountNumber}
          onChange={handleChange}
        />

        <input
          name="amount"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={handleChange}
        />

        <button onClick={createTransaction} disabled={hasErrors || !newTransaction.senderAccountNumber || !newTransaction.receiverAccountNumber || !newTransaction.amount}>
          Create
        </button>
        <div className="error">{createTransactionError}</div>

      </div>


      {/* SEARCH BY ACCOUNT */}

      <div className="section">

        <h2>Search by Account Number</h2>

        <input
          placeholder="Account Number"
          value={accountSearch}
          onChange={(e) => {
            setAccountSearch(e.target.value);
            setSearchError("");
          }}
        />

        <button onClick={searchTransactions}>
          Search
        </button>

        <span className="error">{searchError}</span>

      </div>


      {/* TABLE */}

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>

          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.senderAccountNumber}</td>
              <td>{t.receiverAccountNumber}</td>
              <td>{t.amount}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Transactions;