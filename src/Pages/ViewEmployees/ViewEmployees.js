import React, { useState, useEffect } from "react";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import Spinner from "../../Components/Spinner/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Image, message } from "antd";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import editIcon from "../../Assets/tabler_edit.svg";
import "./ViewEmployees.css";
import checkboxImg from "../../Assets/checkbox.svg";
import { Link } from "react-router-dom";
const ViewEmployees = () => {
  const { userID } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem("AuthorizationToken");
  useEffect(() => {
    const apiUrl = `${baseURL}/employee-details?user_id=${userID}`;
    const headers = {
      Authorization: `${authToken}`,
    };

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        setEmployeeDetails(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        message.error("Error fetching employee details", 3);
        console.error("Error fetching employee details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userID, authToken]);
  const breadcrumbItems = [
    { label: "Employees", link: "/employeepage" },
    {
      label: "Employee Details",
      link: `/employeepage/${userID}/viewUser`,
    },
  ];
  if (loading === true) {
    return <Spinner />;
  }
  const moduleMapping = {
    1: "Dashboard",
    2: "Reports",
    3: "Data live",
    4: "Pharmacy",
    5: "Data Tiles",
    6: "Employees",
  };

  return (
    <div className="main-container-pharmacy-details">
      <Row className="pharmacy-list-breadcrumb">
        <Col className="breadcrumb-col" span={24}>
          <CustomBreadcrumb
            seperator=">>"
            items={breadcrumbItems}
          ></CustomBreadcrumb>
        </Col>
      </Row>
      <Row
        style={{
          margin: "5px",
          marginTop: "20px",
          marginLeft: "10px",
          marginRight: "50px",
        }}
        justify="space-between"
      >
        <Col className="emp-detail-heading">
          <p>{employeeDetails.FName} details</p>
        </Col>
        <Col className="emp-detail-heading-btn">
          <Link to={`/employeepage/${userID}/editUser`}>
            <Button type="primary" className="primary-Class">
              <Image
                className="plus-outline-img"
                preview={false}
                src={editIcon}
              ></Image>
              Edit details
            </Button>
          </Link>
        </Col>
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
        <Col span={22} style={{ marginLeft: "20px" }}>
          <div className="Labels-values-container">
            <div className="labels">
              <p>First name </p>
              <p>Last name </p>
              <p>Gender</p>
              <p>Date of birth</p>
              <p>Contact #</p>
              <p>E-mail</p>
              <p>Role</p>
              <p>Salary</p>
              <p>Pharmacy postal code</p>
              <p>Line manager</p>
              <p>Address</p>
              <p>Pharmacy</p>
            </div>
            <div className="values">
              <p>{employeeDetails.FName || "None"}</p>
              <p> {employeeDetails.LName || "None"}</p>
              <p> {employeeDetails.Gender || "None"}</p>
              <p> {employeeDetails.DateOfBirth || "None"}</p>
              <p> {employeeDetails.Contact || "None"}</p>
              <p> {employeeDetails.Email || "None"}</p>
              <p> {employeeDetails.roleName || "None"}</p>
              <p> {employeeDetails.Salary || "None"}</p>
              <p>
                {employeeDetails.pharmacies &&
                  (employeeDetails.pharmacies.length > 0
                    ? employeeDetails.pharmacies
                        .map((value) => value.postCode)
                        .join(", ")
                    : "None")}
              </p>
              <p>
                {employeeDetails.pharmacies &&
                  (employeeDetails.pharmacies.some(
                    (value) => value.managerName !== ""
                  )
                    ? employeeDetails.pharmacies
                        .filter((value) => value.managerName !== "")
                        .map((value) => value.managerName)
                        .join(", ")
                    : "None")}
              </p>
              <p> {employeeDetails.Address || "None"}</p>
              <p>
                {employeeDetails.pharmacies &&
                  (employeeDetails.pharmacies.some((value) => value.name !== "")
                    ? employeeDetails.pharmacies
                        .filter((value) => value.name !== "")
                        .map((value) => value.name)
                        .join(", ")
                    : "None")}
              </p>
            </div>
            <div className="values2">
              <h5>Employee permissions</h5>
              {employeeDetails.permissions &&
                employeeDetails.permissions.map((permission, index) => (
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
            {/* <div className="values2">
              <h5>Employee permissions</h5>
              {employeeDetails.permissions &&
              employeeDetails.permissions.length > 0 ? (
                employeeDetails.permissions.map((permission, index) => (
                  <p key={index}>
                    <Image
                      className="bullet-image"
                      preview={false}
                      src={checkboxImg}
                    />{" "}
                    {permission}
                  </p>
                ))
              ) : (
                <p className="Nonetxt">None</p>
              )}
            </div> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ViewEmployees;
