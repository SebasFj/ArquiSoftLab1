import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home'
import Customers from "./pages//Customers/Customers";
import Transactions from "./pages/Transactions/Transactions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

export default App;