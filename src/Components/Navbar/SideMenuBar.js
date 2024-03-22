import React, { useState, useEffect } from "react";
import { Menu, Space } from "antd";
import "./Style.css";
import { Link, useLocation } from "react-router-dom";
import dataLive from "../../Assets/datalive.svg";
import HeartGrey from "../../Assets/heart grey.svg";
import empIcon from "../../Assets/emp_icon.svg";
import pharmIcon from "../../Assets/streamline_pharmacy.svg";
import reportsIcon from "../../Assets/reports_icon.svg";

import {
  fetchUserPermissions,
  fetchModules,
} from "../../Utility Function/ModulesAndPermissions";
import { useNavigate } from "react-router-dom";

const SideMenuBar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const handleMenuItemClick = (key) => {
    setSelectedKeys([key]);
    props.toggleMobileDrawer();
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
                  if (
                    permissions &&
                    permissions.module_id === 2 &&
                    permissions.sub_modules &&
                    permissions.sub_modules.length > 0
                  ) {
                    const subModulesWithPermissions = permissions.sub_modules
                      .map((subModule) => {
                        if (subModule.actions.read) {
                          return subModule;
                        }
                        return null;
                      })
                      .filter((subModule) => subModule !== null);
                    module.sub_modules = subModulesWithPermissions;
                  }
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

  useEffect(() => {
    const routeMappings = {
      1: "/dashboard",
      2: "/file",
      3: "/tilepage",
      4: "/pharmacies",
      5: "/file",
      6: "/employeepage",
    };

    const matchedKey = Object.keys(routeMappings).find(
      (key) => routeMappings[key] === location.pathname
    );

    if (matchedKey) {
      setSelectedKeys([matchedKey]);
    }
  }, [location.pathname]);

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
                        localStorage.setItem(
                          "ReportID",
                          subModule.sub_module_id
                        );
                        handleMenuItemClick(`sub${subModule.sub_module_id}`);
                        navigate(
                          getReportsRouteByModuleId(subModule.sub_module_id)
                        );
                      }}
                    >
                      {subModule.sub_module_name}
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
    1: "/dashboard",
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
    1: "/pharmacyreport",
    2: "/employeereport",
    3: "/owing",
    4: "/costofstock",
    5: "/services",
    6: "/prescriptions",
    7: "/tillsales",
    8: "/income",
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
