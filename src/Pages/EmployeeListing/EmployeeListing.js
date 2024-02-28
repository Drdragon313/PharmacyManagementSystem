import React, { useState, useEffect } from "react";
import "./EmployeeListing.css";
import axios from "axios";
import { Col, Image, Row, Space, message, Input, Select } from "antd";
import eyeIcon from "../../Assets/Icon feather-eye.svg";
import editicon from "../../Assets/editInBlue.svg";
import deleteActionbtn from "../../Assets/deleteAction.svg";
import { Link } from "react-router-dom";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import Spinner from "../../Components/Spinner/Spinner";
import rightArrow from "../../Assets/rightarrow.svg";
import leftArrow from "../../Assets/leftarrow.svg";
import CustomButton from "../../Components/CustomButton/CustomButton";
import plusOutline from "../../Assets/PlusOutlined.svg";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";
import PaginationComponent from "../../Components/PaginationComponent/PaginationComponent";
import deleteImg from "../../Assets/deleteexclaim.svg";
import resendInviteIcon from "../../Assets/resendInviteIcon.svg";
import { fetchUserPermissions } from "../../Utility Function/ModulesAndPermissions";
import bookImg from "../../Assets/notebook.svg";
import rolesImg from "../../Assets/material-symbols_map-outline-rounded.svg";
const { Search } = Input;

const EmployeeListing = () => {
  const [tableDataSource, setTableDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [employeeToDeleteId, setEmployeeToDeleteId] = useState(null);
  const [pharmacyToDeleteId, setPharmacyToDeleteId] = useState(null);
  const [userPermissions, setUserPermissions] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [sortField, setSortField] = useState("salary");
  const [sortDirection, setSortDirection] = useState("asc");
  const [availablePostalCodes, setAvailablePostalCodes] = useState([]);
  const [availableRoles, setAvailableRoles] = useState();
  const authToken = localStorage.getItem("AuthorizationToken");
  const [selectedPostalCode, setSelectedPostalCode] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);
  const [statusEmail, setStatusEmail] = useState("");
  const [searchedName, setSearchedName] = useState("");

  const handlePostalCodeChange = (value) => {
    setSelectedPostalCode(value === "" ? "" : value);
  };
  const handleRoleChange = (value) => {
    setPage(1);
    setSelectedRole(value === "" ? "" : value);
  };

  useEffect(() => {
    const fetchPostalCodes = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/list-available-postcodes`,
          {
            headers: {
              Authorization: `${authToken}`,
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
        if (data && data.data === null) {
          setTableDataSource([]);
          setTotalItems(0);
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
  useEffect(() => {
    const fetchUserPermissionData = async () => {
      try {
        await fetchUserPermissions(setUserPermissions);
      } catch (error) {
        console.error("Error fetching user permissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPermissionData();
  }, []);
  const canCreateEmployee =
    userPermissions?.find((module) => module.module_name === "Employees")
      ?.actions?.write || false;
  const canDeleteEmployee =
    userPermissions?.find((module) => module.module_name === "Employees")
      ?.actions?.delete || false;
  const canEditEmployee =
    userPermissions?.find((module) => module.module_name === "Employees")
      ?.actions?.update || false;

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
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "17%",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      width: "10%",
    },

    {
      title: "Pharmacy Postal Code",
      dataIndex: "pharmacyPostCode",
      key: "pharmacyPostCode",
      width: "13%",

      render: (text, record) => {
        if (record.PharmacyDetails && record.PharmacyDetails.length > 0) {
          const postalCodes = record.PharmacyDetails.map(
            (pharmacy) => pharmacy.post_code
          );
          return <span>{postalCodes.join(", ")}</span>;
        }
        return <span></span>;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      width: "7%",
      sorter: true,
      showSorterTooltip: false,
      sortOrder: sortField === "salary" && sortDirection,
      onHeaderCell: (column) => ({
        onClick: () => handleSortChange(column.dataIndex, column.order),
      }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "8%",

      render: (text, record) => (
        <>
          <span
            className="status-circle"
            style={{
              textDecoration: text === "Awaiting" ? "underline" : "none",
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
      title: "Action(s)",
      width: "10%",
      fixed: "right",
      render: (text, record) => (
        <Space className="action-btns">
          <Link to={`${record.userID}/viewUser`}>
            <Image preview={false} src={eyeIcon}></Image>
          </Link>
          {canEditEmployee && (
            <Link to={`${record.userID}/editUser`}>
              <Image preview={false} src={editicon}></Image>
            </Link>
          )}
          {canDeleteEmployee && (
            <Image
              preview={false}
              src={deleteActionbtn}
              onClick={() => handleDelete(record.userID, record.pharmacyID)}
            ></Image>
          )}
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

  const placeholderSelect = () => {
    return (
      <div className="placeholder-for-select-postcodes">
        <div>
          <Image className="filter-icon" src={bookImg} preview={false} />
          <span> Pharmacy postal code</span>
        </div>
      </div>
    );
  };
  const placeholderSelectRoles = () => {
    return (
      <div className="placeholder-for-select-postcodes">
        <div>
          <Image className="filter-icon" src={rolesImg} preview={false} />
          <span> Roles</span>
        </div>
      </div>
    );
  };

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
            confirmationText="Are you sure you want to remove this employee? The employee will be deleted from system parmanently."
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

          <p className="employee-list-head-txt">Employees list</p>

          {canCreateEmployee && (
            <Link to="/users/AddUser">
              <CustomButton type="primary" className="create-emp-btn ">
                <Image
                  className="plus-outline-img"
                  preview={false}
                  src={plusOutline}
                ></Image>
                Create Employee
              </CustomButton>
            </Link>
          )}
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
          <div className="search-col">
            <Search
              className="search-bar"
              placeholder="Search Here..."
              onSearch={handleSearch}
              enterButton
              allowClear
            />
          </div>

          <div className="filter-container-emp-list">
            <Select
              allowClear={true}
              className="filter-pharm-btn"
              mode="multiple"
              value={selectedRole}
              onChange={handleRoleChange}
              placeholder={placeholderSelectRoles()}
              showSearch={false}
              optionLabelProp="label"
            >
              {availableRoles &&
                availableRoles.map((role) => (
                  <Select.Option
                    className="select-options"
                    key={role.id}
                    value={role.id}
                    label={role.name}
                  >
                    {role.name}
                  </Select.Option>
                ))}
            </Select>
            <Select
              allowClear={true}
              className="filter-pharm-btn"
              mode="multiple"
              value={selectedPostalCode}
              onChange={(values) => handlePostalCodeChange(values)}
              placeholder={placeholderSelect()}
              showSearch={false}
              optionLabelProp="label"
            >
              {availablePostalCodes.map((postalCode) => (
                <Select.Option
                  className="select-options"
                  key={postalCode}
                  value={postalCode}
                  label={postalCode}
                >
                  {postalCode}
                </Select.Option>
              ))}
            </Select>
          </div>
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
          <Col
            className="employee-details-table"
            span={{ xs: 24, sm: 16, md: 8, lg: 4 }}
          >
            <CustomTable
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
          </Col>
          <Col>
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
