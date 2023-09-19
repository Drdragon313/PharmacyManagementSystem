import React from "react";

import { SearchOutlined,UserOutlined } from "@ant-design/icons";
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
        <Space>
            <NotificationOutlined />
            <span></span>
            <div style={{display:"flex",flexDirection:"column"}}>
            <span style={{height:"20px",color:"#009CDF"}}>John Doe</span> {/* Replace with the actual username */}
           
            <span style={{height:"20px",marginBottom:"50px"}}>Job Title</span> {/* Replace with the actual job title */}
            </div>
            <span></span>
            <UserOutlined style={{ fontSize: "20px" }} /> {/* Profile picture icon */}
          </Space>
        

        </div>
      </Header>
    </Layout>
  );
};

export default Topnav;
