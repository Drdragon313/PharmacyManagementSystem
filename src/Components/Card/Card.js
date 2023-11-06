import React from "react";
import { Card } from "antd";
import PropTypes from "prop-types";
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

CustomCard.propTypes = {
  title: PropTypes.string,
  bordered: PropTypes.bool,
  width: PropTypes.number,
  children: PropTypes.node,
};

export default CustomCard;
