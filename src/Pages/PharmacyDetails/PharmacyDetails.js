import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import { Row, Col, Button, Space, Image } from "antd";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import CustomTable from "../../Components/CustomTable/CustomTable";
import eyeIcon from "../../Assets/Icon feather-eye.svg";
import deleteActionbtn from "../../Assets/deleteAction.svg";
import plusOutline from "../../Assets/PlusOutlined.svg";
import editIcon from "../../Assets/tabler_edit.svg";
import editIconBlue from "../../Assets/editInBlue.svg";
import Spinner from "../../Components/Spinner/Spinner";
import "./PharmacyDetails.css";
import { Link } from "react-router-dom";

const PharmacyDetails = () => {
  const { pharmacy_id } = useParams();

  const [pharmacyDetails, setPharmacyDetails] = useState(null);
  const [tableDataSource, setTableDataSource] = useState([]);

  useEffect(() => {
    const fetchPharmacyDetails = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/pharmacy-details?pharmacy_id=${pharmacy_id}`
        );
        const data = response.data;
        console.log(data);

        if (data && data.status === "success") {
          setPharmacyDetails(data.data);
          setTableDataSource(data.data.users);
        } else {
        }
      } catch (error) {
        console.error("Error fetching pharmacy details:", error);
      }
    };

    fetchPharmacyDetails();
  }, [pharmacy_id]);
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `${baseURL}/delete-pharmacy-user?pharmacy_id=${pharmacy_id}&user_id=${userId}`
      );

      if (response.data && response.data.status === "success") {
        const updatedTableData = tableDataSource.filter(
          (employee) => employee.id !== userId
        );
        setTableDataSource(updatedTableData);
      } else {
        console.error("Error deleting employee:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  if (!pharmacyDetails) {
    return <Spinner />;
  }
  const breadcrumbItems = [
    { label: "Pharmacy", link: "/pharmacies" },
    { label: "Pharmacy Details", link: `/pharmacies/${pharmacy_id}` },
  ];
  const tableColumns = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Employee Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Joining date",
      dataIndex: "dateOfCreation",
      key: "dateOfCreation",
    },

    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: "Action(s)",
      width: 150,
      fixed: "right",
      render: (text, record) => (
        <Space className="action-btns">
          <Link to={`${record.id}`}>
            <Image preview={false} src={eyeIcon}></Image>
          </Link>

          <Image
            preview={false}
            src={editIconBlue}
            style={{ fill: "#3A3475" }}
          ></Image>
          <Image
            preview={false}
            src={deleteActionbtn}
            onClick={() => handleDelete(record.id)}
          ></Image>
        </Space>
      ),
    },
  ];
  return (
    <div className="main-container-pharmacies">
      <Row className="pharmacy-list-breadcrumb">
        <Col className="breadcrumb-col" span={24}>
          <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
        </Col>
      </Row>
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
        style={{ margin: "5px", marginTop: "10px" }}
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col span={12}>
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
            <div className="values">
              <p>{pharmacyDetails.pharmacyName}</p>
              <p>{pharmacyDetails.postCode}</p>
              <p>{pharmacyDetails.line1}</p>
              <p>{pharmacyDetails.line2}</p>
              <p>{pharmacyDetails.postTown}</p>
              <p>{pharmacyDetails.dateOfCreation}</p>
              <p>{pharmacyDetails.rent}</p>
              <p>{pharmacyDetails.numberOfEmployees}</p>
            </div>
          </div>
        </Col>
        <Col className="second-row" span={12}>
          <CustomTable
            className="emp-table"
            dataSource={tableDataSource}
            columns={tableColumns.map((column) => ({
              ...column,
              title: (
                <span className="custom-table-header">{column.title}</span>
              ),
              render: (text, record) => (
                <span className="custom-table-content">
                  {typeof column.render === "function"
                    ? column.render(text, record)
                    : text}
                </span>
              ),
            }))}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PharmacyDetails;
