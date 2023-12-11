import React, { useState } from "react";
import { Image, Menu } from "antd";
import { FileTextOutlined, LogoutOutlined } from "@ant-design/icons";
import "./Style.css";
import { Link } from "react-router-dom";
import dataLive from "../../Assets/datalive.svg";
import HeartGrey from "../../Assets/heart grey.svg";
import empIcon from "../../Assets/emp_icon.svg";
import pharmIcon from "../../Assets/streamline_pharmacy.svg";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";
import axios from "axios";
const { SubMenu } = Menu;
const SideMenuBar = (props) => {
  const [selectedKeys, setSelectedKeys] = useState(["2"]);

  const handleMenuItemClick = (key) => {
    setSelectedKeys([key]);
  };

  const handleSignout = async () => {
    try {
      const authToken = localStorage.getItem("AuthorizationToken");

      if (!authToken) {
        console.error("Auth token not found");
        return;
      }
      const response = await axios.post(
        `${baseURL}/signout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      localStorage.removeItem("AuthorizationToken");
      console.log(response.data);
    } catch (error) {
      console.error("Error during signout:", error);
    }
  };
  return (
    <div className="navbar-menu">
      <Menu
        mode={props.collapsed ? "vertical" : "inline"}
        selectedKeys={selectedKeys}
        defaultOpenKeys={["sub1"]}
        className="NavbarMenu"
      >
        <Menu.Item key="1" onClick={() => handleMenuItemClick("1")}>
          <div className="menu-items-sidebar">
            <Image className="icons-sidenav" src={HeartGrey}></Image>
            <Link to="/home">Dashboard</Link>
          </div>
        </Menu.Item>
        <SubMenu
          style={{ color: "white" }}
          key="sub1"
          icon={<FileTextOutlined />}
          title="Reports"
        >
          <Menu.Item key="sub2" onClick={() => handleMenuItemClick("sub2")}>
            <div className="menu-items-sidebar">
              <Image className="icons-sidenav" src={empIcon}></Image>
              <Link to="/employee">Employees</Link>
            </div>
          </Menu.Item>
          <Menu.Item key="sub3" onClick={() => handleMenuItemClick("sub3")}>
            <div className="menu-items-sidebar">
              <Image className="icons-sidenav" src={pharmIcon}></Image>
              <Link to="/pharmacy">Pharmacy</Link>
            </div>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="2" onClick={() => handleMenuItemClick("2")}>
          <div className="menu-items-sidebar">
            <Image className="icons-sidenav" src={dataLive}></Image>
            <Link to="/tilepage">Data Live</Link>
          </div>
        </Menu.Item>
        <Menu.Item key="3" onClick={() => handleMenuItemClick("3")}>
          {" "}
          <div className="menu-items-sidebar">
            <Link to="/file">Import File</Link>
          </div>
        </Menu.Item>
        <Menu.Item key="4" onClick={() => handleMenuItemClick("4")}>
          <div className="menu-items-sidebar">
            <Image className="icons-sidenav" src={empIcon}></Image>
            <Link to="/users">Employees</Link>
          </div>
        </Menu.Item>
        <Menu.Item key="5" onClick={() => handleMenuItemClick("5")}>
          <div className="menu-items-sidebar">
            <Image className="icons-sidenav" src={pharmIcon}></Image>
            <Link to="/pharmacies">Pharmacy</Link>
          </div>
        </Menu.Item>

        <Menu.Item
          key="7"
          icon={<LogoutOutlined />}
          onClick={() => {
            handleMenuItemClick("7");
            handleSignout(); // Call the handleSignout function on menu item click
          }}
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
