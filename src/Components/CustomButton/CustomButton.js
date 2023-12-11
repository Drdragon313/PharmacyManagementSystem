import React from "react";
import { Button } from "antd";

import "./CustomButton.css"; // Create this CSS file for custom styles

const CustomButton = ({ onClick, children, ...props }) => {
  return (
    <Button className="custom-button" onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
