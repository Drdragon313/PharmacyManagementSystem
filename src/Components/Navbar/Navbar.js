import Logo from "../Images/Logo.png";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import SideMenuBar from "./SideMenuBar";

import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Sider width={200} collapsed={collapsed}>
      <div className="NavbarSiderContainer">
        <div onClick={toggleCollapse} className="NavbarTop">
          <img src={Logo} alt={"Data Connext Logo"} />
        </div>
        {window.innerWidth > 480 ? (
          <div onClick={toggleCollapse} className="NavbarTop">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        ) : null}

        <SideMenuBar collapsed={collapsed} />
      </div>
    </Sider>
  );
};

export default Navbar;
