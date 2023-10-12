import React, { useState } from "react";
import signinlogo from "../../Components/Images/SigninLogo.svg";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { loginUser } from "../../APIs/apiService";

const Signin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(data)
      .then((response) => {
        if (response.status === 200) {
          message.success("Logged In Successfully!", 2);
          navigate("/");
        } else {
          message.error("Invalid Credentials", 2);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };
  const handleInputChange = (event) => {
    setData(() => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className="siginContainer">
      <div className="siginFieldsContainer">
        <img alt="logo" className="company-logo" src={Logo}></img>
        <div className="signinFields">
          <h5>Welcome Back!</h5>
          <p className="signinText">Lets get you signed in...</p>
          <form onSubmit={handleSubmit}>
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
              <Input.Password
                prefix={<LockOutlined />}
                id="exampleInputPassword1"
                required={true}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
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

export default Signin;
