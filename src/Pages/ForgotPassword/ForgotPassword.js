import React, { useState } from "react";
import pharmImg from "../../Assets/pharm_img.svg";
import Logo from "../../Assets/logo.svg";
import { Input, Space, message } from "antd";
import "./ForgotPassword.css";
import { ArrowRightOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setEmail(e.target.value);
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
          message.error(error.response.data.error.message, 3);
        } else {
          message.error("Email Sending Failed!", 3);
        }
      });
  };

  const HandleBtnBacktoLogin = () => {
    navigate("/signin");
  };
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
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label signinBoldLabel"
              >
                Email
              </label>
              <Input
                onChange={handleInputChange}
                value={email}
                prefix={<MailOutlined />}
                type="email"
                name="email"
                aria-describedby="emailHelp"
                required={true}
              />
            </div>
            <button type="submit" className="btn my-3 signinbtn">
              Send
            </button>
          </form>
          <button
            onClick={HandleBtnBacktoLogin}
            type="button"
            className="btn btn-primary"
          >
            Back to Login
          </button>
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
