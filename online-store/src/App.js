//App.js
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Home from "./components/Home";
import CartDetails from "./components/CartDetails";
import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import PaymentsPage from "./components/PaymentsPage";
import UserInfo from "./components/UserInfo";
import LoginRegister from "./components/LoginRegister";
import AccountDetails from "./components/AccountDetails";

import { AuthProvider } from "./components/AuthContext.js"; //Step 2: Wrap your App with AuthProvider(For fetching user email for Firebase server)
import EditAccountDetails from "./components/EditAccountDetails.jsx";

//Add filtering
function App() {
  const [searchInput, setSearchInput] = useState(""); //Adding state for managing search input

  return (
    <AuthProvider>
      <>
        <Header setSearchInput={setSearchInput} />
        <Routes>
          <Route path="/" element={<LoginRegister />} />

          <Route path="/login" element={<LoginRegister />} />
          <Route path="/register" element={<LoginRegister />} />

          <Route path="/home" element={<Home searchInput={searchInput} />} />
          <Route path="/account/edit/:id" element={<EditAccountDetails />} />

          {/* <Route path="/userInfo" element={<UserInfo />} /> */}
          <Route path="/cart" element={<CartDetails />} />
          <Route path="/payment_options" element={<PaymentsPage />} />
          <Route path="/account/:id" element={<AccountDetails />} />
        </Routes>
        <Toaster />
      </>
    </AuthProvider>
  );
}

export default App;
