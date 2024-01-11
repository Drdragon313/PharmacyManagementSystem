import React, { useState, useEffect } from "react";
import "./EmployeeListing.css";
import axios from "axios";
import { Col, Image, Row, Space, message, Input } from "antd";
import eyeIcon from "../../Assets/Icon feather-eye.svg";
import editicon from "../../Assets/editInBlue.svg";
import deleteActionbtn from "../../Assets/deleteAction.svg";
import { Link } from "react-router-dom";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import Spinner from "../../Components/Spinner/Spinner";
import rightArrow from "../../Assets/rightarrow.svg";
import leftArrow from "../../Assets/leftarrow.svg";
import SignInFirstModal from "../../Components/SingInFirstModal/SignInFirstModal";
import CustomButton from "../../Components/CustomButton/CustomButton";
import plusOutline from "../../Assets/PlusOutlined.svg";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";
import PaginationComponent from "../../Components/PaginationComponent/PaginationComponent";
import deleteImg from "../../Assets/deleteexclaim.svg";
import resendInviteIcon from "../../Assets/resendInviteIcon.svg";
const { Search } = Input;

const EmployeeListing = () => {
  const [tableDataSource, setTableDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [employeeToDeleteId, setEmployeeToDeleteId] = useState(null);
  const [pharmacyToDeleteId, setPharmacyToDeleteId] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [sortField, setSortField] = useState("salary");
  const [sortDirection, setSortDirection] = useState("asc");
  const [availablePostalCodes, setAvailablePostalCodes] = useState([]);
  const [availableRoles, setAvailableRoles] = useState();
  const authToken = localStorage.getItem("AuthorizationToken");
  const [modalVisible, setModalVisible] = useState(!authToken);
  const [selectedPostalCode, setSelectedPostalCode] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [statusEmail, setStatusEmail] = useState("");
  const [searchedName, setSearchedName] = useState("");

  const handlePostalCodeChange = (value) => {
    setSelectedPostalCode(value === "" ? "" : value);
  };
  const handleRoleChange = (value) => {
    setSelectedRole(value === "" ? "" : value);
  };

  useEffect(() => {
    const fetchPostalCodes = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/list-available-postcodes`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const postCodeData = response.data;

        if (postCodeData && postCodeData.postCodes) {
          setAvailablePostalCodes(postCodeData.postCodes);
        }
      } catch (error) {
        console.error("Error fetching postal codes:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${baseURL}/list-available-roles`, {
          headers: {
            Authorization: `${authToken}`,
          },
        });
        const roleData = response.data.Data.roles;

        if (roleData) {
          setAvailableRoles(roleData);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/list-employees?search_name=${searchedName}&page=${page}&limit=${limit}&role_id=${selectedRole}&post_code=${selectedPostalCode}&sort_field=${sortField}&sort_direction=${sortDirection}`,
          {
            headers: {
              Authorization: ` ${authToken}`,
            },
          }
        );
        const data = response.data;

        if (data && data.data) {
          setTableDataSource(data.data);
          setTotalItems(data.totalItems);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostalCodes();
    fetchRoles();
    fetchData();
  }, [
    page,
    limit,
    sortDirection,
    sortField,
    selectedPostalCode,
    selectedRole,
    searchedName,
    authToken,
  ]);
  const showDeleteModal = (employeeId, pharmacyID) => {
    setDeleteModalVisible(true);
    setEmployeeToDeleteId(employeeId);
    setPharmacyToDeleteId(pharmacyID);
  };
  const handleStatusClick = (status, record) => {
    if (status === "Awaiting") {
      setStatusModalVisible(true);
      setStatusEmail(record.email);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };
  const handleSortChange = (columnKey, order) => {
    setSortField(columnKey);
    setSortDirection((prevSortDirection) =>
      columnKey === sortField
        ? prevSortDirection === "asc"
          ? "desc"
          : "asc"
        : "asc"
    );
    setPage(page);
  };

  const handleDelete = (employeeId, pharmacyID) => {
    showDeleteModal(employeeId, pharmacyID);
  };
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${baseURL}/delete-user?user_id=${employeeToDeleteId}&pharmacy_id=${pharmacyToDeleteId}`
      );
      const updatedData = tableDataSource.filter(
        (item) => item.userID !== employeeToDeleteId
      );
      setTableDataSource(updatedData);
      message.success("Employee Deleted Successfully", 3);
    } catch (error) {
      message.error("Error deleting Employee", 3);
      console.error(error);
    } finally {
      setDeleteModalVisible(false);
    }
  };
  const handleConfirmResend = async () => {
    try {
      await axios.post(`${baseURL}/forget`, {
        email: statusEmail,
      });
      message.success("Invite Resent Successfully", 3);
    } catch (error) {
      message.error("Invite Resending Failed", 3);
    } finally {
      setStatusModalVisible(false);
    }
  };
  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };
  const handleCancelResend = () => {
    setStatusModalVisible(false);
  };

  const tableColumns = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: "10%",
    },
    {
      title: "Date of birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: "10%",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      ellipsis: true,
      render: (text, record) => (
        <>
          <span
            className="status-circle"
            style={{
              backgroundColor:
                text === "Active"
                  ? "green"
                  : text === "Inactive"
                  ? "red"
                  : text === "Awaiting" || text === "Request sent"
                  ? "yellow"
                  : "gray",
            }}
          ></span>
          <span
            onClick={() => handleStatusClick(text, record)}
            className={`status-text ${
              text === "Awaiting" ? "status-pointer" : ""
            }`}
          >
            {text}
          </span>
        </>
      ),
      sorter: true,
      showSorterTooltip: false,
      sortOrder: sortField === "status" && sortDirection,
      onHeaderCell: (column) => ({
        onClick: () => handleSortChange(column.dataIndex, column.order),
      }),
    },
    {
      title: "Pharmacy Postal Code",
      dataIndex: "pharmacyPostCode",
      key: "pharmacyPostCode",
      width: "10%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      width: "10%",
      sorter: true,
      showSorterTooltip: false,
      sortOrder: sortField === "salary" && sortDirection,
      onHeaderCell: (column) => ({
        onClick: () => handleSortChange(column.dataIndex, column.order),
      }),
    },
    {
      title: "Action(s)",
      width: "10%",
      fixed: "right",
      render: (text, record) => (
        <Space className="action-btns">
          <Link to={`${record.userID}/viewUser`}>
            <Image preview={false} src={eyeIcon}></Image>
          </Link>
          <Link to={`${record.userID}/editUser`}>
            <Image preview={false} src={editicon}></Image>
          </Link>
          <Image
            preview={false}
            src={deleteActionbtn}
            onClick={() => handleDelete(record.userID, record.pharmacyID)}
          ></Image>
        </Space>
      ),
    },
  ];

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <Image
          preview={false}
          src={leftArrow}
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        ></Image>
      );
    }
    if (type === "next") {
      return (
        <Image
          preview={false}
          src={rightArrow}
          disabled={page * limit >= totalItems}
          onClick={() => handlePageChange(page + 1)}
        ></Image>
      );
    }
    return originalElement;
  };
  if (loading === true) {
    return <Spinner />;
  }

  if (!authToken) {
    const openModal = () => {
      setModalVisible(true);
    };
    return <SignInFirstModal visible={modalVisible} open={openModal} />;
  }
  const handleSearch = (searchValue) => {
    setSearchedName(searchValue);
  };
  return (
    <>
      <div className="main-container-employees">
        <Row
          className="employee-list-breadcrumb"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        ></Row>
        <Row
          className="employee-list-head"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <ConfirmationModal
            title="Confirm Delete"
            open={deleteModalVisible}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            titleImage={<Image src={deleteImg} preview={false}></Image>}
            okText="Yes"
            btnTxt="Delete"
            btnclassName="delete-modal-ok-btn"
            cancelText="Cancel"
            confirmationHeading="Remove Employee"
            confirmationText="Are you sure you want to remove this employee from this pharmacy? The employee will not be deleted from system but will be removed from pharmacy"
          ></ConfirmationModal>
          <ConfirmationModal
            title="Resend Invite"
            open={statusModalVisible}
            onConfirm={handleConfirmResend}
            onCancel={handleCancelResend}
            titleImage={<Image src={resendInviteIcon} preview={false}></Image>}
            okText="Yes"
            btnTxt="Send"
            btnclassName="resend-modal-ok-btn"
            cancelText="Cancel"
            confirmationHeading="Resend Invite"
            confirmationText=" Are you sure you want to resend invite to this user? This
            action cannot be undone."
          ></ConfirmationModal>
          {/* <Modal
            title="Resend Invite"
            open={statusModalVisible}
            onOk={handleConfirmResend}
            onCancel={handleCancelResend}
            okText="Send"
            cancelText="Cancel"
          >
            Are you sure you want to resend invite to this user? <br /> This
            action cannot be undone.
          </Modal> */}
          <Col className="gutter-row" span={6}>
            <p className="employee-list-head-txt">Employees list</p>
          </Col>

          <Col className="gutter-row" span={6}>
            {" "}
            <Link to="/users/AddUser">
              <CustomButton type="primary" title="" className="CreateEmpBtn">
                <Image
                  className="plus-outline-img"
                  preview={false}
                  src={plusOutline}
                ></Image>
                Create Employee
              </CustomButton>
            </Link>
          </Col>
        </Row>
        <Row
          className="employee-list-search-filter-container"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col className="gutter-row" span={17}>
            <Col className="gutter-row" span={12}>
              <Search
                placeholder="Search Here..."
                onSearch={handleSearch}
                enterButton
              />
            </Col>
          </Col>
          <Col className="filter-container-emp" span={3.5}>
            <div className="custom-select-container">
              <select
                className="filter-role-btn"
                value={selectedRole}
                // onChange={(e) => setSelectedRole(e.target.value)}
                onChange={(e) => handleRoleChange(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Role
                </option>
                {selectedRole && <option value="">Clear Filter</option>}
                {availableRoles &&
                  availableRoles.map((role) => (
                    <option
                      className="select-options"
                      key={role.id}
                      value={role.id}
                    >
                      {role.name}
                    </option>
                  ))}
              </select>
            </div>
          </Col>
          <Col className="filter-container-emp" span={3.5}>
            <div className="custom-select-container">
              <select
                className="filter-emp-btn"
                value={selectedPostalCode}
                // onChange={(e) => setSelectedPostalCode(e.target.value)}
                onChange={(e) => handlePostalCodeChange(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Pharmacy postal code
                </option>
                {selectedPostalCode && <option value="">Clear Filter</option>}

                {availablePostalCodes.map((postalCode) => (
                  <option
                    className="select-options"
                    key={postalCode}
                    value={postalCode}
                  >
                    {postalCode}
                  </option>
                ))}
              </select>
            </div>
          </Col>
        </Row>
        <Row
          className=""
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col className="table-row" span={24}>
            <CustomTable
              className="employee-details-table"
              dataSource={tableDataSource}
              footer={false}
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
            <PaginationComponent
              limit={limit}
              handleLimitChange={handleLimitChange}
              page={page}
              totalItems={totalItems}
              handlePageChange={handlePageChange}
              itemRender={itemRender}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default EmployeeListing;
