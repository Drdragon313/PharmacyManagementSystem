import React from "react";
import { Layout } from "antd";
import ProfileNavbar from "./ProfileNavbar/ProfileNavbar";
import { Routes, Route } from "react-router-dom";
import "./Profile.css";
import BasicInformation from "./BasicInformation/BasicInformation";
import Permissions from "./Permissions/Permissions";
import UpdatePassword from "./UpdatePassword/UpdatePassword";
const { Content } = Layout;

const Profile = () => {
  return (
    <Layout className="ProfileMainLayout">
      <ProfileNavbar />
      <Content className="ProfileNestedContent">
        <Routes>
          <Route path="/" element={<BasicInformation />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="updatePassword" element={<UpdatePassword />} />
        </Routes>
      </Content>
    </Layout>
  );
};

export default Profile;
