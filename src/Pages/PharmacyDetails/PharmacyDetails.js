import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import { Row, Col, Button, Space, Image, message } from "antd";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import CustomTable from "../../Components/CustomTable/CustomTable";
import eyeIcon from "../../Assets/Icon feather-eye.svg";
import deleteActionbtn from "../../Assets/deleteAction.svg";
import plusOutline from "../../Assets/PlusOutlined.svg";
import editIcon from "../../Assets/editInBlue.svg";

import Spinner from "../../Components/Spinner/Spinner";
import "./PharmacyDetails.css";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";

import AddEmployeeModal from "../../Components/AddEmployeeModal/AddEmployeeModal";
import CustomButton from "../../Components/CustomButton/CustomButton";

const PharmacyDetails = () => {
  const { pharmacy_id } = useParams();
  const [initialSelectedUsers, setInitialSelectedUsers] = useState([]);
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

        // Fetch updated pharmacy details after deleting the user
        const pharmacyDetailsResponse = await axios.get(
          `${baseURL}/pharmacy-details?pharmacy_id=${pharmacy_id}`
        );
        const pharmacyDetailsData = pharmacyDetailsResponse.data;

        if (pharmacyDetailsData && pharmacyDetailsData.status === "success") {
          setPharmacyDetails(pharmacyDetailsData.data);
        }

        message.success(
          "User's Association with the pharmacy has been removed ",
          3
        );
      } else {
        console.error("Error deleting employee:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }

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
      dataIndex: "role_name",
      key: "role_name",
    },
    {
      title: "Joining date",
      dataIndex: "joining_date",
      key: "joining_date",
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
    setIsDeleteModalVisible(false);
  };
  const handleAddEmployee = async (employeeData) => {
    try {
      if (Array.isArray(employeeData)) {
        setTableDataSource((prevTableData) => [
          ...prevTableData,
          ...employeeData,
        ]);

        setInitialSelectedUsers((prevSelectedUsers) => [
          ...prevSelectedUsers,
          ...employeeData.map((employee) => employee.id),
        ]);
      }

      setIsAddEmployeeModalVisible(false);
      window.location.reload();
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
            <CustomButton type="default" className="edit-btn-pharmacy-details">
              <Image
                className="edit-outline-img"
                preview={false}
                src={editIcon}
              ></Image>
              Edit details
            </CustomButton>
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
          <div className="labels-values-container-pharm">
            <div>
              <div className="pharm-labels-values">
                <strong>Pharmacy Name </strong>{" "}
                <p>{pharmacyDetails.pharmacyName}</p>
              </div>

              <div className="pharm-labels-values">
                <strong>Creation Date </strong>{" "}
                <p>{pharmacyDetails.dateOfCreation}</p>
              </div>
              <div className="pharm-labels-values">
                <strong>Rent</strong> <p> {pharmacyDetails.rent}</p>
              </div>
              <div className="pharm-labels-values">
                <strong>No of employees</strong>{" "}
                <p> {pharmacyDetails.numberOfEmployees}</p>
              </div>
              <div className="pharm-labels-values">
                <strong>Manager</strong> <p> {pharmacyDetails.managerName}</p>
              </div>
              <div className="pharm-labels-values">
                <strong>Post code </strong> <p>{pharmacyDetails.postCode}</p>
              </div>
              <div className="pharm-labels-values">
                <strong>Building Name</strong> <p> {pharmacyDetails.line1}</p>
              </div>
              <div className="pharm-labels-values">
                <strong>Town</strong> <p> {pharmacyDetails.postTown}</p>
              </div>
              <div className="pharm-labels-values">
                <strong>Street Name</strong> <p> {pharmacyDetails.line2}</p>
              </div>
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
        initialSelectedUsers={initialSelectedUsers}
      />
      <ConfirmationModal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        onClose={handleCancelDelete}
        confirmationHeading="Delete User"
        confirmationText="Are you sure you want to disassociate this user from the pharmacy? This action cannot be undone."
        btnTxt="Delete"
        cancelText="Cancel"
        btnclassName="delete-btn-modal"
      >
        Are you sure you want to delete this pharmacy?
      </ConfirmationModal>
    </div>
  );
};

export default PharmacyDetails;
