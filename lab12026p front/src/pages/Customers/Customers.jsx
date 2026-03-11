import { useState } from "react";
import api from "../../services/api";
import "./Customers.css";

function Customers() {

  const [customers, setCustomers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchError, setSearchError] = useState("")

  const [newCustomer, setNewCustomer] = useState({
    accountNumber: "",
    firstName: "",
    lastName: "",
    balance: ""
  });

  const [errors, setErrors] = useState({
    accountNumber: "",
    firstName: "",
    lastName: "",
    balance: ""
  });


  const validate = (name, value) => {

    let error = "";

    if (name === "accountNumber") {
      if (!/^[0-9]+$/.test(value)) {
        error = "Account number must contain only numbers";
      }
    }

    if (name === "firstName" || name === "lastName") {
      if (!/^[A-Za-z]+$/.test(value)) {
        error = "Only letters allowed";
      }
    }

    if (name === "balance") {
      if (!/^[0-9]+(\.[0-9]+)?$/.test(value)) {
        error = "Balance must be a valid number";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };


  const handleChange = (e) => {

    const { name, value } = e.target;

    setNewCustomer((prev) => ({
      ...prev,
      [name]: value
    }));

    validate(name, value);
  };


  const getAllCustomers = async () => {
    try {
      const response = await api.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const searchCustomer = async () => {
    setCustomers([])
    try {
        const response = await api.get(`/customers/${searchId}`);
        setCustomers([response.data]);
        setSearchError("")
    } catch (error) {
      console.error(error);
      if (!/^[0-9]+$/.test(searchId)){
        setSearchError("The ID to search must be a number")
      }else{
        setSearchError("Customer not found")
      }
    }
  };


  const createCustomer = async () => {
    
    try {
      if (!Object.values(newCustomer).every(valor=>valor==="")){
          const payload = {
            ...newCustomer,
            balance: parseFloat(newCustomer.balance)
          };
    
          await api.post("/customers", payload);
    
          alert("Customer created");
    
          setNewCustomer({
            accountNumber: "",
            firstName: "",
            lastName: "",
            balance: ""
          });
      }
    } catch (error) {
      console.error(error);
    }
  };


  const hasErrors =
    errors.accountNumber ||
    errors.firstName ||
    errors.lastName ||
    errors.balance;


  return (
    <div className="customers-container">

      <h1>Customers</h1>


      {/* CREATE CUSTOMER */}

      <div className="section">

        <h2>Create Customer</h2>

        <input
          name="accountNumber"
          placeholder="Account Number"
          value={newCustomer.accountNumber}
          onChange={handleChange}
        />
        <span className="error">{errors.accountNumber}</span>


        <input
          name="firstName"
          placeholder="First Name"
          value={newCustomer.firstName}
          onChange={handleChange}
        />
        <span className="error">{errors.firstName}</span>


        <input
          name="lastName"
          placeholder="Last Name"
          value={newCustomer.lastName}
          onChange={handleChange}
        />
        <span className="error">{errors.lastName}</span>


        <input
          name="balance"
          placeholder="Balance"
          value={newCustomer.balance}
          onChange={handleChange}
        />
        <div className="error">{errors.balance}</div>


        <button onClick={createCustomer} disabled={hasErrors}>
          Create
        </button>

      </div>


      {/* SEARCH CUSTOMER */}

      <div className="section">

        <h2>Search Customer by ID</h2>

        <input
          placeholder="Customer ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <div className="error">{searchError}</div>

        <button onClick={searchCustomer} disabled={!searchId.length}>
          Search
        </button>

      </div>


      {/* GET ALL CUSTOMERS */}

      <div className="section">

        <button onClick={getAllCustomers}>
          Get All Customers
        </button>

      </div>


      {/* TABLE */}

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>Account Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>

          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.accountNumber}</td>
              <td>{c.firstName}</td>
              <td>{c.lastName}</td>
              <td>{c.balance}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Customers;