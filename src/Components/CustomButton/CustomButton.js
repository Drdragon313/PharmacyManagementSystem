import React from "react";
import { Button } from "antd";

import "./CustomButton.css"; // Create this CSS file for custom styles

const CustomButton = ({ htmlType, type, onClick, children, ...props }) => {
  return (
    <Button
      className="custom-button"
      htmlType={htmlType}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
