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

const SideMenuBar = (props) => {
  const [selectedKeys, setSelectedKeys] = useState(["4"]);
  const [menuItems, setMenuItems] = useState([]);

  const handleMenuItemClick = (key) => {
    setSelectedKeys([key]);
  };
  const SubMenuTitle = ({ title, icon }) => (
    <div className="reports-submenu">
      <img className="icons-sidenav-reports" src={icon} alt="Icon" />
      {title}
    </div>
  );

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
                if (permissions && permissions.actions.read) {
                  return {
                    ...module,
                    actions: permissions.actions,
                  };
                }

                return null;
              })
              .filter(Boolean);
            setMenuItems(modulesWithPermissions);
          });
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
        {menuItems
          .filter((menuItem) => menuItem.module_id !== 7)
          .map((menuItem) => (
            <React.Fragment key={menuItem.module_id}>
              {menuItem.module_id === 2 && menuItem.sub_modules ? (
                <Menu.SubMenu
                  key={`sub${menuItem.module_id}`}
                  title={
                    <SubMenuTitle
                      title={menuItem.module_name}
                      icon={getIconByModuleId(menuItem.module_id)}
                    />
                  }
                >
                  {menuItem.sub_modules.map((subModule) => (
                    <Menu.Item
                      key={`sub${subModule.sub_module_id}`}
                      className="reports-submenu-item"
                      onClick={() => {
                        handleMenuItemClick(`sub${subModule.sub_module_id}`);
                        localStorage.setItem(
                          "ReportID",
                          subModule.sub_module_id
                        );
                      }}
                    >
                      <Link
                        className="side-bar-links"
                        to={getReportsRouteByModuleId(subModule.sub_module_id)}
                      >
                        {subModule.sub_module_name}
                      </Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
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
                      src={
                        menuItem.module_id === 7
                          ? ""
                          : getIconByModuleId(menuItem.module_id)
                      }
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
              )}
            </React.Fragment>
          ))}
      </Menu>
      {props.collapsed ? null : <div className="NavbarFooter"></div>}
    </div>
  );
};

const getRouteByModuleId = (moduleId) => {
  const routeMappings = {
    1: "/home",
    2: "pharmacy",
    3: "/tilepage",
    4: "/pharmacies",
    5: "/file",
    6: "/employeepage",
  };

  return routeMappings[moduleId] || "/";
};
const getReportsRouteByModuleId = (sub_module_id) => {
  const routeMappings = {
    1: "/PharmacyReport",
    2: "/EmployeeReport",
    3: "/Owing",
    4: "/CostofStock",
    5: "/Services",
    6: "/Prescriptions",
    7: "/TillSales",
  };

  return routeMappings[sub_module_id] || "/";
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
