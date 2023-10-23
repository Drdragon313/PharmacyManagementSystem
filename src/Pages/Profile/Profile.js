import React from "react";
import { Layout } from "antd";
import ProfileNavbar from "./ProfileNavbar/ProfileNavbar";
import { Routes, Route } from "react-router-dom";
import "./Profile.css";
import BasicInformation from "./BasicInformation/BasicInformation";
import Permissions from "./Permissions/Permissions";
const { Content } = Layout;

const Profile = () => {
  return (
    // <Layout>
    //   <Content className="ProfileMainContent">
    <Layout className="ProfileMainLayout">
      <ProfileNavbar />
      <Content className="ProfileNestedContent">
        <Routes>
          <Route path="/" element={<BasicInformation />} />
          <Route path="permissions" element={<Permissions />} />
        </Routes>
      </Content>
    </Layout>
    //   </Content>
    // </Layout>
  );
};

export default Profile;
