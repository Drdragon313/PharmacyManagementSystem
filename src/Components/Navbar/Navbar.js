import Logo from "../Images/Logo.png";
import React, { useState } from "react";
import "./Navbar.css";
import SideMenuBar from "./SideMenuBar";

import { Layout, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

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
          height: "76.4vh",
          background: colorBgContainer,
        }}
      >
        <div onClick={toggleCollapse} className="NavbarTop">
          <img src={Logo} alt={"Data Connext Logo"} />
        </div>

        <div onClick={toggleCollapse} className="NavbarTop">
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>

        <SideMenuBar collapsed={collapsed} />
      </div>
    </Sider>
  );
};

export default Navbar;
