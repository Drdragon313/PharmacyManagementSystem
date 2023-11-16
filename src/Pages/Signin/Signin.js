import React, { useState } from "react";
import pharmImg from "../../Assets/Signin.png";
import GLogo from "../../Components/Images/gLogo.svg";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { Input } from "antd";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { login } from "../../Utility Function/login";
import "./Signin.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSigninData } from "../../redux/features/SigninSlice/SigninSlice";
const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.status === 200) {
        message.success("Logged In Successfully!", 2);
        dispatch(addSigninData(response.data.token));
        const AuthorizationToken = `Bearer ${response.data.token}`;
        localStorage.setItem("AuthorizationToken", AuthorizationToken);
        navigate("/tilepage");
      } else {
        message.error("Invalid Credentials", 2);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        message.error(error.response.data.error.message, 3);
      } else {
        message.error("Something went wrong!", 3);
      }
    }
  };

  return (
    <div className="siginContainer">
      <div className="siginFieldsContainer">
        <img alt="logo" className="company-logo" src={GLogo}></img>
        <div className="signinFields">
          <h5>Welcome Back!</h5>
          <p className="signinText">Let's get you signed in</p>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label signinBoldLabel"
              >
                Email
              </label>
              <Input
                prefix={<MailOutlined />}
                size="medium"
                type="email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label signinBoldLabel"
              >
                Password
              </label>
              <Input.Password
                prefix={<LockOutlined />}
                id="exampleInputPassword1"
                required={true}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="stay-signedin-forgot-pass">
              {/* <div className="stay-signedin"></div> */}
              <Link to="/forgotpassword" className="signinForget">
                Forget Password?
              </Link>
            </div>
            <button type="submit" className="btn my-3 signinbtn">
              Log In
            </button>
          </form>
        </div>
      </div>
      <div className="signinLogoContainer">
        <img
          alt="pharm"
          className="SigninLogoContainerpharm-img"
          src={pharmImg}
        ></img>
        <div className="SigninLogoContainertxt">
          <h2 className="SigninLogoContainertitle">Elevate your insights</h2>
          <h5 className="SigninLogoContainerdescription-txt">
            Our System stands out as the premier choice for pharmacies, offering
            unparalleled data insights that drive smarter decisions and
            ultimately lead to enhanced performance and patient care.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Signin;
