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

const Roles = () => {
  const authToken = localStorage.getItem("AuthorizationToken");
  const [modalVisible, setModalVisible] = useState(!authToken);
  const [rolesData, setRolesData] = useState(null);
  //   const breadcrumbItems = [{ label: "Roles and Permission", link: "/users" }];
  useEffect(() => {
    // Fetch roles data from the API
    const fetchRolesData = async () => {
      try {
        const response = await fetch(`${baseURL}/list-available-roles`); // Replace with your API endpoint
        const data = await response.json();
        setRolesData(data.Data.roles);
      } catch (error) {
        console.error("Error fetching roles data:", error);
      }
    };

    fetchRolesData();
  }, []);
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
      title: "Description",
      dataIndex: "description",
      key: "description",
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
            // onClick={() => handleDelete(record.id)}
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
    </div>
  );
};

export default Roles;
