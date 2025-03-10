import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
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
    {
      label: "Pharmacy Details",
      link: `/pharmacies/${pharmacy_id}/pharmacydetails`,
    },
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
        <Col className="emp-detail-heading" span={12}>
          <p>{employeeDetails.FName} details</p>
        </Col>
      </Row>

      <div className="emp-details-container">
        <div className="labels-values-container">
          <div className="labels">
            <p className="labels-txt">First name </p>
            <p>Last name </p>
            <p>Gender</p>
            <p>Date of birth</p>
            <p>Contact #</p>
            <p>E-mail</p>
          </div>
          <div className="values">
            <p>{employeeDetails.FName}</p>
            <p> {employeeDetails.LName}</p>
            <p> {employeeDetails.Gender || "None"}</p>
            <p> {employeeDetails.DateOfBirth}</p>
            <p> {employeeDetails.Contact}</p>
            <p> {employeeDetails.Email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
