import React from "react";
import { Card } from "antd";

import "./Style.css";
const CustomCard = ({ title, bordered, children, className, onClick }) => (
  <Card
    title={title}
    bordered={bordered}
    className={className}
    onClick={onClick}
  >
    {children}
  </Card>
);

export default CustomCard;
