import React from "react";
import "./BasicInformation.css";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import Input from "antd/es/input/Input";
import ProfilePhoto from "../../../Components/Images/ProfilePhoto.svg";
const BasicInformation = () => {
  return (
    <div className="BasicContainer">
      <div className="BasicInfoHeading ">
        <h5>Basic Information</h5>
      </div>
      <div className="ProfilePhoto">
        <img className="ProfileImg" src={ProfilePhoto} alt="User Pic" />
      </div>
      <div className="UserDetails">
        <div className="OneDetails">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1">Name</label>
              <br />
              <Input
                className="UserDetailsInput"
                prefix={<UserOutlined />}
                size="medium"
                type="email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1">Gender</label>
              <br />
              <Input
                prefix={<UserOutlined />}
                id="exampleInputPassword1"
                className="UserDetailsInput"
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1">Department</label>
              <br />
              <Input
                id="exampleInputPassword1"
                className="UserDetailsInput"
                required={true}
              />
            </div>
          </form>
        </div>
        <div className="TwoDetails">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1">Email Address</label>
              <br />
              <Input
                className="UserDetailsInput"
                prefix={<MailOutlined />}
                size="medium"
                type="email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1">Date of Birth</label>
              <br />
              <Input
                id="exampleInputPassword1"
                className="UserDetailsInput"
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1">Designation</label>
              <br />
              <Input
                id="exampleInputPassword1"
                className="UserDetailsInput"
                required={true}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="InformationUpdateBtnContainer">
        <button type="button " className="btn btn-light InformationUpdateBtn">
          Update
        </button>
      </div>
    </div>
  );
};

export default BasicInformation;
