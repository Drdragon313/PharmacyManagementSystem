import React, { useState } from "react";
import "./UpdatePassword.css";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import { message } from "antd";
import PasswordInput from "../../Components/Input/PasswordInput";
import axios from "axios";
import { PasswordRegex } from "../../Utility Function/PasswordRegex";
import { handleInputChangeUtil } from "../../Utility Function/ResetPasswordUtils";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    PreviousPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });
  const [conditions, setConditions] = useState({
    minLength: false,
    upperCase: false,
    lowerCase: false,
    numberOrSpecialChar: false,
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
    // const { name, value } = e.target;
    // setFormData((prevUserData) => ({
    //   ...prevUserData,
    //   [name]: value,
    // }));
    if (e.target.name === "PreviousPassword") {
      const { name, value } = e.target;
      setFormData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    } else {
      handleInputChangeUtil(e, setFormData, setConditions);
    }
  };
  return (
    <div className="UpdatePasswordContainer">
      <div className="UpdatePasswordInnerContainer">
        <h5 className="ChangePasswordText">Change Password</h5>
        <form onSubmit={handleSubmit}>
          <PasswordInput
            label="Current Password"
            name="PreviousPassword"
            onChange={handleChange}
          />
          <PasswordInput
            label="New Password"
            name="NewPassword"
            onChange={handleChange}
          />
          <ul className="conditions-signin">
            <li>
              {conditions.minLength ? (
                <CheckCircleTwoTone twoToneColor="#06C552" />
              ) : (
                <CloseCircleTwoTone twoToneColor="#EE0004" />
              )}
              Password should be at least 8 characters long.
            </li>
            <li>
              {conditions.upperCase ? (
                <CheckCircleTwoTone twoToneColor="#06C552" />
              ) : (
                <CloseCircleTwoTone twoToneColor="#EE0004" />
              )}
              Password must contain at least one upper case.
            </li>
            <li>
              {conditions.lowerCase ? (
                <CheckCircleTwoTone twoToneColor="#06C552" />
              ) : (
                <CloseCircleTwoTone twoToneColor="#EE0004" />
              )}
              One lower case letter.
            </li>
            <li>
              {conditions.numberOrSpecialChar ? (
                <CheckCircleTwoTone twoToneColor="#06C552" />
              ) : (
                <CloseCircleTwoTone twoToneColor="#EE0004" />
              )}
              Password must contain at least one number or special character.
            </li>
          </ul>
          <PasswordInput
            label="Confirm Password"
            name="ConfirmNewPassword"
            onChange={handleChange}
          />
          <div className="updatePasswordBtnContainer">
            <button className="btn CancelBtn">Cancel</button>
            <button type="submit" className="btn PasswordUpdateBtn">
              Save Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdatePassword;
