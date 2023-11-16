import React, { useEffect, useState } from "react";
import "./Topnav.css";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Space, message } from "antd";
import { Layout } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";

const { Header } = Layout;

const Topnav = () => {
  const [userData, setUserData] = useState({
    FName: "",
    LName: "",
    Designation: "",
  });
  useEffect(() => {
    const localHeader = localStorage.getItem("AuthorizationToken");
    const headers = {
      Authorization: localHeader,
    };
    axios
      .get(`${baseURL}/get-profile`, { headers })
      .then((response) => {
        const apiUserData = response.data.data;
        setUserData((prevUserData) => ({
          ...prevUserData,
          Designation: apiUserData.Designation,
          FName: apiUserData.FName,
          LName: apiUserData.LName,
        }));
      })
      .catch(() => {
        message.error("Some Error has Occured in Loading Information!", 2);
      });
  }, []);
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
              <span className="TopnavUserName">
                {userData.FName} {userData.LName}
              </span>

              <span className="TopnavJobTitle">{userData.Designation}</span>
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
