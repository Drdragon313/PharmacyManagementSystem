import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  UploadOutlined,
  AppstoreOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import "./Style.css";
import { Link } from "react-router-dom";
const SideMenuBar = (props) => {
  const [selectedKeys, setSelectedKeys] = useState(["1"]);

  const handleMenuItemClick = (key) => {
    setSelectedKeys([key]);
  };

  return (
    <div className="navbar-menu">
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={["sub1"]}
        className="NavbarMenu"
      >
        <Menu.Item
          key="1"
          icon={<HomeOutlined />}
          onClick={() => handleMenuItemClick("1")}
        >
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<FileTextOutlined />}
          onClick={() => handleMenuItemClick("2")}
        >
          <Link to="/schema">Schema Definition</Link>
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<AppstoreOutlined />}
          onClick={() => handleMenuItemClick("3")}
        >
          <Link to="/tilepage">Data Tiles</Link>
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<UploadOutlined />}
          onClick={() => handleMenuItemClick("4")}
        >
          <Link to="/file">Import File</Link>
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<UsergroupAddOutlined />}
          onClick={() => handleMenuItemClick("5")}
        >
          <Link to="/users">Users</Link>
        </Menu.Item>
      </Menu>
      {props.collapsed ? null : (
        <div className="NavbarFooter">
          <p>copyRights @2023. All Rights Reserved</p>
          <p>Powered by 31Green</p>
        </div>
      )}
    </div>
  );
};

export default SideMenuBar;
