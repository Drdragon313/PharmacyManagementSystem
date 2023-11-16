import React, { useState } from "react";
import pharmImg from "../../Assets/Signin.png";
import Logo from "../../Components/Images/gLogo.svg";
import { Input, message } from "antd";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { PasswordRegex } from "../../Utility Function/PasswordRegex";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import axios from "axios";
import "./PasswordResetForm.css";

const PasswordResetForm = (props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const email = searchParams.get("email");
  console.log("Params Email:", email);
  const forgetPasswordKey = searchParams.get("passwordKey");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const regex = PasswordRegex();
      if (regex.test(data.password)) {
        axios
          .post(`${baseURL}/update`, {
            email: email,
            passwordKey: forgetPasswordKey,
            password: data.password,
          })
          .then(() => {
            message.success("Password Updated Successfully!", 3);
            navigate("/");
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
              message.error("Password updation Failed!", 3);
            }
          });
      } else {
        message.error("Password doesnt meet the required criteria");
      }
    } else {
      message.error("Passwords donot match!", 3);
    }
  };

  return (
    <div className="siginContainer">
      <div className="siginFieldsContainer">
        <img alt="logo" className="company-logo" src={Logo}></img>
        <div className="signinFields">
          <h5>{props.heading}</h5>
          <p className="signinText">Choose a new password for your account</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label signinBoldLabel"
              >
                New Password
              </label>
              <Input.Password
                onChange={handleInputChange}
                prefix={<LockOutlined />}
                name="password"
                required={true}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <p className="signinText">
                Password should be atleats 8 characters with 1 Capital letter, 1
                number and 1 special character.
              </p>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label signinBoldLabel"
              >
                Confirm Password
              </label>
              <Input.Password
                onChange={handleInputChange}
                prefix={<LockOutlined />}
                name="confirmPassword"
                required={true}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            <button type="submit" className="btn my-3 signinbtn">
              {props.buttonText}
            </button>
          </form>
          <Link to="/">
            <button type="button" className="btn btn-primary">
              Back to Login
            </button>
          </Link>
        </div>
      </div>
      <div className="signinLogoContainer">
        <img alt="pharm" className="Resetpharm-img" src={pharmImg}></img>
        <div className="txt">
          <h2 className="title">Elevate your insights</h2>
          <h5 className="description-txt">
            Our System stands out as the premier choice for pharmacies, offering
            unparalleled data insights that drive smarter decisions and
            ultimately lea to enhanced performance and patient care.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
