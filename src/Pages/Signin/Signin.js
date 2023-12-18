import React, { useState } from "react";
import signinBackground from "../../Assets/SigninBack.svg";
import PharmacyImage from "../../Assets/Pharmacy-img.svg";
import PharmalyticsLogo from "../../Assets/Pharmalytics-Logo.svg";
import Email_icon from "../../Assets/Email-icon.svg";
import Password_icon from "../../Assets/Password_icon.svg";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { Input } from "antd";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  ArrowRightOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { login } from "../../Utility Function/login";
import "./Signin.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSigninData } from "../../redux/features/SigninSlice/SigninSlice";
import CustomButton from "../../Components/CustomButton/CustomButton";

import {
  fetchUserPermissions,
  fetchModules,
} from "../../Utility Function/ModulesAndPermissions";
import Spinner from "../../Components/Spinner/Spinner";
const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleLogin = async (setUserPermissions, setModules) => {
    try {
      setLoading(true);
      const response = await login(email, password);

      if (response.status === 200) {
        dispatch(addSigninData(response.data.token));
        const AuthorizationToken = `Bearer ${response.data.token}`;
        localStorage.setItem("AuthorizationToken", AuthorizationToken);

        // Fetch user permissions using the utility function
        await fetchUserPermissions(setUserPermissions);

        // Fetch modules using the utility function
        await fetchModules(setModules);

        // Navigate to tilepage
        navigate("/file");
        message.success("Logged In Successfully!", 2);
      } else {
        message.error("Invalid Credentials", 2);
      }
    } catch (error) {
      // ... (existing error handling code)
    } finally {
      setLoading(false); // Set loading to false after login process completes
    }
  };
  if (loading === true) {
    return <Spinner />;
  }
  return (
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
        <div className="LearnMoreBtn">
          <Button>
            Learn More <ArrowRightOutlined className="LearnMoreArrow" />
          </Button>
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
          <form>
            <div className="mb-3 mt-4">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label signinboldLabel"
              >
                Email
              </label>
              <Input
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
                className="SigninInputField"
                aria-describedby="emailHelp"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
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
                className="SigninInputField"
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
            <CustomButton type="primary" onClick={handleLogin}>
              Log In
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
