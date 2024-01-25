import React, { useState, useEffect } from "react";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { Col, Image, Row, Space } from "antd";
import SignInFirstModal from "../../Components/SingInFirstModal/SignInFirstModal";
// import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import eyeIcon from "../../Assets/Icon feather-eye.svg";
import CustomButton from "../CustomButton/CustomButton";
import deleteActionbtn from "../../Assets/deleteAction.svg";
import "./CreateRole.css";
import editIconBlue from "../../Assets/editInBlue.svg";
import { Link } from "react-router-dom";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";

import axios from "axios";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import ReAssignModal from "../ReAssignModal/ReAssignModal";

const Roles = () => {
  const authToken = localStorage.getItem("AuthorizationToken");
  const [modalVisible, setModalVisible] = useState(!authToken);
  const [rolesData, setRolesData] = useState(null);
  const [totalItems, setTotalItems] = useState();
  const [ConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [roleIdToDelete, setRoleIdToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchRolesData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/list-available-roles?page=${page}&limit=${limit}`
        );
        const data = response.data;

        if (data && data.Data && data.Data.roles) {
          setRolesData(data.Data.roles);
          setTotalItems(data.Data);
        } else {
          console.error("Invalid response format:", data);
        }
      } catch (error) {
        console.error("Error fetching roles data:", error);
      }
    };

    fetchRolesData();
  }, [page, limit]);
  const handleDelete = (roleId) => {
    setRoleIdToDelete(roleId);
    setConfirmationModalVisible(true);
  };

  const handleConfirmDelete = () => {
    // Update rolesData state based on the newRoleId
    const updatedRolesData = rolesData.filter(
      (role) => role.id !== roleIdToDelete
    );
    setRolesData(updatedRolesData);

    setRoleIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmationModalVisible(false);
    setRoleIdToDelete(null);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };
  const renderPagination = () => {
    if (rolesData) {
      return (
        <PaginationComponent
          limit={limit}
          handleLimitChange={handleLimitChange}
          page={page}
          totalItems={totalItems.totalItems}
          handlePageChange={handlePageChange}
        />
      );
    }
    return null;
  };
  if (!authToken) {
    const openModal = () => {
      setModalVisible(true);
    };
    return <SignInFirstModal visible={modalVisible} open={openModal} />;
  }
  const columns = [
    {
      title: "Role",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Number of Assigned Users",
      dataIndex: "assigned_users",
      key: "assigned_users",
    },
    {
      title: "Action(s)",
      fixed: "right",
      width: 150,
      render: (text, record) => (
        <Space className="action-btns">
          <Link to={`${record.id}/details`}>
            <Image preview={false} src={eyeIcon}></Image>
          </Link>
          <Link to={`${record.id}/update`}>
            <Image
              preview={false}
              src={editIconBlue}
              style={{ fill: "#3A3475" }}
            ></Image>
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
  return (
    <div className="main-container">
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        style={{ marginTop: "10px", marginLeft: "1px" }}
      >
        <Col span={2}></Col>
        <Col className="roles-txt" span={23}>
          <p>Roles</p>
          <Link to="/rolesandpermissions/createrole">
            <CustomButton
              type="primary"
              style={{ width: "100%", height: "40px", marginLeft: "40px" }}
            >
              Create Role
            </CustomButton>
          </Link>
        </Col>
      </Row>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        style={{ marginTop: "10px", marginLeft: "1px" }}
      >
        <Col className="gutter-row" style={{ width: "99%" }}>
          {rolesData && (
            <CustomTable dataSource={rolesData} columns={columns} />
          )}
          {renderPagination()}
        </Col>
      </Row>
      {roleIdToDelete && (
        <ReAssignModal
          open={ConfirmationModalVisible}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          roleId={roleIdToDelete}
        />
      )}
    </div>
  );
};

export default Roles;
