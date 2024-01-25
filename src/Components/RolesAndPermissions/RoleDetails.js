import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row, Col, Image } from "antd";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";

import "./RoleDetails.css";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import Spinner from "../../Components/Spinner/Spinner";
import checkboxImg from "../../Assets/tickbullet.svg";
import usersImg from "../../Assets/assigneusersicon.svg";
const RoleDetails = () => {
  const { role_id } = useParams();
  const [roleDetails, setRoleDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem("AuthorizationToken");
  useEffect(() => {
    const apiUrl = `${baseURL}/role-details?role_id=${role_id}`;
    const headers = {
      Authorization: `${authToken}`,
    };

    console.log("Authorization Token:", authToken);

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        setRoleDetails(response.data.Data);
        console.log(response.data.Data);
      })
      .catch((error) => {
        console.error("Error fetching role details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [role_id, authToken]);
  const breadcrumbItems = [
    { label: "Pharmacy", link: "/employeepage" },
    {
      label: "Role Details",
      link: `/employeepage/${role_id}/details`,
    },
  ];
  const moduleMapping = {
    1: "Dashboard",
    2: "Reports",
    3: "Data live",
    4: "Pharmacy",
    5: "Data Tiles",
    6: "Employees",
  };
  if (loading === true) {
    return <Spinner />;
  }
  return (
    <div className="main-container-role-details">
      <Row className="pharmacy-list-breadcrumb">
        <Col className="breadcrumb-col" span={24}>
          <CustomBreadcrumb
            items={breadcrumbItems}
            currentFontColor="black"
            previousFontColor="blue"
          ></CustomBreadcrumb>
        </Col>
      </Row>
      <Row
        style={{
          margin: "5px",
          marginTop: "20px",
          marginLeft: "10px",
          justifyContent: "space-between",
        }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="emp-detail-heading" span={4}>
          <p>Role Details</p>
        </Col>

        <Col className="emp-detail-heading-btn" span={6}></Col>
      </Row>
      <Row
        style={{ margin: "5px", marginTop: "10px" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col span={24} style={{ marginLeft: "20px" }}>
          <div className="labels-values-container">
            <div className="labels">
              <p>Role Name</p>
              <p>Created on </p>
              <p>Number of Assigned Users</p>
              <p>Assigned Users</p>
            </div>
            <div className="values">
              <p> {roleDetails.name}</p>
              <p> {roleDetails.created_at}</p>
              <p>{roleDetails.assigned_users}</p>
              {roleDetails.users &&
                roleDetails.users.map((user, index) => (
                  <div>
                    <span className="assigned-users-list" key={index}>
                      <Image
                        className="bullet-image"
                        preview={false}
                        src={usersImg}
                      />
                      {user.name} - {user.email}
                    </span>
                  </div>
                ))}
            </div>

            <div className="values2">
              {roleDetails.role_permissions.map((permission, index) => (
                <div key={index}>
                  {permission.actions.read && (
                    <p>
                      <Image
                        className="bullet-image"
                        preview={false}
                        src={checkboxImg}
                      />
                      {` View ${moduleMapping[permission.module_id]}`}
                    </p>
                  )}
                  {permission.actions.write && (
                    <p>
                      <Image
                        className="bullet-image"
                        preview={false}
                        src={checkboxImg}
                      />
                      {` Write Data Against Available Schemas within ${
                        moduleMapping[permission.module_id]
                      }`}
                    </p>
                  )}
                  {permission.actions.update && (
                    <p>
                      <Image
                        className="bullet-image"
                        preview={false}
                        src={checkboxImg}
                      />
                      {` Update Services Offered by Each ${
                        moduleMapping[permission.module_id]
                      }`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RoleDetails;
