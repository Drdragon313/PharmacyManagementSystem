import React, { useState } from "react";
import pharmImg from "../../Assets/pharm_img.svg";
import Logo from "../../Assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { Input, Space, Switch } from "antd";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { login } from "../../Utility Function/login";
import "./Signin.css";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addSigninData } from "../../redux/features/SigninSlice/SigninSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.status === 200) {
        message.success("Logged In Successfully!", 2);
        console.log("This is the response from API", response.data.token);
        dispatch(addSigninData(response.data.token));
        const AuthorizationToken = `Bearer ${response.data.token}`;
        localStorage.setItem("AuthorizationToken", AuthorizationToken);
        navigate("/schema");
      } else {
        message.error("Invalid Credentials", 2);
      }
    } catch (error) {
      message.error("An error occurred while logging in", 2);
      console.error("Error:", error);
    }
  };

  return (
    <div className="siginContainer">
      <div className="siginFieldsContainer">
        <img alt="logo" className="company-logo" src={Logo}></img>
        <div className="signinFields">
          <h5>Welcome Back!</h5>
          <p className="signinText">Lets get you signed in...</p>
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
              <div className="stay-signedin">
                <Switch
                  size="small"
                  defaultChecked
                  onChange={onChange}
                ></Switch>
                <p className="stay-signedin-txt"> Stay Signed in</p>
              </div>
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
        <img alt="pharm" className="pharm-img" src={pharmImg}></img>
        <div className="txt">
          <h2 className="title">Elevate your pharmacy insights</h2>
          <h5 className="description-txt">
            Pharmlytics stands out as the premier choice for pharmacies,
            offering unparalleled data insights that drive smarter decisions and
            ultimately lead to enhanced performance and patient care.
          </h5>
          <div className="container-foot">
            <p>www.pharmlytics.co.uk</p>
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

export default Signin;
