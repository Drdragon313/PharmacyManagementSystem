import Logo from "../Images/gLogo.svg";
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
      if (window.innerWidth <= 768) {
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
    <Sider className="navbar-sider" width={200} collapsed={collapsed}>
      <div className="NavbarSiderContainer">
        <div onClick={toggleCollapse} className="NavbarTop">
          <img src={Logo} alt={"Logo"} />

          {window.innerWidth > 768 ? (
            <div onClick={toggleCollapse} className="NavbarTop">
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          ) : null}
        </div>
        <SideMenuBar collapsed={collapsed} />
      </div>
    </Sider>
  );
};
export default Navbar;
