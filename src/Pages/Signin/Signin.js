import React, { useState, useEffect } from "react";
import signinBackground from "../../Assets/SigninBack.svg";
import PharmacyImage from "../../Assets/Pharmacy-img.svg";
import PharmalyticsLogo from "../../Assets/Pharmalytics-Logo.svg";
import Email_icon from "../../Assets/Email-icon.svg";
import Password_icon from "../../Assets/Password_icon.svg";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import Spinner from "../../Components/Spinner/Spinner";
import { Input } from "antd";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { login } from "../../Utility Function/login";
import "./Signin.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSigninData } from "../../redux/features/SigninSlice/SigninSlice";
import CustomButton from "../../Components/CustomButton/CustomButton";

import { fetchUserPermissions } from "../../Utility Function/ModulesAndPermissions";
const routeMappings = {
  1: "/dashboard",
  2: "/file",
  3: "/tilepage",
  4: "/pharmacies",
  5: "/file",
  6: "/employeepage",
};
const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPermissions, setUserPermissions] = useState([]);
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await login(email, password);

      if (response.status === 200) {
        dispatch(addSigninData(response.data.token));
        const AuthorizationToken = `Bearer ${response.data.token}`;
        localStorage.setItem("AuthorizationToken", AuthorizationToken);
        await fetchUserPermissions(setUserPermissions);
      } else {
        message.error("Invalid Credentials", 2);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userPermissions.length > 0) {
      const firstAvailableModule = findFirstAvailableModule(userPermissions);
      console.log("first avail", firstAvailableModule);
      if (firstAvailableModule) {
        navigate(routeMappings[firstAvailableModule.module_id]);
        message.success("Logged In Successfully!", 2);
      } else {
        message.error("No available modules found for the user.", 2);
      }
    }
  }, [userPermissions, navigate]);

  const findFirstAvailableModule = (permissions) => {
    for (const permission of permissions) {
      if (permission.actions.read) {
        return permission;
      }
    }
    return null;
  };

  return (
    <>
      {" "}
      {loading ? (
        <Spinner />
      ) : (
        <div className="siginContainer">
          <div className="signinLogoMainContainer">
            <img
              alt="SigninBackground"
              className="SigninLogoContainerpharm-img"
              src={signinBackground}
            ></img>
            <div>
              <img
                className="PharmacyImage"
                alt="pharmacyImage"
                src={PharmacyImage}
              ></img>
            </div>
            <div className="SigninLogoContainertxt">
              <p className="SigninLogoContainertitletext1">Elevate Your</p>
              <p className="SigninLogoContainertitletext2">Pharmacy Insights</p>
            </div>
          </div>
          <div className="siginFieldsContainer">
            <div>
              <img
                alt="PharmalyticsLogo"
                className="PharmalyticsLogo"
                src={PharmalyticsLogo}
              ></img>
            </div>
            <div className="signinFields">
              <h3 className="LoginText">
                <LoginOutlined className="LoginOutlined" />
                <strong>Log In</strong> to your account
              </h3>
              <Form onFinish={handleLogin}>
                <Form.Item
                  className="mb-3 mt-4"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label signinboldLabel"
                  >
                    Email
                  </label>
                  <Input
                    itemType="email"
                    prefix={
                      <img
                        className="Email_icon"
                        src={Email_icon}
                        alt="Email Icon"
                      />
                    }
                    size="medium"
                    type="email"
                    id="exampleInputEmail1"
                    className="ant-input"
                    aria-describedby="emailHelp"
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  className="mb-3"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label signinboldLabel"
                  >
                    Password
                  </label>
                  <Input.Password
                    prefix={
                      <img
                        className="Email_icon"
                        src={Password_icon}
                        alt="Password Icon"
                      />
                    }
                    id="exampleInputPassword1"
                    className="ant-input"
                    required={true}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <div className="stay-signedin-forgot-pass">
                  {/* <div className="stay-signedin"></div> */}
                  <Link to="/forgotpassword" className="signinForget">
                    Forget Password?
                  </Link>
                </div>
                <CustomButton
                  className="login-btn"
                  type="primary"
                  htmlType="submit"
                >
                  LogIn
                </CustomButton>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signin;
