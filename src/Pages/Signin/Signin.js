import React, { useState } from "react";
import signinlogo from "../../Components/Images/SigninLogo.svg";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const Signin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://13.40.195.165:3001/login",
        data
      );
      if (response.status === 200) {
        message.success("Logged In Successfully!", 2);
        navigate("/");
      } else {
        message.error("Invalid Credentials", 2);
      }
    } catch (error) {
      message.error("Login Failed", 2);
    }
  };
  const handleInputChange = (event) => {
    setData(() => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className="siginContainer">
      <div className="signinLogoContainer">
        <img className="sigininPowerdby" src={signinlogo} alt="Logo"></img>
      </div>
      <div className="siginFieldsContainer">
        <div className="signinFields">
          <h5>Welcome Back!</h5>
          <p className="signinText">Lets get you signed in...</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label signinBoldLabel"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                aria-describedby="emailHelp"
                onChange={handleInputChange}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label signinBoldLabel"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                required={true}
                onChange={handleInputChange}
              ></input>
            </div>
            <div>
              <Link className="signinForget">Forget Password?</Link>
            </div>
            <button type="submit" className="btn my-3 signinbtn">
              Log In
            </button>
          </form>
          <div className="my-2 siginTerms"></div>
          <div>
            <p className="signinFooter">
              Don't Have an account?
              <Link className="signinRegisterNow">Register Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
