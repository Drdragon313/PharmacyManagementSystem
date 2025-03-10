import React, { useState } from "react";
import pharmImg from "../../Assets/Asset 1 4.png";
import { Image, Input, Space } from "antd";
import { useEffect } from "react";

import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import phamalyticsLogo from "../../Assets/pharmaylics_logo.svg";
import Lockimg from "../../Assets/lockoutlined.svg";
import LockGreyImg from "../../Assets/lockGreyIcon.svg";
import LinkExpired from "../../Assets/pajamas_expire.svg";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import {
  handleInputChangeUtil,
  handleSubmitUtil,
  validateVerificationLink,
} from "../../Utility Function/ResetPasswordUtils";
import "./PasswordResetForm.css";
import Spinner from "../Spinner/Spinner";
import CustomButton from "../CustomButton/CustomButton";

const PasswordResetForm = (props) => {
  const [apiStatus, setApiStatus] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [conditions, setConditions] = useState({
    minLength: false,
    upperCase: false,
    lowerCase: false,
    numberAndSpecialChar: false,
  });

  const handleInputChange = (e) => {
    handleInputChangeUtil(e, setData, setConditions);
  };

  const handleSubmit = (e) => {
    handleSubmitUtil(
      e,
      data,
      email,
      forgetPasswordKey,
      navigate,
      handleApiStatus
    );
  };
  const HandleBtnBacktoLogin = () => {
    navigate("/");
  };
  const handleApiStatus = (status) => {
    setApiStatus(status);
  };

  const email = searchParams.get("email");
  console.log("Params Email:", email);
  const forgetPasswordKey = searchParams.get("passwordKey");

  useEffect(() => {
    validateVerificationLink(
      email,
      forgetPasswordKey,
      setApiStatus,
      setLoading
    );
  }, [email, forgetPasswordKey]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="siginContainer">
      <div className="signinLogoResetContainer">
        <img alt="pharm" className="Resetpharm-img" src={pharmImg}></img>
        <div className="txt">
          <p className="title">
            Elevate Your <br /> <strong>Pharmacy Insights</strong>{" "}
          </p>
        </div>
      </div>
      <div className="siginFieldsContainer">
        <Image
          className="pharmalytics-logo"
          src={phamalyticsLogo}
          preview={false}
        ></Image>
        {apiStatus === false ? (
          <div className="signinFields">
            <div className="reset-heading">
              <Image
                preview={false}
                src={LinkExpired}
                className="lock-img"
              ></Image>
              <h2>
                <strong>Link </strong>expired
              </h2>
            </div>
            <p>
              Your link has expired, because you haven't used it. Reset password
              link expires in every 1 hour and can be used only once. You can
              create one by clicking the Resend Email button.
            </p>
            <div className="reset-password-btns">
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
        ) : (
          <div className="signinFields">
            <div className="reset-heading">
              <Image preview={false} src={Lockimg} className="lock-img"></Image>
              <h2>
                <strong>{props.headingText}</strong> Your Password
              </h2>
            </div>
            <ul className="conditions-signin">
              <li>
                <Space size={5}>
                  {conditions.minLength ? (
                    <CheckCircleTwoTone twoToneColor="#06C552" />
                  ) : (
                    <CloseCircleTwoTone twoToneColor="#EE0004" />
                  )}
                  Password should be at least 8 characters long.
                </Space>
              </li>

              <li>
                <Space size={5}>
                  {conditions.upperCase ? (
                    <CheckCircleTwoTone twoToneColor="#06C552" />
                  ) : (
                    <CloseCircleTwoTone twoToneColor="#EE0004" />
                  )}
                  Password must contain at least one upper case.
                </Space>
              </li>
              <li>
                <Space size={5}>
                  {conditions.lowerCase ? (
                    <CheckCircleTwoTone twoToneColor="#06C552" />
                  ) : (
                    <CloseCircleTwoTone twoToneColor="#EE0004" />
                  )}
                  One lower case letter.
                </Space>
              </li>
              <li>
                <Space size={5}>
                  {conditions.numberAndSpecialChar ? (
                    <CheckCircleTwoTone twoToneColor="#06C552" />
                  ) : (
                    <CloseCircleTwoTone twoToneColor="#EE0004" />
                  )}
                  Password must contain at least one number and special
                  character.
                </Space>
              </li>
            </ul>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label signinBoldLabel"
                >
                  New Password
                </label>
                <Input.Password
                  className="input-password"
                  onChange={handleInputChange}
                  prefix={
                    <Image
                      preview={false}
                      src={LockGreyImg}
                      className="lock-Grey-img"
                    ></Image>
                  }
                  name="password"
                  required={true}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label signinBoldLabel"
                >
                  Confirm Password
                </label>
                <Input.Password
                  className="input-password"
                  onChange={handleInputChange}
                  prefix={
                    <Image
                      preview={false}
                      src={LockGreyImg}
                      className="lock-Grey-img"
                    ></Image>
                  }
                  name="confirmPassword"
                  required={true}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </div>
              <div className="reset-password-btns">
                <CustomButton
                  htmlType="button"
                  type="default"
                  className="reset-back-btn"
                  onClick={HandleBtnBacktoLogin}
                >
                  Cancel
                </CustomButton>

                <CustomButton
                  className="request-reset-btn"
                  type="primary"
                  htmlType="submit"
                >
                  {props.buttonText}
                </CustomButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordResetForm;
