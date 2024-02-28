import React from "react";
import { Button, Col, Row } from "antd";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import "./CustomSwitch.css";

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
      label: checked ? "Employees" : "Roles and Permission",
      link: "/employeepage",
    },
  ];

  return (
    <div>
      <Row className="breadcrumb-col">
        <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
      </Row>

      <Row className="toggle-btn" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row">
          <div className="toggle-btn-container">
            <Button
              className="switch-btns"
              style={generateButtonStyle(checked, "#3A3475", "#F8FBFF")}
              onClick={() => onChange(!checked)}
            >
              Employees
            </Button>
            <Button
              className="switch-btns"
              style={generateButtonStyle(checked, "#F8FBFF", "#3A3475")}
              onClick={() => onChange(!checked)}
            >
              Roles & permissions
            </Button>
          </div>
        </Col>
        <Col className="gutter-row" span={12}></Col>
        <Col className="gutter-row" span={4}></Col>
      </Row>
    </div>
  );
};

export default CustomSwitch;
