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
import TilePage from "./Pages/TilePage/TilePage";
import Profile from "./Pages/Profile/Profile";
import Permissions from "./Pages/Profile/Permissions/Permissions";
import "./App.css";
import UpdatePassword from "./Pages/Profile/UpdatePassword/UpdatePassword";
import Users from "./Pages/Users/Users";
import AddUsers from "./Pages/AddUsers/AddUsers";
import ViewEmployees from "./Pages/ViewEmployees/ViewEmployees";
import ResendEmail from "./Pages/ResendEmail/ResendEmail";
import Pharmacies from "./Pages/Pharmacies/Pharmacies";
import Reports from "./Pages/Reports/Reports";
import SetPassword from "./Pages/SetPassword/SetPassword";

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
          <Route path="/" element={<Signin />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="checkemail" element={<CheckEmail />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="setpassword" element={<SetPassword />} />
          <Route path="home" element={<Iframe />} />
          <Route path="/tilepage" element={<TilePage />} />
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
          <Route path="users" element={<Users />} />
          <Route path="users/AddUser" element={<AddUsers />} />
          <Route path="users/ViewEmployees" element={<ViewEmployees />} />
          <Route path="resendemail" element={<ResendEmail />} />
          <Route path="pharmacies" element={<Pharmacies />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </Content>
    </>
  );
}

function shouldRenderNavbar(location) {
  const currentPath = location.pathname;
  return (
    currentPath !== "/" &&
    currentPath !== "/forgotpassword" &&
    currentPath !== "/checkemail" &&
    currentPath !== "/resetpassword" &&
    currentPath !== "/setpassword" &&
    currentPath !== "/profile" &&
    currentPath !== "/profile/permissions" &&
    currentPath !== "/profile/updatePassword" &&
    currentPath !== "/resendemail"
  );
}

function shouldRenderTopnav(location) {
  const currentPath = location.pathname;
  return (
    currentPath !== "/" &&
    currentPath !== "/forgotpassword" &&
    currentPath !== "/checkemail" &&
    currentPath !== "/resetpassword" &&
    currentPath !== "/setpassword" &&
    currentPath !== "/profile" &&
    currentPath !== "/profile/permissions" &&
    currentPath !== "/profile/updatePassword" &&
    currentPath !== "/resendemail"
  );
}

export default App;
