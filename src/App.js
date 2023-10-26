import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./Components/Navbar/Navbar";
import Topnav from "./Components/TopNav/Topnav";
import SchemaDetail from "./Components/AvailableSchema/SchemaDetail";
import CustomSchema from "./Pages/CustomSchema/CustomSchema";
import Iframe from "./Iframes/Iframe";
import Schema from "./Pages/Schema_Definition/Schema";
import File from "./Pages/File Import/File";
import ValidationOptions from "./Pages/ValidationOptions/ValidationOptions";
import UploadSuccess from "./Pages/UploadSuccess/UploadSuccess";
import AutoPopulate from "./Pages/AutoPopulate/AutoPopulate";
import Signin from "./Pages/Signin/Signin";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import CheckEmail from "./Pages/CheckEmail/CheckEmail";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import DataTiles from "./Pages/DataTiles/DataTiles";
import TilePage from "./Pages/TilePage/TilePage";
import Profile from "./Pages/Profile/Profile";
import Permissions from "./Pages/Profile/Permissions/Permissions";
import "./App.css";
import UpdatePassword from "./Pages/Profile/UpdatePassword/UpdatePassword";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <MainContent />
      </Layout>
    </BrowserRouter>
  );
}

function MainContent() {
  const location = useLocation();

  return (
    <>
      {shouldRenderNavbar(location) && <Navbar />}
      <Content className="MainContent">
        {shouldRenderTopnav(location) && <Topnav />}
        <Routes>
          <Route path="signin" element={<Signin />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="checkemail" element={<CheckEmail />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="/" element={<Iframe />} />
          <Route path="datatiles" element={<DataTiles />} />
          <Route path="/datatiles/:tilepath" element={<TilePage />} />
          <Route path="schema" element={<Schema />} />
          <Route path="file" element={<ValidationOptions />} />
          <Route path="file/fileUpload" element={<File />} />
          <Route
            path="file/fileUpload/UploadSuccess"
            element={<UploadSuccess />}
          />
          <Route path="/schema/:schemaId" element={<SchemaDetail />} />
          <Route path="schema/autopopulate" element={<AutoPopulate />} />
          <Route path="/customschema" element={<CustomSchema />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="permissions" element={<Permissions />} />
            <Route path="updatePassword" element={<UpdatePassword />} />
          </Route>

          <Route path="schema/autopopulate" element={<AutoPopulate />} />
        </Routes>
      </Content>
    </>
  );
}

function shouldRenderNavbar(location) {
  const currentPath = location.pathname;
  return (
    currentPath !== "/signin" &&
    currentPath !== "/forgotpassword" &&
    currentPath !== "/checkemail" &&
    currentPath !== "/resetpassword" &&
    currentPath !== "/profile" &&
    currentPath !== "/profile/permissions" &&
    currentPath !== "/profile/updatePassword"
  );
}

function shouldRenderTopnav(location) {
  const currentPath = location.pathname;
  return (
    currentPath !== "/signin" &&
    currentPath !== "/forgotpassword" &&
    currentPath !== "/checkemail" &&
    currentPath !== "/resetpassword" &&
    currentPath !== "/profile" &&
    currentPath !== "/profile/permissions" &&
    currentPath !== "/profile/updatePassword"
  );
}

export default App;
