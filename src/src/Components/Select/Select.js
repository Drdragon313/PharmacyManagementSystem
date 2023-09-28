import React from "react";
import { Select } from "antd";

const SelectOption = ({ options, onChange, value, placeholder }) => {
  return (
    <Select value={value} onChange={onChange} placeholder={placeholder}>
      {options.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectOption;
