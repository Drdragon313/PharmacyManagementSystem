import { Button, Image, Space } from "antd";
import React from "react";
import phamalyticsLogo from "../../Assets/pharmaylics_logo.svg";
import pharmImg from "../../Assets/updatedPassImg.png";
import tick from "../../Assets/tick.svg";

import "./PasswordUpdatedSuccess.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../Components/CustomButton/CustomButton";

const PasswordUpdatedSuccess = () => {
  const navigate = useNavigate();
  const HandleBtnBacktoLogin = () => {
    navigate("/");
  };
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
        <div className="update-success-form">
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
          <CustomButton
            htmlType="button"
            type="primary"
            className="password-update-success-back-btn"
            onClick={HandleBtnBacktoLogin}
          >
            Login
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default PasswordUpdatedSuccess;
