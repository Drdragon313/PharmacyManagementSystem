import React from "react";
import pharmImg from "../../Assets/pharm_img.svg";
import Logo from "../../Assets/logo.svg";
import { Input, Space } from "antd";
import "./ForgotPassword.css";
import { ArrowRightOutlined, MailOutlined } from "@ant-design/icons";
const ForgotPassword = () => {
  return (
    <div className="siginContainer">
      <div className="siginFieldsContainer">
        <img alt="logo" className="company-logo" src={Logo}></img>
        <div className="signinFields">
          <h5>Forgot Password</h5>
          <p className="signinText">
            Enter the email you used to create your account so we can send you a
            link for resetting your password.
          </p>
          <form>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label signinBoldLabel"
              >
                Email
              </label>
              <Input
                prefix={<MailOutlined />}
                type="email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required={true}
              />
            </div>

            <button type="submit" className="btn my-3 signinbtn">
              Send
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
