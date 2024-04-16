import React from "react";
import { Layout } from "antd";
import Navbar from "../Components/Navbar/Navbar";
import Topnav from "../Components/TopNav/Topnav";

const { Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout>
      <Topnav />
      <Sider className="navbar-sider" width={200}>
        <Navbar />
      </Sider>

      <Content style={{ paddingTop: "65px" }} className="MainContent">
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
