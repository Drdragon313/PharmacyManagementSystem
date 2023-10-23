import React from "react";
import "./Topnav.css";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { Layout } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Topnav = () => {
  return (
    <Layout>
      <Header className="TopnavHeader">
        <div>
          <Space wrap className="TopnavSearch">
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

            <Link to="/profile">
              <UserOutlined className="TopnavProfileLogo" />
            </Link>
          </Space>
        </div>
      </Header>
    </Layout>
  );
};

export default Topnav;
