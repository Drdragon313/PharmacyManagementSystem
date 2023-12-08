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
  z,
}) => {
  return (
    <div className={divclassName}>
      <label className={labelclassName}>{labelText}</label>
      <br />
      <Select
        className={selectclassName}
        name={name}
        onChange={(value) => onChange(name, value)}
        value={value}
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
