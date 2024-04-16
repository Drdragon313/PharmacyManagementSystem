import React from "react";
import pharmImg from "../../Assets/pharm_img.svg";
import Logo from "../../Assets/logo.svg";
import { Space } from "antd";
import "./CheckEmail.css";
import { ArrowRightOutlined } from "@ant-design/icons";
const ForgotPassword = () => {
  return (
    <div className="siginContainer">
      <div className="siginFieldsContainer">
        <img alt="logo" className="company-logo" src={Logo}></img>
        <div className="signinFields">
          <h5>Check your email</h5>
          <p className="signinText">
            We have sent an email with password reset information to
            abc@gmail.com
          </p>
          <p className="didnot-recieve-Text">
            Didn’t receive the email? Check span folder or
          </p>
          <form>
            <button type="submit" className="btn my-3 signinbtn">
              Resend Email
            </button>
            <button type="button" className="btn btn-primary">
              Back to Login
            </button>
          </form>
        </div>
      </div>
      <div className="signinLogoContainer">
        <img alt="pharm" className="pharm-img" src={pharmImg}></img>
        <div className="txt">
          <h2 className="title">Elevate your pharmacy insights</h2>
          <h5 className="description-txt">
            Pharmlytics stands out as the premier choice for pharmacies,
            offering unparalleled data insights that drive smarter decisions and
            ultimately lea to enhanced performance and patient care.
          </h5>
          <div className="container-foot">
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

export default ForgotPassword;
