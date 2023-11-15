import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const BreadcrumbNavigation = ({ toggleSidebar, isSidebarCollapsed }) => {
  return (
    <div className="breadcrumb-navigation">
      <div className="breadcrumb-toggle" onClick={toggleSidebar}>
        {isSidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className="breadcrumb-links">
        <Link to="/">Home</Link>
        <Link to="/schema">Schema Definition</Link>
        <Link to="/tilepage">Data Tiles</Link>
        <Link to="/file">Import File</Link>
        <Link to="/users">Users</Link>
      </div>
    </div>
  );
};

export default BreadcrumbNavigation;
