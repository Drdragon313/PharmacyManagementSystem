import React, { useState, useEffect } from "react";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import Spinner from "../../Components/Spinner/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Image, message } from "antd";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import editIcon from "../../Assets/tabler_edit.svg";
import "./ViewEmployees.css";
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
        style={{ margin: "5px", marginTop: "20px", marginLeft: "10px" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="emp-detail-heading" span={6}>
          <p>{employeeDetails.FName} details</p>
        </Col>
        <Col className="primary-btns" span={6}></Col>
        <Col className="emp-detail-heading-btn" span={6}>
          <Link to={`/employeepage/${userID}/editUser`}>
            <Button
              style={{ marginLeft: "90px" }}
              type="primary"
              className="primary-class"
            >
              <Image
                className="plus-outline-img"
                preview={false}
                src={editIcon}
              ></Image>
              Edit details
            </Button>
          </Link>
        </Col>
        <Col className="gutter-row" span={4}></Col>
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
              <p>{employeeDetails.FName}</p>
              <p> {employeeDetails.LName}</p>
              <p> {employeeDetails.Gender}</p>
              <p> {employeeDetails.DateOfBirth}</p>
              <p> {employeeDetails.Contact}</p>
              <p> {employeeDetails.Email}</p>
              <p> {employeeDetails.roleName}</p>
              <p> {employeeDetails.roleName}</p>
              <p>
                {employeeDetails.pharmacies.map((value, index) => (
                  <span key={value.id}>
                    {value.postCode}
                    {index < employeeDetails.pharmacies.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p>
                {employeeDetails.pharmacies.map((value, index) => (
                  <span key={value.id}>
                    {value.managerName}
                    {index < employeeDetails.pharmacies.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p> {employeeDetails.Address}</p>
              <p>
                {employeeDetails.pharmacies.map((value, index) => (
                  <span key={value.id}>
                    {value.name}
                    {index < employeeDetails.pharmacies.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ViewEmployees;
