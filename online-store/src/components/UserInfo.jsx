//UserInfo.jsx
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./cartStyle.css";

//After creating the userSlice.js
import { useDispatch, useSelector } from "react-redux";
import { submitUserInfo } from "../redux/features/userSlice";

const UserInfo = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    contact: "",
    email: "",
    address: "",
    gender: "",
  });

  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitUserInfo(formData));
  };

  return (
    <>
      <div className=" row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 carddetails">
          <div className="card-header bg-dark p-3">
            <div className="card-header-flex">
              <h5 className="text-white m-0">User Details</h5>
            </div>
          </div>
          <div className="card-body " style={{ border: "1px solid grey" }}>
            <Form onSubmit={handleSubmit}>
              <fieldset>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="username">Username</Form.Label>
                  <Form.Control
                    id="username"
                    placeholder=""
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="firstname">
                    <h6>Firstname</h6>
                  </Form.Label>
                  <Form.Control
                    id="firstname"
                    placeholder=""
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="lastname">
                    <h6>Lastname</h6>
                  </Form.Label>
                  <Form.Control
                    id="lastname"
                    placeholder=""
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="contact">
                    <h6>Contact Number</h6>
                  </Form.Label>
                  <Form.Control
                    id="contact"
                    placeholder=""
                    type="tel"
                    pattern="[0-9]+"
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                    }
                    value={formData.contact}
                    onChange={(e) => {
                      handleChange({
                        target: {
                          id: "contact",
                          value: e.target.value.replace(/[^0-9]/g, ""),
                        },
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">
                    <h6>Email</h6>
                  </Form.Label>
                  <Form.Control
                    id="email"
                    placeholder=""
                    type="email"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="address">
                    <h6>Address</h6>
                  </Form.Label>
                  <Form.Control
                    id="address"
                    placeholder=""
                    style={{ height: "8vh", width: "50vw" }}
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="gender">Gender</Form.Label>
                  <Form.Select
                    id="gender"
                    placeholder="Select your gender"
                    default="none"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select your gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="checkbox"></Form.Label>
                  <Form.Check
                    type="checkbox"
                    id="checkbox"
                    label="I agree to the Terms & Conditions"
                  />
                </Form.Group>
                <Button type="submit">Submit</Button>
              </fieldset>
            </Form>
            {userStatus === "loading" && <p>Loading...</p>}
            {userStatus === "succedded" && <p>Form submitted successfuly!</p>}
            {userStatus === "failed" && <p>Error: {userError}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
