import React, { useState } from "react";
import "./UpdatePassword.css";
import { baseURL } from "../../../Components/BaseURLAPI/BaseURLAPI";
import { message } from "antd";
import PasswordInput from "../../../Components/Input/PasswordInput";
import axios from "axios";
const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    PreviousPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const localHeader = localStorage.getItem("AuthorizationToken");
    const headers = {
      Authorization: localHeader,
    };
    if (formData.NewPassword === formData.ConfirmNewPassword) {
      if (formData.PreviousPassword !== formData.NewPassword) {
        axios
          .post(
            `${baseURL}/change-password`,
            {
              old_password: formData.PreviousPassword,
              new_password: formData.NewPassword,
            },
            { headers }
          )
          .then(() => {
            message.success("Password Updated Successfully!", 2);
          })
          .catch((error) => {
            message.error("An error occurred while updating password", 2);
            console.error("Error:", error);
          });
      } else {
        message.error("Old Password and New Password cannot be same!", 2);
      }
    } else {
      message.error("Passwords do not match!", 2);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  return (
    <div className="UpdatePasswordContainer">
      <div className="UpdatePasswordInnerContainer">
        <h5>Password and Security</h5>
        <form onSubmit={handleSubmit}>
          <PasswordInput
            label="Password"
            name="PreviousPassword"
            onChange={handleChange}
          />
          <PasswordInput
            label="New Password"
            name="NewPassword"
            onChange={handleChange}
          />
          <PasswordInput
            label="Confirm New Password"
            name="ConfirmNewPassword"
            onChange={handleChange}
          />
          <div className="updatePasswordBtnContainer">
            <button type="submit" className="btn btn-light PasswordUpdateBtn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
