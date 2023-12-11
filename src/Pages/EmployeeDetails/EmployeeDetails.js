import React from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import { Row, Col, Button, Image } from "antd";
// import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
// import CustomTable from "../../Components/CustomTable/CustomTable";
import plusOutline from "../../Assets/PlusOutlined.svg";
import editIcon from "../../Assets/tabler_edit.svg";
import "./EmployeeDetails.css";

const PharmacyDetails = () => {
  return (
    <div className="main-container-pharmacies">
      {/* <Row className="pharmacy-list-breadcrumb">
        <Col className="breadcrumb-col" span={24}>
          <CustomBreadcrumb
            items={breadcrumbItems}
            currentFontColor="black"
            previousFontColor="blue"
          ></CustomBreadcrumb>
        </Col>
      </Row> */}
      <Row
        style={{ margin: "5px", marginTop: "20px" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="pharm-detail-heading" span={6}>
          <p>Pharmacy detail view</p>
        </Col>
        <Col className="primary-btns" span={6}>
          <Button type="primary" className="primary-class">
            <Image
              className="plus-outline-img"
              preview={false}
              src={editIcon}
            ></Image>
            Edit details
          </Button>
        </Col>
        <Col className="pharm-detail-heading" span={8}>
          <p>Pharmacy employees</p>
        </Col>
        <Col className="gutter-row" span={2}>
          <Button type="primary" className="plus-btn">
            <Image
              className="plus-outline-img"
              preview={false}
              src={plusOutline}
            ></Image>
            Create employee
          </Button>
        </Col>
      </Row>
      <Row
        style={{ margin: "5px", marginTop: "10px", border: "1px solid black" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col span={4}>
          <div className="labels-values-container">
            <div className="labels">
              <p>Pharmacy Name</p>
              <p>Post code</p>
              <p>Building Name</p>
              <p>Street Name</p>
              <p>Town</p>
              <p>Creation Date</p>
              <p>Rent</p>
              <p>No of employees</p>
              <p>Manager</p>
            </div>
          </div>
        </Col>
        <Col span={4}>
          <div className="values">
            <p>emp details</p>
            {/* <p>{pharmacyDetails.postCode}</p>
              <p>{pharmacyDetails.line1}</p>
              <p>{pharmacyDetails.line2}</p>
              <p>{pharmacyDetails.postTown}</p>
              <p>{pharmacyDetails.dateOfCreation}</p>
              <p>{pharmacyDetails.rent}</p>
              <p>{pharmacyDetails.numberOfEmployees}</p> */}
          </div>
        </Col>
        <Col span={12}>
          <div className="values">
            <p>emp details</p>
            {/* <p>{pharmacyDetails.postCode}</p>
              <p>{pharmacyDetails.line1}</p>
              <p>{pharmacyDetails.line2}</p>
              <p>{pharmacyDetails.postTown}</p>
              <p>{pharmacyDetails.dateOfCreation}</p>
              <p>{pharmacyDetails.rent}</p>
              <p>{pharmacyDetails.numberOfEmployees}</p> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PharmacyDetails;
