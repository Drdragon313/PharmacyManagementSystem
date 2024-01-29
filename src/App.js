import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./Components/Navbar/Navbar";
import Topnav from "./Components/TopNav/Topnav";
import SchemaDetail from "./Components/AvailableSchema/SchemaDetail";
import CustomSchema from "./Pages/CustomSchema/CustomSchema";
import Iframe from "./Iframes/Iframe";
import PharmacyIfame from "./Iframes/PharmacyIfame";
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
import CostofStock from "./Iframes/CostofStock";
import "./App.css";
import UpdatePassword from "./Pages/UpdatePassword/UpdatePassword";
import AddUsers from "./Pages/AddUsers/AddUsers";
import ViewEmployees from "./Pages/ViewEmployees/ViewEmployees";
import ResendEmail from "./Pages/ResendEmail/ResendEmail";
import Pharmacies from "./Pages/Pharmacies/Pharmacies";
import Reports from "./Pages/Reports/Reports";
import SetPassword from "./Pages/SetPassword/SetPassword";
import HomeIframe from "./Iframes/HomeIframe";
import AddPharmacy from "./Pages/AddPharmacy/AddPharmacy";
import PharmacyDetails from "./Pages/PharmacyDetails/PharmacyDetails";
import PasswordUpdatedSuccess from "./Pages/PasswordUpdatedSuccess/PasswordUpdatedSuccess";
import EmployeeDetails from "./Pages/EmployeeDetails/EmployeeDetails";
import Roles from "./Components/RolesAndPermissions/Roles";
import CreateRole from "./Components/RolesAndPermissions/CreateRole";
import EmployeePage from "./Pages/EmployeePage/EmployeePage";
import RoleDetails from "./Components/RolesAndPermissions/RoleDetails";
import EditUsers from "./Pages/EditUsers/EditUsers";
import UpdateRole from "./Components/RolesAndPermissions/UpdateRole";
import EditPharmacy from "./Pages/EditPharmacy/EditPharmacy";
import Owing from "./Iframes/Owing";
import Employee from "./Iframes/Employee";
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
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route
            path="passwordupdatesuccess"
            element={<PasswordUpdatedSuccess />}
          />
          <Route path="/setpassword" element={<SetPassword />} />
          <Route path="home" element={<HomeIframe />} />
          <Route path="/tilepage" element={<TilePage />} />
          <Route path="schema" element={<Schema />} />
          <Route path="file" element={<ValidationOptions />} />
          <Route path="file/fileUpload" element={<File />} />
          <Route
            path="file/fileUpload/UploadSuccess"
            element={<UploadSuccess />}
          />
          <Route path="employee" element={<Iframe />} />
          <Route
            path="pharmacies/:pharmacy_id/pharmacydetails/:employee_id"
            element={<EmployeeDetails />}
          />
          <Route path="PharmacyReport" element={<PharmacyIfame />} />
          <Route path="/schema/:schemaId" element={<SchemaDetail />} />
          <Route path="/file/:schemaId" element={<SchemaDetail />} />
          <Route path="schema/autopopulate" element={<AutoPopulate />} />
          <Route path="/customschema" element={<CustomSchema />} />
          <Route path="/employeepage" element={<EmployeePage />} />
          <Route
            path="/employeepage/:role_id/details"
            element={<RoleDetails />}
          />
          <Route
            path="/employeepage/:role_id/update"
            element={<UpdateRole />}
          />
          <Route path="/rolesandpermissions" element={<Roles />} />
          <Route
            path="/rolesandpermissions/createrole"
            element={<CreateRole />}
          />
          <Route path="/CostofStock" element={<CostofStock />}></Route>
          <Route path="/Owing" element={<Owing />}></Route>
          <Route path="/EmployeeReport" element={<Employee />}></Route>

          <Route path="schema/autopopulate" element={<AutoPopulate />} />
          <Route path="users/AddUser" element={<AddUsers />} />

          <Route
            path="employeepage/:userID/viewUser"
            element={<ViewEmployees />}
          />
          <Route path="resendemail" element={<ResendEmail />} />
          <Route path="pharmacies" element={<Pharmacies />} />
          <Route path="pharmacies/AddPharmacy" element={<AddPharmacy />} />
          <Route
            path="pharmacies/:pharmacy_id/pharmacydetails"
            element={<PharmacyDetails />}
          />
          <Route
            path="pharmacies/:pharmacy_id/pharmacyedit"
            element={<EditPharmacy />}
          />
          <Route path="employeepage/:userID/editUser" element={<EditUsers />} />
          <Route path="/Profile/Settings" element={<EditUsers />}></Route>
          <Route path="/Profile/Security" element={<UpdatePassword />}></Route>
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
    currentPath !== "/resendemail" &&
    currentPath !== "/passwordupdatesuccess"
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
    currentPath !== "/resendemail" &&
    currentPath !== "/passwordupdatesuccess"
  );
}

export default App;
