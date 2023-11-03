import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "./ProfileNavbar.css";
const { Sider } = Layout;
const ProfileNavbar = () => {
  const [selectedKeys, setSelectedKeys] = useState(["1"]);
  const handleMenuItemClick = (key) => {
    setSelectedKeys([key]);
  };
  return (
    <Sider className="ProfileNavbarSider" width={200}>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={["sub1"]}
        className="ProfileNavbarMenu"
      >
        <Menu.Item
          style={{ textDecoration: "none" }}
          key="1"
          className="custom-menu-item"
          onClick={() => handleMenuItemClick("1")}
        >
          <Link to="/profile">
            <strong>Basic Information</strong>
          </Link>
        </Menu.Item>
        <Menu.Item
          style={{ textDecoration: "none" }}
          key="2"
          className="custom-menu-item"
          onClick={() => handleMenuItemClick("2")}
        >
          <Link to="permissions">
            <strong>Account Permissions</strong>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="3"
          className="custom-menu-item"
          onClick={() => handleMenuItemClick("3")}
        >
          <Link to="/">
            <strong>Notifications </strong>
          </Link>
        </Menu.Item>
        <Menu.Item
          key="4"
          className="custom-menu-item"
          onClick={() => handleMenuItemClick("4")}
        >
          <Link to="updatePassword">
            <strong>Password & Security</strong>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default ProfileNavbar;
