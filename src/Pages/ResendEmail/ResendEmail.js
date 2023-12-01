import "./ResendEmail.css";
import React from "react";
import signinBackground from "../../Assets/SigninBack.svg";
import EmailBackgroundLogo from "../../Assets/EmailBackgroundLogo.svg";
import PharmalyticsLogo from "../../Assets/Pharmalytics-Logo.svg";
import CheckEmailicon from "../../Assets/CheckEmailicon.svg";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { resendEmail } from "../../Utility Function/ResetPasswordUtils";

const ResendEmail = () => {
  const userEmail = localStorage.getItem("userEmail");

  const handleResendbtn = () => {
    resendEmail(userEmail);
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
            We have sent an email with password reset information to {userEmail}
            . Please check your inbox.
          </p>
          <p className="ResendText-small">
            Didn’t receive the email? Check span folder or
          </p>
          <Link to="/">
            <button type="button" className="btn resend-btn-primary">
              Back to Login
            </button>
          </Link>
          <button
            type="submit"
            className="btn my-3 resendbtn"
            onClick={handleResendbtn}
          >
            Resend Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResendEmail;
