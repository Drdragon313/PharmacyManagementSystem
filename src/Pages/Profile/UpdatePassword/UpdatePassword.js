import React, { useState } from "react";
import "./UpdatePassword.css";
import { baseURL } from "../../../Components/BaseURLAPI/BaseURLAPI";
import { message } from "antd";
import PasswordInput from "../../../Components/Input/PasswordInput";
import axios from "axios";
import { PasswordRegex } from "../../../Utility Function/PasswordRegex";
const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    PreviousPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = PasswordRegex();
    const localHeader = localStorage.getItem("AuthorizationToken");
    const headers = {
      Authorization: localHeader,
    };
    if (formData.NewPassword === formData.ConfirmNewPassword) {
      if (formData.PreviousPassword !== formData.NewPassword) {
        if (regex.test(formData.NewPassword)) {
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
              message.success("Password Updated Successfully!", 3);
            })
            .catch((error) => {
              console.log(error);
              if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.message
              ) {
                message.error(error.response.data.error.message, 3);
              } else {
                message.error("An error occurred while updating password", 3);
              }
            });
        } else {
          message.error("New Password doesnt meet the required criteria!", 3);
        }
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
          <p>
            Password should be atleats 8 characters with 1 Capital letter, 1
            <br />
            number and 1 special character.
          </p>
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
