import Logo from "../Images/Logo.png";
import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  FileTextOutlined,
  UploadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Navbar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider width={200} collapsed={collapsed}>
      <div
        style={{
          height: "70.1vh",
          background: colorBgContainer,
        }}
      >
        <div onClick={toggleCollapse} className="NavbarTop">
          <img src={Logo} alt={"Data Connext Logo"} />
        </div>

        {/* Toggle button/icon */}
        <div onClick={toggleCollapse} className="NavbarTop">
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          className="NavbarMenu"
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            <Link to="/schema">Schema Definition</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="/file">Import File</Link>
          </Menu.Item>

          <Menu.Item
            style={{ marginTop: "100%" }}
            key="4"
            icon={<LogoutOutlined />}
          >
            <Link to="/">Signout</Link>
          </Menu.Item>
          {collapsed ? null : (
            <div>
              <div
                className="NavbarCopy"
              >
                <p>copyRights @2023. All Rights Reserved</p>
              </div>
              <div className="NavbarFooter">
                <p>Powered by 31Green</p>
              </div>
            </div>
          )}
        </Menu>
      </div>
    </Sider>
  );
};

export default Navbar;
