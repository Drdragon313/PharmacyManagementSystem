import React from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { Layout } from "antd";
import { NotificationOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Topnav = () => {
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          <Space wrap>
            <Button icon={<SearchOutlined />}>Search</Button>
          </Space>
        </div>
        <div>
        <NotificationOutlined />

        </div>
      </Header>
    </Layout>
  );
};

export default Topnav;
