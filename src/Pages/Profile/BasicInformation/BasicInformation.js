import React, { useEffect, useState } from "react";
import "./BasicInformation.css";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import Input from "antd/es/input/Input";
import ProfilePhoto from "../../../Components/Images/ProfilePhoto.svg";
import axios from "axios";
// import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { message } from "antd";

const BasicInformation = () => {
  const [userData, setUserData] = useState({
    Address: "",
    Contact: "",
    DateOfBirth: "",
    Department: "",
    Designation: "",
    Email: "",
    FName: "",
    Gender: "",
    LName: "",
    PostCode: "",
  });

  useEffect(() => {
    const localHeader = localStorage.getItem("AuthorizationToken");
    console.log("Result of getItem:", localHeader);
    const headers = {
      Authorization: localHeader,
    };
    console.log("This is headerObject", headers);
    axios
      .get(`http://13.40.195.165:3001/get-profile`, { headers })
      .then((response) => {
        console.log("This is the response from get API", response);
        const apiUserData = response.data.data;
        setUserData((prevUserData) => ({
          ...prevUserData,
          Address: apiUserData.Address,
          Contact: apiUserData.Contact,
          DateOfBirth: apiUserData.DateOfBirth,
          Department: apiUserData.Department,
          Designation: apiUserData.Designation,
          Email: apiUserData.Email,
          FName: apiUserData.FName,
          Gender: apiUserData.Gender,
          LName: apiUserData.LName,
          PostCode: apiUserData.PostCode,
        }));
        console.log("This is the result of USEState from get API", userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("Use State Object", userData);
  const handleUpdate = () => {
    const localHeader = localStorage.getItem("AuthorizationToken");
    console.log("Result of getItem:", localHeader);
    const headers = {
      Authorization: localHeader,
    };
    console.log("This is headerObject", headers);
    axios
      .put(
        `http://13.40.195.165:3001/update-profile`,
        {
          FName: userData.FName,
          LName: userData.LName,
          Contact: userData.Contact,
          Address: userData.Address,
          PostCode: userData.PostCode,
          DateOfBirth: userData.DateOfBirth.toString(),
        },
        { headers }
      )
      .then((response) => {
        console.log(response);
        message.success("Data Updated Successfully!", 2);
      })
      .catch((error) => {
        console.log(error);
        message.error("Data Updation Failed!", 2);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div className="BasicContainer">
      <div className="BasicInfoHeading">
        <h5>Basic Information</h5>
      </div>
      <div className="ProfilePhoto">
        <img className="ProfileImg" src={ProfilePhoto} alt="User Pic" />
      </div>
      <div className="UserDetails">
        <div className="OneDetails">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1">First Name</label>
              <br />
              <Input
                onChange={handleChange}
                value={userData.FName}
                className="UserDetailsInput"
                prefix={<UserOutlined />}
                size="medium"
                type="email"
                name="FName"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1">Gender</label>
              <br />
              <Input
                value={userData.Gender}
                onChange={handleChange}
                disabled={true}
                name="Gender"
                prefix={<UserOutlined />}
                className="UserDetailsInput"
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1">Contact</label>
              <br />
              <Input
                value={userData.Contact}
                onChange={handleChange}
                name="Contact"
                className="UserDetailsInput"
                required={true}
              />
              {/* <PhoneInput
                defaultCountry="ua"
                value={userData.Contact}
                onChange={handleChange}
                name="Contact"
                className="UserDetailsInput PhoneInput"
                required={true}
              /> */}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1">Department</label>
              <br />
              <Input
                value={userData.Department}
                disabled={true}
                onChange={handleChange}
                name="Department"
                className="UserDetailsInput"
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1">Address</label>
              <br />
              <Input
                value={userData.Address}
                onChange={handleChange}
                name="Address"
                className="UserDetailsInput"
                required={true}
              />
            </div>
          </form>
        </div>
        <div className="TwoDetails">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1">Last Name</label>
              <br />
              <Input
                onChange={handleChange}
                value={userData.LName}
                className="UserDetailsInput"
                prefix={<UserOutlined />}
                size="medium"
                type="email"
                name="LName"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1">Email Address</label>
              <br />
              <Input
                onChange={handleChange}
                value={userData.Email}
                disabled={true}
                className="UserDetailsInput"
                prefix={<MailOutlined />}
                size="medium"
                type="email"
                name="Email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1">Date of Birth</label>
              <br />
              <Input
                value={userData.DateOfBirth}
                onChange={handleChange}
                type="date"
                name="DateOfBirth"
                className="UserDetailsInput"
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1">Designation</label>
              <br />
              <Input
                value={userData.Designation}
                disabled={true}
                onChange={handleChange}
                name="Designation"
                className="UserDetailsInput"
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1">Post Code</label>
              <br />
              <Input
                value={userData.PostCode}
                onChange={handleChange}
                name="PostCode"
                className="UserDetailsInput"
                required={true}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="InformationUpdateBtnContainer">
        <button
          onClick={handleUpdate}
          type="button"
          className="btn btn-light InformationUpdateBtn"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default BasicInformation;
