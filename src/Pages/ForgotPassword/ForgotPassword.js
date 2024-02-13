import React, { useState } from "react";
import signinBackground from "../../Assets/SigninBack.svg";
import PharmacyImage from "../../Assets/Pharmacy-img.svg";
import PharmalyticsLogo from "../../Assets/Pharmalytics-Logo.svg";
import Forgot_Icon from "../../Assets/Forgot_Password_Icon.svg";
import { Button, Input, message } from "antd";
import "./ForgotPassword.css";
import Email_icon from "../../Assets/Email-icon.svg";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import CustomButton from "../../Components/CustomButton/CustomButton";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userEmail", email);
    console.log("form Submitted!");
    axios
      .post(`${baseURL}/forget`, {
        email: email,
      })
      .then(() => {
        message.success("Email sent Successfully!", 3);
        navigate("/resendemail");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message
        ) {
          if (error.response.data.error.message === "Email not Registered") {
            setIsEmailValid(false);
          }
        } else {
          message.error("Email Sending Failed!", 3);
        }
      });
  };

  const HandleBtnBacktoLogin = () => {
    navigate("/");
  };
  return (
    <div className="siginContainer">
      <div className="signinLogoMainContainer">
        <img
          alt="SigninBackground"
          className="SigninLogoContainerpharm-img"
          src={signinBackground}
        ></img>
        <div>
          <img
            className="PharmacyImage"
            alt="pharmacyImage"
            src={PharmacyImage}
          ></img>
        </div>
        <div className="SigninLogoContainertxt">
          <p className="SigninLogoContainertitletext1">Elevate Your</p>
          <p className="SigninLogoContainertitletext2">Pharmacy Insights</p>
        </div>
        <div className="LearnMoreBtn">
          <Button>
            Learn More <ArrowRightOutlined className="LearnMoreArrow" />
          </Button>
        </div>
      </div>
      <div className="siginFieldsContainer">
        <div>
          <img
            alt="PharmalyticsLogo"
            className="PharmalyticsLogo"
            src={PharmalyticsLogo}
          ></img>
        </div>
        <div className="signinFields-frgt-pass">
          <h3 className="LoginText">
            <img
              className="forgotIcon"
              alt="Forgot icon"
              src={Forgot_Icon}
            ></img>
            <strong>Forgot</strong> Password
          </h3>
          <p className="signinText">
            Provide your account's email for which you want to reset your
            password
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-4">
              <label
                htmlFor="exampleInputEmail1"
                className={`form-label signinboldLabel ${
                  !isEmailValid ? "SigninErrorLabel" : ""
                }`}
              >
                Email
              </label>
              <Input
                className={`SigninInputField ${
                  !isEmailValid ? "SigninErrorInput" : ""
                }`}
                onChange={handleInputChange}
                value={email}
                prefix={
                  <img
                    className="Email_icon"
                    src={Email_icon}
                    alt="Email Icon"
                  />
                }
                type="email"
                name="email"
                aria-describedby="emailHelp"
                required={true}
              />
              {!isEmailValid && (
                <p className="SigninErrorText">
                  Invalid email. Please enter your registered email.
                </p>
              )}
            </div>
            <div className="forgot-password-btns">
              <CustomButton
                onClick={HandleBtnBacktoLogin}
                htmlType="button"
                type="default"
                className="forget-btn-primary"
              >
                Back to Log in
              </CustomButton>
              <CustomButton
                className="request-reset-btn"
                type="primary"
                disabled={!email}
                htmlType="submit"
              >
                Request Reset Password
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
