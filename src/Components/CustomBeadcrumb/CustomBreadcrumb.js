// CustomBreadcrumb.js
import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const CustomBreadcrumb = ({ items, currentFontColor, previousFontColor }) => {
  return (
    <Breadcrumb separator=">>">
      {items &&
        items.map((item, index) => (
          <Breadcrumb.Item
            key={index}
            style={{
              color:
                index === items.length - 1
                  ? currentFontColor
                  : previousFontColor,
            }}
          >
            {item.link ? (
              <Link to={item.link}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </Breadcrumb.Item>
        ))}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
