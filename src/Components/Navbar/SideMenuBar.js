import React, { useState, useEffect } from "react";
import { Image, Menu } from "antd";
import { FileTextOutlined, LogoutOutlined } from "@ant-design/icons";
import "./Style.css";
import { Link } from "react-router-dom";
import dataLive from "../../Assets/datalive.svg";
import HeartGrey from "../../Assets/heart grey.svg";
import empIcon from "../../Assets/emp_icon.svg";
import pharmIcon from "../../Assets/streamline_pharmacy.svg";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";
import {
  fetchUserPermissions,
  fetchModules,
} from "../../Utility Function/ModulesAndPermissions";
import axios from "axios";
const { SubMenu } = Menu;
const SideMenuBar = (props) => {
  const [selectedKeys, setSelectedKeys] = useState(["5"]);

  const [menuItems, setMenuItems] = useState([]);

  const handleMenuItemClick = (key) => {
    setSelectedKeys([key]);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user permissions
        await fetchUserPermissions((userPermissions) => {
          // Fetch modules based on user permissions
          fetchModules((modules) => {
            const modulesWithPermissions = modules
              .filter((module) =>
                userPermissions.some(
                  (permission) => permission.module_id === module.module_id
                )
              )
              .map((module) => {
                const permissions = userPermissions.find(
                  (permission) => permission.module_id === module.module_id
                );

                return {
                  ...module,
                  actions: permissions ? permissions.actions : {},
                };
              });

            setMenuItems(modulesWithPermissions);
          });
        });
      } catch (error) {
        // Handle error, show a message, etc.
      }
    };

    fetchData();
  }, []);
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
        {menuItems.map((menuItem) => (
          <Menu.Item
            key={menuItem.module_id}
            onClick={() => handleMenuItemClick(`${menuItem.module_id}`)}
          >
            <div className="menu-items-sidebar">
              <Image
                className="icons-sidenav"
                src={getIconByModuleId(menuItem.module_id)}
                alt="Icon"
              />
              <Link to={getRouteByModuleId(menuItem.module_id)}>
                {menuItem.module_name}
              </Link>
            </div>
          </Menu.Item>
        ))}

        <Menu.Item
          key="signout"
          onClick={() => {
            handleMenuItemClick("signout");
            handleSignout();
          }}
        >
          <div className="menu-items-sidebar">
            <LogoutOutlined />
            <Link to="/">Signout</Link>
          </div>
        </Menu.Item>
      </Menu>
      {props.collapsed ? null : <div className="NavbarFooter"></div>}
    </div>
  );
};

// Define a function to get the route based on module ID
const getRouteByModuleId = (moduleId) => {
  const routeMappings = {
    1: "users/AddUser",
    2: "/employeepage",
    3: "/pharmacies",
    4: "/tilepage",
    5: "/file",
    6: "/pharmacy",
  };

  return routeMappings[moduleId] || "/";
};
const getIconByModuleId = (moduleId) => {
  // Define your icon mappings here
  const iconMappings = {
    1: `${empIcon}`,
    2: `${empIcon}`,
    3: `${pharmIcon}`,
    4: `${dataLive}`,
    5: `${HeartGrey}`,
    6: `${pharmIcon}`,
    // Add more mappings as needed
  };

  return iconMappings[moduleId] || "default-icon-path";
};

export default SideMenuBar;
