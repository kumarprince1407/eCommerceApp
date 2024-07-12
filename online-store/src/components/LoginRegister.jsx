//LoginRegister.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { firebaseConfig } from "../firebase/firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const LoginRegister = () => {
  const app = initializeApp(firebaseConfig);
  const emailRegex = /^[a-z]{3,}(.[0-9a-z]*)?@([a-z]){2,}.[a-z]+(.in)*$/;
  const passwordRegex = /^.*(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;

  const navigate = useNavigate();
  const location = useLocation();

  const onLoginPage = location.pathname === "/" ? true : false;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const [userExists, setUserExists] = useState(false);
  const [isEmailUsed, setIsEmailUsed] = useState(false);

  const auth = getAuth();
  console.log("Auth", auth);
  const ctaClickHandler = (e) => {
    e.preventDefault();
    if (onLoginPage) {
      signInWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigate("/home");
          }
        })
        .catch((error) => setUserExists(true));
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigate("/home");
          }
        })
        .catch((error) => setIsEmailUsed(true));
    }
  };

  useEffect(() => {
    setUserExists(false);
    setIsEmailUsed(false);
  }, [location]);

  //onChange method for email
  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  //onChange method for password change has been implemented directly as an inline function

  return (
    <>
      <div className="row justify-content-center m-0">
        <div
          className="col-md-8 mt-5 mb-5 carddetails"
          style={{ maxWidth: "700px" }}
        >
          <div className="card-header bg-dark p-3">
            <div className="card-header-flex">
              <h4 className="text-white m-0">
                {onLoginPage ? "Sign In" : "Sign Up"}
              </h4>
            </div>
          </div>
          <div className="card-body " style={{ border: "1px solid grey" }}>
            <Form>
              <fieldset>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">
                    <h6>Email</h6>
                  </Form.Label>
                  <Form.Control
                    id="username"
                    value={email}
                    type="email"
                    onChange={emailOnChangeHandler}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">
                    <h6>Password</h6>
                  </Form.Label>
                  <Form.Control
                    id="username"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" onClick={ctaClickHandler}>
                  {onLoginPage ? "Sign In" : "Sign Up"}
                </Button>
              </fieldset>
            </Form>
            <br />
            {userExists && (
              <p className="text-danger">
                User does not exist. Please enter correct details or go for
                Signup
              </p>
            )}
            {isEmailUsed && (
              <p className="text-danger">
                {" "}
                Email alreday in use. Please sign up using a different email ID
              </p>
            )}
            <div>
              {onLoginPage ? "New User? " : "Existing User?"} &nbsp;
              <Link className="" to={onLoginPage ? "/register" : "/"}>
                {onLoginPage ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
