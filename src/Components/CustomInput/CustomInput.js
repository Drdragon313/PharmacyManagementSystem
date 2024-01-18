import { Input } from "antd";
import React from "react";

const CustomInput = (props) => {
  return (
    <div className={props.divclassName}>
      <label className={props.labelclassName}>{props.labelText}</label>
      <br />
      <Input
        type={props.type}
        className={props.inputclassName}
        name={props.inputName}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.value}
        style={props.style}
        required={props.required}
        disabled={props.disabled}
      />
    </div>
  );
};

export default CustomInput;
