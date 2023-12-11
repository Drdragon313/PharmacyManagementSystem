// CustomBreadcrumb.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./CustomBreadcrumb.css"; // Import your custom stylesheet for styling

const CustomBreadcrumb = ({ items }) => {
  const location = useLocation();

  return (
    <div className="custom-breadcrumb">
      {items &&
        items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="breadcrumb-separator">{" >> "}</span>
            )}
            {item.link ? (
              <Link
                to={item.link}
                className={`breadcrumb-link ${
                  location.pathname === item.link ? "active-link" : ""
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumb-label">{item.label}</span>
            )}
          </React.Fragment>
        ))}
    </div>
  );
};

export default CustomBreadcrumb;
