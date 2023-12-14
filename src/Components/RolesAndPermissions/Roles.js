import React, { useState } from "react";

import { Col, Row } from "antd";
import SignInFirstModal from "../../Components/SingInFirstModal/SignInFirstModal";
// import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import CustomButton from "../CustomButton/CustomButton";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Roles = () => {
  const authToken = localStorage.getItem("AuthorizationToken");
  const [modalVisible, setModalVisible] = useState(!authToken);
  //   const breadcrumbItems = [{ label: "Roles and Permission", link: "/users" }];
  if (!authToken) {
    const openModal = () => {
      setModalVisible(true);
    };
    return <SignInFirstModal visible={modalVisible} open={openModal} />;
  }
  return (
    <div className="main-container">
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        style={{ marginTop: "10px", marginLeft: "1px" }}
      >
        <Col className="gutter-row" span={8}>
          <Link to="/rolesandpermissions/createrole">
            <CustomButton
              type="primary"
              style={{ width: "40%", height: "40px" }}
            >
              Create Role
            </CustomButton>
          </Link>
        </Col>
        <Col className="gutter-row" span={4}></Col>
        <Col className="gutter-row" span={6}></Col>
        <Col className="gutter-row" span={6}></Col>
      </Row>
    </div>
  );
};

export default Roles;
