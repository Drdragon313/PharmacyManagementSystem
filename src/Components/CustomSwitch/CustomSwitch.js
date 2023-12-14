// CustomSwitch.js
import React from "react";
import { Button, Col, Row } from "antd";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import "./CustomSwitch.css"; // Ensure to import your styles

const generateButtonStyle = (checked, background, color) => ({
  width: 150,
  height: 40,
  background: checked ? background : color,
  color: checked ? color : background,
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
});

const CustomSwitch = ({ checked, onChange }) => {
  const breadcrumbItems = [
    {
      label: checked ? "Employee" : "Roles and Permission",
      link: "/employeepage",
    },
  ];

  return (
    <div>
      <Row
        className="pharmacy-list-breadcrumb"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col className="gutter-row" span={6}>
          <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
        </Col>
      </Row>
      <Row className="toggle-btn" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={7}>
          <div className="toggle-btn-container">
            <Button
              style={generateButtonStyle(checked, "#3A3475", "#F8FBFF")}
              onClick={() => onChange(!checked)}
            >
              Employees
            </Button>
            <Button
              style={generateButtonStyle(checked, "#F8FBFF", "#3A3475")}
              onClick={() => onChange(!checked)}
            >
              Roles & permissions
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CustomSwitch;
