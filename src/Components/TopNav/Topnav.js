
import React from 'react'
import { Layout } from "antd";
const { Header} = Layout;

const Topnav = () => {
  return (
    <Layout>
     <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          
        </Header> 
    </Layout>
  )
}

export default Topnav
