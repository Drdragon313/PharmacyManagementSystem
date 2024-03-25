import "./ResendEmail.css";
import React from "react";
import signinBackground from "../../Assets/SigninBack.svg";
import EmailBackgroundLogo from "../../Assets/EmailBackgroundLogo.svg";
import PharmalyticsLogo from "../../Assets/Pharmalytics-Logo.svg";
import CheckEmailicon from "../../Assets/CheckEmailicon.svg";

import CustomButton from "../../Components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";

const ResendEmail = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
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
            src={EmailBackgroundLogo}
          ></img>
        </div>
        <div className="SigninLogoContainertxt">
          <p className="SigninLogoContainertitletext1">Elevate Your</p>
          <p className="SigninLogoContainertitletext2">Pharmacy Insights</p>
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
        <div className="ResendFields">
          <h3 className="my-5 LoginText">
            <img
              className="CheckEmailIcon"
              alt="Check Email icon"
              src={CheckEmailicon}
            ></img>
            <strong>Check</strong> your email
          </h3>
          <p className="ResendText">
            We have sent an email with password reset information to{" "}
            <strong>{userEmail}</strong>. Please check your inbox.
          </p>
          <p className="ResendText-small">
            Didn’t receive the email? Check span folder
          </p>
          <div className="resend-email-btns">
            <CustomButton
              htmlType="button"
              type="default"
              className="reset-back-btn"
              onClick={HandleBtnBacktoLogin}
            >
              Back To Login
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResendEmail;
