import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Image } from "antd";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import editIcon from "../../Assets/tabler_edit.svg";
import "./EmployeeDetails.css";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import Spinner from "../../Components/Spinner/Spinner";

const EmployeeDetails = () => {
  const { employee_id, pharmacy_id } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem("AuthorizationToken");
  useEffect(() => {
    const apiUrl = `${baseURL}/employee-details?user_id=${employee_id}`;
    const headers = {
      Authorization: `${authToken}`,
    };

    console.log("Authorization Token:", authToken);

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        setEmployeeDetails(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching employee details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [employee_id, authToken]);
  const breadcrumbItems = [
    { label: "Pharmacy", link: "/pharmacies" },
    { label: "Pharmacy Details", link: `/pharmacies/${pharmacy_id}` },
    {
      label: "Employee Details",
      link: `/pharmacies/${pharmacy_id}/pharmacydetails/${employee_id}`,
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
            items={breadcrumbItems}
            currentFontColor="black"
            previousFontColor="blue"
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
          <div className="labels-values-container">
            <div className="labels">
              <p>First name </p>
              <p>Last name </p>
              <p>Gender</p>
              <p>Date of birth</p>
              <p>Contact #</p>
              <p>E-mail</p>

              <p>Pharmacy postal code</p>
            </div>
            <div className="values">
              <p>{employeeDetails.FName}</p>
              <p> {employeeDetails.LName}</p>
              <p> {employeeDetails.Gender}</p>
              <p> {employeeDetails.DateOfBirth}</p>
              <p> {employeeDetails.Contact}</p>
              <p> {employeeDetails.Email}</p>
              <p> {employeeDetails.pharmacyPostCode}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeDetails;
