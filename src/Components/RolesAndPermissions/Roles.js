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
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import axios from "axios";

const Roles = () => {
  const authToken = localStorage.getItem("AuthorizationToken");
  const [modalVisible, setModalVisible] = useState(!authToken);
  const [rolesData, setRolesData] = useState(null);
  const [ConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [roleIdToDelete, setRoleIdToDelete] = useState(null);
  useEffect(() => {
    const fetchRolesData = async () => {
      try {
        const response = await axios.get(`${baseURL}/list-available-roles`);
        const data = response.data;

        if (data && data.Data && data.Data.roles) {
          setRolesData(data.Data.roles);
        } else {
          console.error("Invalid response format:", data);
        }
      } catch (error) {
        console.error("Error fetching roles data:", error);
      }
    };

    fetchRolesData();
  }, []);
  const handleDelete = (roleId) => {
    setRoleIdToDelete(roleId);
    setConfirmationModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${baseURL}/delete-role?role_id=${roleIdToDelete}`);
      const updatedRolesData = rolesData.filter(
        (role) => role.id !== roleIdToDelete
      );
      setRolesData(updatedRolesData);
      setConfirmationModalVisible(false);
      setRoleIdToDelete(null);
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleCancelDelete = () => {
    setConfirmationModalVisible(false);
    setRoleIdToDelete(null);
  };
  if (!authToken) {
    const openModal = () => {
      setModalVisible(true);
    };
    return <SignInFirstModal visible={modalVisible} open={openModal} />;
  }
  const columns = [
    {
      title: "Role ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Action(s)",
      width: 150,
      fixed: "right",
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
        <Col className="roles-txt" span={18}>
          <p>Roles</p>
          <Link to="/rolesandpermissions/createrole">
            <CustomButton
              type="primary"
              style={{ width: "100%", height: "40px" }}
            >
              Create Role
            </CustomButton>
          </Link>
        </Col>
        <Col span={6}></Col>
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
        <Col className="gutter-row" span={18}>
          {rolesData && (
            <CustomTable dataSource={rolesData} columns={columns} />
          )}
        </Col>
        <Col className="gutter-row" span={6}></Col>
      </Row>
      {roleIdToDelete && (
        <ConfirmationModal
          open={ConfirmationModalVisible}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Roles;
