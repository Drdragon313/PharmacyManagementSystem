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
        <Menu.Item key="1" onClick={() => handleMenuItemClick("1")}>
          <Link to="/">
            <strong>Basic Information</strong>
          </Link>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => handleMenuItemClick("2")}>
          <Link to="permissions">
            <strong>Account Permissions</strong>
          </Link>
        </Menu.Item>
        <Menu.Item key="3" onClick={() => handleMenuItemClick("3")}>
          <Link to="/">
            <strong>Notifications </strong>
          </Link>
        </Menu.Item>
        <Menu.Item key="4" onClick={() => handleMenuItemClick("4")}>
          <Link to="/">
            <strong>Password & Security</strong>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default ProfileNavbar;
