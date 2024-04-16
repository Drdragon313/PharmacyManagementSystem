import React from "react";
import { Select } from "antd";

const { Option } = Select;

const CustomSelect = ({
  divclassName,
  labelclassName,
  labelText,
  selectclassName,
  name,
  onChange,
  value,
  options,
  disabled,
}) => {
  return (
    <div className={divclassName}>
      <label className={labelclassName}>{labelText}</label>
      <br />
      <Select
        disabled={disabled}
        className={selectclassName}
        name={name}
        onChange={(value) => onChange(name, value)}
        value={value}
        style={{ borderRadius: "12px" }}
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;
