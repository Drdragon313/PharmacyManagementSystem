import React, { useState } from "react";
import { Button, Col, Image, Row } from "antd";
import "./FaqPage.css";
import AllImg from "../../Assets/all.svg";
import AllContent from "../../Components/FaqComponents/All";
import EmployeeContent from "../../Components/FaqComponents/Employee";
import PharmacyContent from "../../Components/FaqComponents/Pharmacy";
import ReportsContent from "../../Components/FaqComponents/Reports";
import RolesPermissionsContent from "../../Components/FaqComponents/RoleAndPermissions";
import { LockOutlined } from "@ant-design/icons";

const generateButtonStyle = (checked, background, color) => ({
  width: 250,
  height: 40,
  background: checked ? background : color,
  color: checked ? color : background,
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
});

const FaqPage = () => {
  const [selectedTab, setSelectedTab] = useState("All");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const tabContentMap = {
    All: <AllContent />,
    Employee: <EmployeeContent />,
    Pharmacy: <PharmacyContent />,
    "Reports & Files": <ReportsContent />,
    "Roles & permissions": <RolesPermissionsContent />,
  };
  const tabIconMap = {
    All: <Image preview={false} src={AllImg} />,
    Employee: <Image preview={false} src={AllImg} />,
    Pharmacy: <Image preview={false} src={AllImg} />,
    Reports: <Image preview={false} src={AllImg} />,
    "Roles & permissions": <LockOutlined />,
  };
  return (
    <div>
      <Row className="toggle-btn" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={24}>
          <div className="toggle-btn-container-faq">
            {Object.keys(tabContentMap).map((tab) => (
              <Button
                className="faq-btns"
                key={tab}
                style={generateButtonStyle(
                  selectedTab === tab,
                  "#3A3475",
                  "#F8FBFF"
                )}
                onClick={() => handleTabClick(tab)}
                icon={tabIconMap[tab]}
              >
                {tab}
              </Button>
            ))}
          </div>
        </Col>
      </Row>
      <Row
        className="faq-content-container"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col className="faq-content" span={24}>
          {tabContentMap[selectedTab]}
        </Col>
      </Row>
    </div>
  );
};

export default FaqPage;
