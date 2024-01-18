import React, { useState, useEffect } from "react";
import { Menu, Space } from "antd";

import "./Style.css";
import { Link } from "react-router-dom";
import dataLive from "../../Assets/datalive.svg";
import HeartGrey from "../../Assets/heart grey.svg";
import empIcon from "../../Assets/emp_icon.svg";
import pharmIcon from "../../Assets/streamline_pharmacy.svg";
import reportsIcon from "../../Assets/reports_icon.svg";

import {
  fetchUserPermissions,
  fetchModules,
} from "../../Utility Function/ModulesAndPermissions";

// const { SubMenu } = Menu;
const SideMenuBar = (props) => {
  const [selectedKeys, setSelectedKeys] = useState(["4"]);

  const [menuItems, setMenuItems] = useState([]);

  const handleMenuItemClick = (key) => {
    setSelectedKeys([key]);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserPermissions((userPermissions) => {
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
      } catch (error) {}
    };

    fetchData();
  }, []);

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
            <Space
              direction="horizontal"
              size={10}
              className="menu-items-sidebar"
            >
              <img
                className="icons-sidenav"
                src={getIconByModuleId(menuItem.module_id)}
                alt="Icon"
              />
              <Link
                className="side-bar-links"
                to={getRouteByModuleId(menuItem.module_id)}
              >
                {menuItem.module_name}
              </Link>
            </Space>
          </Menu.Item>
        ))}
      </Menu>
      {props.collapsed ? null : <div className="NavbarFooter"></div>}
    </div>
  );
};

const getRouteByModuleId = (moduleId) => {
  const routeMappings = {
    1: "home",
    2: "pharmacy",
    3: "/tilepage",
    4: "/pharmacies",
    5: "/file",
    6: "/employeepage",
  };

  return routeMappings[moduleId] || "/";
};
const getIconByModuleId = (moduleId) => {
  const iconMappings = {
    1: `${HeartGrey}`,
    2: `${reportsIcon}`,
    3: `${dataLive}`,
    4: `${pharmIcon}`,
    5: `${reportsIcon}`,
    6: `${empIcon}`,
  };

  return iconMappings[moduleId] || "default-icon-path";
};

export default SideMenuBar;
