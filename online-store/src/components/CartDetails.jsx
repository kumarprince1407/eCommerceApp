//CartDetails.jsx
import React, { useEffect, useState } from "react";
import "./cartStyle.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  removeSingleItem,
  emptyEntireCart,
} from "../redux/features/cartSlice";

import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const CartDetails = () => {
  //const arr = [0, 1];
  const { carts } = useSelector((state) => state.allCart);

  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setTotalQuantity] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //add To cart
  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  //remove from cart
  const handleDelete = (e) => {
    dispatch(removeFromCart(e));
    toast.success("Item removed from your cart");
  };

  //remove single item count
  const handleSingleItemRemoval = (e) => {
    dispatch(removeSingleItem(e));
  };

  //clear cart
  const handleCartEmpty = () => {
    dispatch(emptyEntireCart());
    toast.success("Your cart is empty!");
  };

  //count total price
  // const total = () => {
  //   let totalPrice = 0;
  //   carts.map((elem, index) => {
  //     totalPrice += elem.price * elem.qnty + totalPrice;
  //   });
  //   setTotalPrice(totalPrice);
  // };
  // useEffect(() => {
  //   total();
  // }, [total]);

  useEffect(() => {
    const total = () => {
      let totalPrice = 0;
      carts.forEach((elem) => {
        totalPrice += elem.price * elem.qnty;
      });
      setTotalPrice(totalPrice);
    };
    total();
  }, [carts]);

  useEffect(() => {
    const totalCartItems = () => {
      let quantity = 0;
      carts.forEach((elem) => {
        quantity += elem.qnty;
      });
      setTotalQuantity(quantity);
    };
    totalCartItems();
  }, [carts]);

  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 carddetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  Cart Calculation{carts.length > 0 ? `(${carts.length})` : ""}
                </h5>
                {carts.length > 0 ? (
                  <button
                    className="btn btn-danger mt-0 btn-sm"
                    onClick={handleCartEmpty}
                  >
                    <i className="fa fa-trash-alt mr-2"></i>
                    <span>Empty Cart</span>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card-body p-0">
              {carts.length === 0 ? (
                <table className="table cart-table mb-0">
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className="cart-empty">
                          <i className="fa fa-shopping-cart"></i>
                          <p>Your Cart is Empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table cart-table mb-0 table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className="text-right">
                        <span id="amount" className="amount">
                          Total Amount
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((data, index) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <button
                                className="prdct-delete"
                                onClick={() => handleDelete(data.id)}
                              >
                                {" "}
                                <i className="fa fa-trash-alt mr-2"></i>
                              </button>
                            </td>
                            <td>
                              <div className="product-img">
                                <img src={data.imgdata} alt="" />
                              </div>{" "}
                            </td>
                            <td>
                              <div className="product-name">
                                <p>{data.dish}</p>
                              </div>{" "}
                            </td>
                            <td>
                              <div className="product-price">
                                <p>{data.price}</p>
                              </div>{" "}
                            </td>
                            <td>
                              <div className=".prdct-qty-container">
                                <button
                                  className="prdct-qty-btn"
                                  type="button"
                                  onClick={
                                    data.qnty <= 1
                                      ? () => handleDelete(data.id)
                                      : () => handleSingleItemRemoval(data)
                                  }
                                >
                                  <i className="fa fa-minus"></i>
                                </button>
                                <input
                                  type="text"
                                  className="qty-input-box"
                                  value={data.qnty}
                                  disabled
                                  name=""
                                  id=""
                                />
                                <button
                                  className="prdct-qty-btn"
                                  type="button"
                                  onClick={() => handleIncrement(data)}
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              </div>
                            </td>
                            <td className="text-right">
                              {data.qnty * data.price}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <th>&nbsp;</th>
                    <th colSpan={3}>&nbsp;</th>
                    <th>
                      Items in Cart <span className="ml-2 mr-2">:</span>
                      <span className="text-danger">{quantity}</span>
                    </th>
                    <th className="text-right">
                      Total Price <span className="ml-2 mr-2">:</span>
                      <span className="text-danger">{totalPrice}</span>
                    </th>
                  </tfoot>
                </table>
              )}
              {carts.length > 0 && (
                <div
                  className="checkout-button"
                  style={{ textAlign: "center", margin: "5px" }}
                >
                  <NavLink
                    to="/payment_options"
                    state={{ totalPrice: totalPrice }}
                  >
                    {/* To pass the 'totalPrice' from 'CartDetails to 'paymentPage', we make use of React Router's state mechanism here.
                    When we navigate from 'CartDetails' to 'Paymentspage', we can pass 'totalPrice' as a state through the 'Navlink'.
                    Then, in 'PaymentsPage', we can access this state using the 'useLocation' hook from React Router.
                    */}
                    <button className="btn btn-success mt-0 btn-medium w-25">
                      <span>Proceed to Payment</span>
                    </button>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
