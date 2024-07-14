// //Home.jsx

import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardsData from "./CardsData";
import { addToCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Spinner from "react-bootstrap/Spinner";

const Home = ({ searchInput }) => {
  const [cartData, setCartData] = useState(CardsData);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  //change
  //const [isSmallScreen, setIsSmallScreen] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsSmallScreen(window.innerWidth <= 500 && window.innerHeight <= 850);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   handleResize();

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); //Set loading to false after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchInput === "") {
      setCartData(CardsData);
    } else {
      const filteredData = CardsData.filter((item) => {
        if (item.dish && typeof item.dish === "string") {
          return item.dish.toLowerCase().startsWith(searchInput.toLowerCase());
        } else {
          console.error(
            "Item with undefined or non-string dish attribute found:",
            item
          );
          return false;
        }
      });

      setCartData(filteredData);
    }
  }, [searchInput]);

  const send = (e) => {
    dispatch(addToCart(e));
    toast.success("Item added to cart");
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <span className="ml-2">Loading...</span>
        <Spinner
          animation="border"
          style={{ width: "3rem", height: "3rem" }}
          variant="success"
        />
      </div>
    );
  }

  return (
    <>
      <section className="item_section mt-4 container">
        <h2 className="px-4" style={{ fontWeight: 350 }}>
          Choose from a variety of dishes
        </h2>
        <div className="row mt-2 d-flex justify-content-around align-items-center">
          {cartData.map((element, index) => (
            <Card
              key={index}
              style={{ width: "20rem", height: "auto", border: "none" }}
              className="hove mb-4"
              // className={`hove mb-4 ${isSmallScreen ? "responsive-card" : ""}`}
            >
              <Card.Img variant="top" className="cd" src={element.imgdata} />
              <div className="card_body">
                <div className="upper_data d-flex justify-content-between align-items-center">
                  <h4 className="mt-1">{element.dish}</h4>
                  <span>{element.rating}&nbsp;★</span>
                </div>
                <div className="lower_data d-flex justify-content-between">
                  <h5>{element.address}</h5>
                  <span>300</span>
                </div>
                <div className="extra"></div>
                <div className="last_data d-flex justify-content-between align-items-center">
                  <img src={element.imgdata} className="limg" alt=""></img>
                  <Button
                    style={{
                      minWidth: "13vw",
                      maxWidth: "120px",
                      background: "#ff3054db",
                      border: "none",
                    }}
                    variant="outline-light"
                    className="mt-2 mb-2"
                    onClick={() => send(element)}
                  >
                    Add To Cart
                  </Button>
                  <img src={element.delimg} className="laimg" alt=""></img>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
