import React from "react";
import "./Topnav.css";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { Layout } from "antd";
import { NotificationOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Topnav = () => {
  return (
    <Layout>
      <Header className="TopnavHeader">
        <div>
          <Space wrap>
            <Button icon={<SearchOutlined />}>Search</Button>
          </Space>
        </div>
        <div>
          <Space>
            <NotificationOutlined />
            <span></span>
            <div className="TopnavUser">
              <span className="TopnavUserName">John Doe</span>

              <span className="TopnavJobTitle">Job Title</span>
            </div>
            <span></span>
            <UserOutlined className="TopnavProfileLogo" />
          </Space>
        </div>
      </Header>
    </Layout>
  );
};

export default Topnav;
