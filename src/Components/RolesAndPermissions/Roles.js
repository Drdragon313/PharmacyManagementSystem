import React, { useState, useEffect } from "react";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { Col, Image, Row, Space } from "antd";

import eyeIcon from "../../Assets/Icon feather-eye.svg";
import CustomButton from "../CustomButton/CustomButton";
import deleteActionbtn from "../../Assets/deleteAction.svg";
import "./CreateRole.css";
import editIconBlue from "../../Assets/editInBlue.svg";
import { Link } from "react-router-dom";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";
import { fetchUserPermissions } from "../../Utility Function/ModulesAndPermissions";
import axios from "axios";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import ReAssignModal from "../ReAssignModal/ReAssignModal";
import AccessDenied from "../../Pages/AccessDenied/AccessDenied";
import Spinner from "../Spinner/Spinner";

const Roles = () => {
  const [rolesData, setRolesData] = useState(null);
  const [totalItems, setTotalItems] = useState();
  const [userPermissions, setUserPermissions] = useState(null);
  const [ConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [roleIdToDelete, setRoleIdToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const authToken = localStorage.getItem("AuthorizationToken");

  const fetchRolesData = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/list-available-roles?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
  const canCreateRoles =
    userPermissions?.find((module) => module.module_name === "Roles")?.actions
      ?.write || false;
  const canViewRoles =
    userPermissions?.find((module) => module.module_name === "Roles")?.actions
      ?.read || false;
  const canDeleteRoles =
    userPermissions?.find((module) => module.module_name === "Roles")?.actions
      ?.delete || false;
  const canEditRoles =
    userPermissions?.find((module) => module.module_name === "Roles")?.actions
      ?.update || false;

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

      width: 150,
      render: (text, record) => (
        <Space className="action-btns">
          <Link to={`${record.id}/details`}>
            <Image preview={false} src={eyeIcon}></Image>
          </Link>
          {canEditRoles && (
            <Link to={`${record.id}/update`}>
              <Image
                preview={false}
                src={editIconBlue}
                style={{ fill: "#3A3475" }}
              ></Image>
            </Link>
          )}
          {canDeleteRoles && (
            <Image
              preview={false}
              src={deleteActionbtn}
              onClick={() => handleDelete(record.id)}
            ></Image>
          )}
        </Space>
      ),
    },
  ];
  if (loading === true) {
    return <Spinner />;
  }
  return (
    <>
      {canViewRoles ? (
        <div className="main-container">
          <div className="roles-txt">
            <p className="role-title">Roles</p>
            {canCreateRoles && (
              <Link to="/rolesandpermissions/createrole">
                <CustomButton type="primary">Create Role</CustomButton>
              </Link>
            )}
          </div>

          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
            style={{ marginTop: "10px", marginLeft: "1px" }}
          >
            <div className="roles-list-table">
              {rolesData && (
                <CustomTable dataSource={rolesData} columns={columns} />
              )}
            </div>
            <Col> {renderPagination()}</Col>
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
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default Roles;
