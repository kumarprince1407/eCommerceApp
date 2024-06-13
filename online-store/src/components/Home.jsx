import React, { useState } from "react";
import "./style.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardData from "./CardData";

const Home = () => {
  console.log("Card data: ", CardData);
  const [cartData, setCartData] = useState(CardData);
  return (
    <>
      <section className="item_section mt-4 container">
        <h2 className="px-4" style={{ fontWeight: 400 }}>
          Choose from a variet of dishes
        </h2>
        <div className="row mt-2 d-flex justify-content-around align-items-center">
          {cartData.map((element, index) => {
            return (
              <>
                <Card
                  style={{ width: "22rem", border: "none" }}
                  className="hove mb-4"
                >
                  {/* <Card.Img variant="top" className="cd" src="/logo192.png" /> */}
                  <Card.Img
                    variant="top"
                    className="cd"
                    src={element.imgdata}
                  />

                  <div className="card_body">
                    <div className="upper_data d-flex justify-content-between align-items-center">
                      {/* <h4 className="mt-2">Punjabi</h4> */}
                      <h4 className="mt-2">{element.dish}</h4>

                      <span>{element.rating}&nbsp;★</span>
                    </div>
                    <div className="lower_data d-flex justify-content-between">
                      {/* <h5>North Indian, Biryani, Mughlai</h5> */}
                      <h5>{element.address}</h5>

                      <span>300</span>
                    </div>
                    <div className="extra"></div>
                    <div className="last_data d-flex justify-content-between align-items-center">
                      {/* <img src="/logo192.png" className="limg" alt=""></img> */}
                      <img src={element.imgdata} className="limg" alt=""></img>

                      <Button
                        style={{
                          width: "150px",
                          background: "#ff3054db",
                          border: "none",
                        }}
                        variant="outline-light"
                        className="mt-2 mb-2"
                      >
                        Add To Cart
                      </Button>
                      <img src={element.delimg} className="laimg" alt=""></img>
                    </div>
                  </div>
                </Card>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
