import React from 'react'
import { Layout, theme } from "antd";
const { Header} = Layout;

const Topnav = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
     <Header
     theme="light"
          style={{
            display: "flex",
            alignItems: "center",
            background:colorBgContainer
          }}
        >
          <div className="demo-logo" />
          
        </Header> 
    </Layout>
  )
}

export default Topnav
