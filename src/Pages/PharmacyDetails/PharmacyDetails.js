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
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";

import AddEmployeeModal from "../../Components/AddEmployeeModal/AddEmployeeModal";

const PharmacyDetails = () => {
  const { pharmacy_id } = useParams();

  const [pharmacyDetails, setPharmacyDetails] = useState(null);
  const [tableDataSource, setTableDataSource] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedUserIdToDelete, setSelectedUserIdToDelete] = useState(null);

  const [isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] =
    useState(false);

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
  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${baseURL}/delete-pharmacy-user?pharmacy_id=${pharmacy_id}&user_id=${selectedUserIdToDelete}`
      );

      if (response.data && response.data.status === "success") {
        const updatedTableData = tableDataSource.filter(
          (employee) => employee.id !== selectedUserIdToDelete
        );
        setTableDataSource(updatedTableData);
      } else {
        console.error("Error deleting employee:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }

    // Close the delete confirmation modal
    setIsDeleteModalVisible(false);
  };

  if (!pharmacyDetails) {
    return <Spinner />;
  }
  const breadcrumbItems = [
    { label: "Pharmacy", link: "/pharmacies" },
    {
      label: "Pharmacy Details",
      link: `/pharmacies/${pharmacy_id}/pharmacydetails`,
    },
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

  const showAddEmployeeModal = () => {
    setIsAddEmployeeModalVisible(true);
  };

  const handleCancelAddEmployeeModal = () => {
    setIsAddEmployeeModalVisible(false);
  };
  const handleDelete = (userId) => {
    setSelectedUserIdToDelete(userId);
    setIsDeleteModalVisible(true);
  };
  const handleCancelDelete = () => {
    // Close the delete confirmation modal
    setIsDeleteModalVisible(false);
  };
  const handleAddEmployee = async (employeeData) => {
    try {
      // Add logic to send data to the server and update state
      console.log("Adding employee:", employeeData);

      // Close the modal after adding employee
      setIsAddEmployeeModalVisible(false);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };
  return (
    <div>
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
          <Link to={`/pharmacies/${pharmacy_id}/pharmacyedit`}>
            <Button type="primary" className="primary-class">
              <Image
                className="plus-outline-img"
                preview={false}
                src={editIcon}
              ></Image>
              Edit details
            </Button>
          </Link>
        </Col>
        <Col className="pharm-detail-heading" span={6}>
          <p>Pharmacy employees</p>
        </Col>
        <Col className="gutter-row" span={4}>
          <Button
            type="primary"
            className="plus-btn-add-emp"
            onClick={showAddEmployeeModal}
          >
            <Image
              className="plus-outline-img"
              preview={false}
              src={plusOutline}
            ></Image>
            Add employee to pharmacy
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
      <AddEmployeeModal
        open={isAddEmployeeModalVisible}
        onCancel={handleCancelAddEmployeeModal}
        onAddEmployee={handleAddEmployee}
        pharmacy_id={pharmacy_id}
      />
      <ConfirmationModal
        open={isDeleteModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default PharmacyDetails;
