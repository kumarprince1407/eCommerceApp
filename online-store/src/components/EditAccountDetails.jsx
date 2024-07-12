//EditAccountDetails.jsx
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./cartStyle.css";

//After creating the userSlice.js
import { useDispatch, useSelector } from "react-redux";
import { editUserInfo, fetchUserData } from "../redux/features/userSlice";
import { useAuth } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
const EditAccountDetails = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state.id;
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    gender: "",
    address: "",
  });

  //Form validation
  const [formError, setFormError] = useState("");
  //const [formTouched, setFormTouched] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserData(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        contact: user.contact,
        gender: user.gender, //check
        address: user.address,
      });
    }
  }, [user]);

  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCheckboxChecked = (e) => {
    setCheckboxChecked(e.target.checked);
  };

  const validateForm = () => {
    const { firstname, lastname, contact, gender, address } = formData;
    if (!firstname || !lastname || !contact || !gender || !address) {
      setFormError("Please fill in all the input fields.");
      return false;
    } else if (!checkboxChecked) {
      setFormError("Please agree to the terms and conditions.");
      return false;
    } else {
      setFormError("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(editUserInfo({ id: 1, updatedUserInfo: formData })).then(() => {
        navigate(`/account/${1}`);
      });
    } else {
      setFormError("Please fill in all the input fields");
    }
  };

  return (
    <>
      <div className=" row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 carddetails">
          <div className="card-header bg-dark p-3">
            <div className="card-header-flex">
              <h5 className="text-white m-0">Edit Details</h5>
            </div>
          </div>
          <div className="card-body " style={{ border: "1px solid grey" }}>
            <Form onSubmit={handleSubmit}>
              <fieldset>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="username">
                    <h6>Username/Email</h6>
                  </Form.Label>
                  <Form.Control
                    id="username"
                    placeholder=""
                    value={currentUser?.email}
                    disabled
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
                    // onInput={(e) =>
                    //   (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                    // }
                    value={formData.contact}
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
                    <option value=""></option>
                    <option selected={true}>Male</option>
                    <option>Female</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="checkbox"></Form.Label>
                  <Form.Check
                    type="checkbox"
                    id="checkbox"
                    label="I agree to the Terms & Conditions"
                    checked={checkboxChecked}
                    onChange={handleCheckboxChecked}
                  />
                </Form.Group>
                {formError && <p style={{ color: "red" }}>{formError}</p>}
                <Button type="submit">Save</Button>
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

export default EditAccountDetails;
