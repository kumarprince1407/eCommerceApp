//Header.jsx
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  //For  displaying cart items count in the 'cart icon' present inside the header
  const { carts } = useSelector((state) => state.allCart);
  console.log(carts);
  //
  return (
    <>
      <Navbar style={{ height: "70px", background: "black", color: "white" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-2">
            <h3 className="text-light">Online store</h3>
          </NavLink>
          <SearchBar />
          <NavLink to="/cart" className="text-decoration-none text-light mx-2">
            <div id="ex4">
              <span
                className="p1 fa-stack fa-2x has-badge"
                data-count={carts.length}
              >
                <i class="fa-solid fa-cart-shopping"></i>
              </span>
            </div>
          </NavLink>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
