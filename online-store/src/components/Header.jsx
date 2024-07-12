//Header.jsx
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import Logout from "./Logout";

// Add Filtering
const Header = ({ setSearchInput }) => {
  //Accepting the setSearchInput as prop

  const { pathname } = useLocation(); //Get current path

  //For  displaying cart items count in the 'cart icon' present inside the header
  const { carts } = useSelector((state) => state.allCart);
  console.log(carts);
  //
  return (
    <>
      <Navbar style={{ height: "70px", background: "black", color: "white" }}>
        <Container>
          <NavLink to="/home" className="text-decoration-none text-light mx-2">
            <h3 className="text-light">Online store</h3>
          </NavLink>
          {pathname === "/home" && (
            <SearchBar setSearchInput={setSearchInput} />
          )}{" "}
          {/* Pass setSearchInput as prop */}
          {pathname === "/home" && (
            <NavLink
              to="/cart"
              className="text-decoration-none text-light mx-2"
            >
              <div id="ex4">
                <span
                  className="p1 fa-stack fa-2x has-badge"
                  data-count={carts.length}
                >
                  <i class="fa-solid fa-cart-shopping"></i>
                </span>
              </div>
            </NavLink>
          )}
          {pathname !== "/" && <Logout />}{" "}
          {/* <NavLink to="/cart" className="text-decoration-none text-light mx-2">
            <div id="ex4">
              <span
                className="p1 fa-stack fa-2x has-badge"
                data-count={carts.length}
              >
                <i class="fa-solid fa-cart-shopping"></i>
              </span>
            </div>
          </NavLink> */}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
