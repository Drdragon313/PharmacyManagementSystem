import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  UploadOutlined,
  AppstoreOutlined,
  UsergroupAddOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./Style.css";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const SideMenuBar = (props) => {
  const [selectedKeys, setSelectedKeys] = useState(["2"]);

  const handleMenuItemClick = (key) => {
    setSelectedKeys([key]);
  };

  return (
    <div className="navbar-menu">
      <Menu
        mode={props.collapsed ? "vertical" : "inline"}
        selectedKeys={selectedKeys}
        defaultOpenKeys={["sub1"]}
        className="NavbarMenu"
      >
        <Menu.Item
          key="1"
          icon={<HomeOutlined />}
          onClick={() => handleMenuItemClick("1")}
        >
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<AppstoreOutlined />}
          onClick={() => handleMenuItemClick("2")}
        >
          <Link to="/tilepage">Data Tiles</Link>
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<UploadOutlined />}
          onClick={() => handleMenuItemClick("3")}
        >
          <Link to="/file">Import File</Link>
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<UsergroupAddOutlined />}
          onClick={() => handleMenuItemClick("4")}
        >
          <Link to="/users">Employees</Link>
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<AppstoreAddOutlined />}
          onClick={() => handleMenuItemClick("5")}
        >
          <Link to="/pharmacies">Pharmacies</Link>
        </Menu.Item>
        <SubMenu
          style={{ color: "white" }}
          key="sub1"
          icon={<FileTextOutlined />}
          title="Reports"
        >
          <Menu.Item key="sub2" onClick={() => handleMenuItemClick("sub2")}>
            <Link to="/employee">Employee</Link>
          </Menu.Item>
          <Menu.Item key="sub3" onClick={() => handleMenuItemClick("sub3")}>
            <Link to="/pharmacy">Pharmacy</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="7"
          icon={<LogoutOutlined />}
          onClick={() => handleMenuItemClick("7")}
        >
          <Link to="/">Signout</Link>
        </Menu.Item>
      </Menu>
      {props.collapsed ? null : (
        <div className="NavbarFooter">
          {/* <p>copyRights @2023. All Rights Reserved</p>
          <p>Powered by 31Green</p> */}
        </div>
      )}
    </div>
  );
};

export default SideMenuBar;
