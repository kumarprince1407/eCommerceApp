//AccountDetails.jsx
import React, { useState, useEffect } from "react";
import "./style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

//import { firebaseConfig } from "../firebase/firebaseConfig";
import { useAuth } from "./AuthContext";
import { getAuth } from "firebase/auth";
import { Button } from "react-bootstrap";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const AccountDetails = () => {
  const [userData, setUserData] = useState(null);

  const { currentUser } = useAuth();
  console.log("Current user:", currentUser);
  const auth = getAuth();
  console.log("Auth: ", auth);
  const user = auth.currentUser;
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const firebaseId = currentUser.uid;
  const myAccount = "myAccount";
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:3005/users/${1}`);
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.log("Failed to fetch user data");
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      } else {
        console.log("No user is logged in");
      }
    };
    fetchUserData();
  }, [user]);

  const handleEditClick = () => {
    navigate(`/account/edit/${1}`, { state: { id: user.id } });
    //navigate(`/account/edit/${myAccount}`, { state: { id: myAccount } });
  };

  //   if (!userData) {
  //     return <div>Loading...</div>;
  //   }
  return (
    <>
      <div className="row justify-content-center m-0">
        <div
          className="col-md-8 mt-5 mb-5 carddetails"
          style={{ maxWidth: "700px" }}
        >
          <div className="card-header bg-dark p-3">
            <div className="card-header-flex">
              <h4 className="text-white m-0">User Details</h4>
            </div>
          </div>
          <div className="card-body " style={{ border: "1px solid grey" }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="left">
                    <h5>Username:</h5>
                  </TableCell>
                  <TableCell align="left">{currentUser?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <h5>Account created:</h5>
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    {currentUser?.metadata.creationTime}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <h5>Firstname:</h5>
                  </TableCell>
                  <TableCell align="left">{userData?.firstname}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <h5>Lastname:</h5>
                  </TableCell>
                  <TableCell align="left">{userData?.lastname}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <h5>Contact number:</h5>
                  </TableCell>
                  <TableCell align="left">{userData?.contact}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <h5>Gender:</h5>
                  </TableCell>
                  <TableCell align="left">{userData?.gender}</TableCell>
                </TableRow>
                <TableRow></TableRow>
                <TableRow>
                  <TableCell align="left">
                    <h5>Address:</h5>
                  </TableCell>
                  <TableCell align="left">{userData?.address}</TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell align="left">
                    <h5>Date:</h5>
                  </TableCell>
                  <TableCell align="left">
                    {userData &&
                      new Date(userData.creationTime).toLocaleDateString()}
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
            <br />
            <Button onClick={handleEditClick}>Edit Details</Button>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
