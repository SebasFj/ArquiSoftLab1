import { FaUsers, FaMoneyCheckAlt } from "react-icons/fa";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="container">

      <h1 className="title">Bank App</h1>
      <p className="subtitle">Customer and transaction management</p>

      <div className="cards">

        <div 
          className="card"
          onClick={() => navigate("/customers")}
        >
          <FaUsers className="icon"/>
          <h2>Customers</h2>
          <p>View, search or create customers</p>
        </div>

        <div 
          className="card"
          onClick={() => navigate("/transactions")}
        >
          <FaMoneyCheckAlt className="icon"/>
          <h2>Transactions</h2>
          <p>Create or search transactions</p>
        </div>

      </div>

    </div>
  );
}

export default Home;