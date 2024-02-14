import React from "react";
import { Layout } from "antd";
import Navbar from "../Components/Navbar/Navbar";
import Topnav from "../Components/TopNav/Topnav";

const { Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout>
      <Sider className="navbar-sider" width={200}>
        <div className="NavbarSiderContainer">
          <div className="NavbarTop"></div>
          <Navbar />
        </div>
      </Sider>
      <Layout>
        <Topnav />
        <Content className="MainContent">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
