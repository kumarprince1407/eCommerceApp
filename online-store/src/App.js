//App.js
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Home from "./components/Home";
import CartDetails from "./components/CartDetails";
import { Routes, Route } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import PaymentsPage from "./components/PaymentsPage";
//Add filtering
function App() {
  const [searchInput, setSearchInput] = useState(""); //Adding state for search input

  return (
    <>
      <Header setSearchInput={setSearchInput} />
      <Routes>
        <Route path="/" element={<Home searchInput={searchInput} />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route path="/payment_options" element={<PaymentsPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
