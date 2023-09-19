import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/Logo.png";
import { Layout, Menu, theme, Image, Space } from "antd";
import { HomeFilled ,ApartmentOutlined ,FileFilled  } from "@ant-design/icons";
import "./Style.css"
const { Sider } = Layout;

const Navbar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Sider
        width={200}
        theme="dark"
        style={{
          background: colorBgContainer,
          height:"50vmin"
        }}
      >
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{
            height: "200%",
            borderRight: 0,
     
          }}
        >
          <Image className="logo" src={Logo} preview={false}></Image>

          <Menu.Item key="1">
         <Space size={10}> <HomeFilled />
            <Link to="/">Home</Link>
          </Space>
          </Menu.Item>
          <Menu.Item key="2">
          <Space size={10}> <ApartmentOutlined />
            <Link to="/schema">Schema Definition</Link>
          </Space>
          </Menu.Item>
          <Menu.Item key="3">
          <Space size={10}> <FileFilled />
            <Link to="/file">Upload File</Link>
            </Space>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default Navbar;
