import React from "react";
import { Link } from "react-router-dom";

import { Layout, Menu, theme } from "antd";

const { Sider } = Layout;

const Navbar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Sider
        width={200}
        style={{
          background: colorBgContainer,
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
        >
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/schema">Schema Definition</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/services">Services</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default Navbar;
