import "./ResendEmail.css";
import React from "react";
import pharmImg from "../../Assets/pharm_img.svg";
import Logo from "../../Assets/logo.svg";
import { Space, message } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import axios from "axios";
const ResendEmail = () => {
  const userEmail = localStorage.getItem("userEmail");
  const handleResendbtn = () => {
    axios
      .post(`${baseURL}/forget`, {
        email: userEmail,
      })
      .then(() => {
        message.success("Email Resent Successfully!", 3);
      })
      .catch(() => {
        message.error("Email Resending Failed!", 3);
      });
  };
  return (
    <div className="ResendContainer">
      <div className="ResendFieldsContainer">
        <img alt="logo" className="resend-company-logo" src={Logo}></img>
        <div className="ResendFields">
          <h5>Check Email</h5>
          <p className="ResendText">
            We have sent an email with password reset information to {userEmail}
            .
          </p>
          <p className="ResendText-small">
            Didn't receive the email? Check span folder or
          </p>
          <button
            type="submit"
            className="btn my-2 Resendbtn"
            onClick={handleResendbtn}
          >
            Resend Email
          </button>
          <Link to="/signin">
            <button type="button" className="btn btn-primary">
              Back to Login
            </button>
          </Link>
        </div>
      </div>
      <div className="ResendLogoContainer">
        <img alt="pharm" className="resend-pharm-img " src={pharmImg}></img>
        <div className="resend-description-txt">
          <h2 className="resend-title ">Elevate your pharmacy insights</h2>
          <h5 className="resend-description-txt">
            Pharmlytics stands out as the premier choice for pharmacies,
            offering unparalleled data insights that drive smarter decisions and
            ultimately lea to enhanced performance and patient care.
          </h5>
          <div className="resend-container-foot ">
            <p>www.pharmyltics.co.uk</p>
            <button type="button" className="btn btn-light">
              <Space>
                Learn More
                <ArrowRightOutlined />
              </Space>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResendEmail;
