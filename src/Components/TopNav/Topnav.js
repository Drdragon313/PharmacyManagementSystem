import React, { useEffect, useState } from "react";
import "./Topnav.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, message } from "antd";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";

const { Header } = Layout;

const Topnav = () => {
  const [userData, setUserData] = useState({
    FName: "",
    LName: "",
    Role: "",
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
          Role: apiUserData.role[0],
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
        <div></div>
        <div>
          <div size={10} className="nav-itmes-contianer">
            <Link to="/profile">
              <Avatar size="large" icon={<UserOutlined />} />
            </Link>
            <span></span>
            <div className="TopnavUser">
              <span className="TopnavUserName">
                {userData.FName} {userData.LName}
              </span>

              <span className="TopnavJobTitle">{userData.Role}</span>
            </div>
            <span></span>
          </div>
        </div>
      </Header>
    </Layout>
  );
};

export default Topnav;
