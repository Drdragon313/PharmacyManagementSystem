import React from "react";
import { Input } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import "./PasswordInput.css";
import PasswordIcon from "../../Assets/Password_icon.svg";
const PasswordInput = (props) => {
  return (
    <div className="mb-3 my-4">
      <label
        htmlFor="exampleInputPassword1"
        className="form-label UpdatePasswordBoldLabel"
      >
        {props.label}
      </label>
      <br />
      <Input.Password
        className="AddUsersDetailsInput"
        prefix={<img src={PasswordIcon} alt="Password Icon"></img>}
        name={props.name}
        required={true}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        onChange={props.onChange}
      />
    </div>
  );
};

export default PasswordInput;
