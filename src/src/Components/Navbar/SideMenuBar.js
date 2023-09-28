import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  UploadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const SideMenuBar = (props) => {
  return (
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
      {props.collapsed ? null : (
        <div>
          <div className="NavbarCopy">
            <p>copyRights @2023. All Rights Reserved</p>
          </div>
          <div className="NavbarFooter">
            <p>Powered by 31Green</p>
          </div>
        </div>
      )}
    </Menu>
  );
};

export default SideMenuBar;
