import React from "react";
import { CgAddR } from "react-icons/cg";
import { useLocation } from "react-router-dom";

const PaymentsPage = () => {
  const location = useLocation();
  const { totalPrice } = location.state || { totalPrice: 0 }; //defaults to zero if state is not provided
  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 carddetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h4 className="text-white m-0">Payment Options</h4>
              </div>
            </div>
            <div className="cart-body p-0 ml-4 mr-4">
              <div className="wallet mt-4 ">
                <h3 style={{ textAlign: "center", color: "red" }}>
                  GRAND TOTAL: {totalPrice}
                </h3>
                <br />
                <h6>Choose from a variety of options</h6>
                <br />
                <h5>WALLET</h5>
                <div className="button-container d-flex m-2 flex-column">
                  <div
                    className="button1 d-flex flex-row "
                    style={{
                      background: "#efefef",
                      outline: "none",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                    onClick={""}
                  >
                    <span>
                      <h4>Paytm</h4>
                    </span>
                    <button
                      style={{
                        background: "lightblue",
                        border: "none",
                        padding: "1%",
                        minWidth: "5vw",
                      }}
                    >
                      <h5>Pay</h5>
                    </button>
                  </div>
                  <div
                    className="button1 d-flex flex-row "
                    style={{
                      background: "#efefef",
                      outline: "none",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                    onClick={""}
                  >
                    <span>
                      <h4>PhonePe</h4>
                    </span>
                    <button
                      style={{
                        background: "lightblue",
                        border: "none",
                        padding: "1%",
                        minWidth: "5vw",
                      }}
                    >
                      <h5>Pay</h5>
                    </button>
                  </div>
                  <div
                    className="button1 d-flex flex-row"
                    style={{
                      background: "#efefef",
                      outline: "none",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                    onClick={""}
                  >
                    <span>
                      <h4>Google Pay</h4>
                    </span>
                    <button
                      style={{
                        background: "lightblue",
                        border: "none",
                        padding: "1%",
                        minWidth: "5vw",
                      }}
                    >
                      {" "}
                      <h5>Pay</h5>
                    </button>
                  </div>
                  <div
                    className="button1 d-flex flex-row"
                    style={{
                      background: "#efefef",
                      outline: "none",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                    onClick={""}
                  >
                    <span>
                      <h4>CRED</h4>
                    </span>
                    <button
                      style={{
                        background: "lightblue",
                        border: "none",
                        padding: "1%",
                        minWidth: "5vw",
                      }}
                    >
                      {" "}
                      <h5>Pay</h5>
                    </button>
                  </div>
                  <div
                    className="button1 d-flex flex-row"
                    style={{
                      background: "#efefef",
                      outline: "none",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                    onClick={""}
                  >
                    <span>
                      <h4>Freecharge</h4>
                    </span>
                    <button
                      style={{
                        background: "lightblue",
                        border: "none",
                        padding: "1%",
                        minWidth: "5vw",
                      }}
                    >
                      {" "}
                      <h5>Pay</h5>
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-payment mt-5">
                <h5>CARD</h5>
                <p>
                  <CgAddR /> &nbsp; ADD NEW CARD
                </p>
                <p>Save and pay via cards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentsPage;
