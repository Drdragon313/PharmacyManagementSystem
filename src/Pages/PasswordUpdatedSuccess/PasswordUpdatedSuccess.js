import { Button, Image, Space } from "antd";
import React from "react";
import phamalyticsLogo from "../../Assets/pharmaylics_logo.svg";
import pharmImg from "../../Assets/updatedPassImg.png";
import tick from "../../Assets/tick.svg";
import { Link } from "react-router-dom";
import "./PasswordUpdatedSuccess.css";
import { ArrowRightOutlined } from "@ant-design/icons";

const PasswordUpdatedSuccess = () => {
  return (
    <div className="siginContainer">
      <div className="signinLogoContainer">
        <img alt="pharm" className="success-pharm-img" src={pharmImg}></img>
        <div className="txt">
          <h2 className="title">
            Elevate Your <br></br> <strong>Pharmacy Insights</strong>
          </h2>
          <Button className="learn-more-btn">
            <div className="learn-more">
              Learn More
              <ArrowRightOutlined />
            </div>
          </Button>
        </div>
      </div>
      <div className="siginFieldsContainer">
        <Image
          className="pharmalytics-logo"
          src={phamalyticsLogo}
          preview={false}
        ></Image>
        <Space direction="horizontal" className="password-updated-heading">
          <Image src={tick}></Image>
          <h2 style={{ color: " #5b3f88" }}>
            <strong>Password</strong> Updated
          </h2>
        </Space>
        <p>
          Your password has been updated. You can now log in with your <br />
          updated password.
        </p>
        <Link to="/">
          <Button type="button" className="btn my-3 signinbtn">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PasswordUpdatedSuccess;
