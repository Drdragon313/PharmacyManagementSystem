import React from "react";
import { Input } from "antd";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  LockOutlined,
} from "@ant-design/icons";
import "./PasswordInput.css";
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
        className="UpdatePasswordInput"
        prefix={<LockOutlined />}
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
