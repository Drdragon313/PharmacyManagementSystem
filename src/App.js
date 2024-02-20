import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Layout } from "antd";
import MainLayout from "./Layout/MainLayout";

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
import FaqPage from "./Pages/FaqPage/FaqPage";
import Services from "./Iframes/Services";
import Prescriptions from "./Iframes/Prescriptions";
import TillSales from "./Iframes/TillSales";
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
  const authToken = localStorage.getItem("AuthorizationToken");
  const excludedPaths = [
    "/",
    "/forgotpassword",
    "/resendemail",
    "/resetpassword",
    "/setpassword",
    "/passwordupdatesuccess",
  ];
  if (!authToken && !excludedPaths.includes(location.pathname)) {
    return <Navigate to="/" />;
  } else
    return (
      <>
        {/* {shouldRenderNavbar(location) && <Navbar />} */}
        <Content className="MainContent">
          {/* {shouldRenderTopnav(location) && <Topnav />} */}
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/checkemail" element={<CheckEmail />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route
              path="/passwordupdatesuccess"
              element={<PasswordUpdatedSuccess />}
            />
            <Route path="/setpassword" element={<SetPassword />} />
            <Route
              path="/home"
              element={
                <MainLayout>
                  <HomeIframe />
                </MainLayout>
              }
            />
            <Route
              path="/tilepage"
              element={
                <MainLayout>
                  <TilePage />
                </MainLayout>
              }
            />
            <Route
              path="schema"
              element={
                <MainLayout>
                  <Schema />
                </MainLayout>
              }
            />
            <Route
              path="file"
              element={
                <MainLayout>
                  <ValidationOptions />
                </MainLayout>
              }
            />
            <Route
              path="file/fileUpload"
              element={
                <MainLayout>
                  <File />
                </MainLayout>
              }
            />
            <Route
              path="file/fileUpload/UploadSuccess"
              element={
                <MainLayout>
                  <UploadSuccess />
                </MainLayout>
              }
            />
            <Route
              path="employee"
              element={
                <MainLayout>
                  <Iframe />
                </MainLayout>
              }
            />
            <Route
              path="pharmacies/:pharmacy_id/pharmacydetails/:employee_id"
              element={
                <MainLayout>
                  <EmployeeDetails />
                </MainLayout>
              }
            />
            <Route
              path="PharmacyReport"
              element={
                <MainLayout>
                  <PharmacyIfame />
                </MainLayout>
              }
            />
            <Route
              path="/schema/:schemaId"
              element={
                <MainLayout>
                  <SchemaDetail />
                </MainLayout>
              }
            />
            <Route
              path="/file/:schemaId"
              element={
                <MainLayout>
                  <SchemaDetail />
                </MainLayout>
              }
            />
            <Route
              path="schema/autopopulate"
              element={
                <MainLayout>
                  <AutoPopulate />
                </MainLayout>
              }
            />
            <Route
              path="/customschema"
              element={
                <MainLayout>
                  <CustomSchema />
                </MainLayout>
              }
            />
            <Route
              path="/employeepage"
              element={
                <MainLayout>
                  <EmployeePage />
                </MainLayout>
              }
            />
            <Route
              path="/faqpage"
              element={
                <MainLayout>
                  <FaqPage />
                </MainLayout>
              }
            />
            <Route
              path="/employeepage/:role_id/details"
              element={
                <MainLayout>
                  <RoleDetails />
                </MainLayout>
              }
            />
            <Route
              path="/employeepage/:role_id/update"
              element={
                <MainLayout>
                  <UpdateRole />
                </MainLayout>
              }
            />
            <Route
              path="/rolesandpermissions"
              element={
                <MainLayout>
                  <Roles />
                </MainLayout>
              }
            />
            <Route
              path="/rolesandpermissions/createrole"
              element={
                <MainLayout>
                  <CreateRole />
                </MainLayout>
              }
            />
            <Route
              path="/CostofStock"
              element={
                <MainLayout>
                  <CostofStock />
                </MainLayout>
              }
            ></Route>
            <Route
              path="/Prescriptions"
              element={
                <MainLayout>
                  <Prescriptions />
                </MainLayout>
              }
            ></Route>
            <Route
              path="/TillSales"
              element={
                <MainLayout>
                  <TillSales />
                </MainLayout>
              }
            ></Route>
            <Route
              path="/Services"
              element={
                <MainLayout>
                  <Services />
                </MainLayout>
              }
            ></Route>
            <Route
              path="/Owing"
              element={
                <MainLayout>
                  <Owing />
                </MainLayout>
              }
            ></Route>
            <Route
              path="/EmployeeReport"
              element={
                <MainLayout>
                  <Employee />
                </MainLayout>
              }
            ></Route>

            <Route
              path="schema/autopopulate"
              element={
                <MainLayout>
                  <AutoPopulate />
                </MainLayout>
              }
            />
            <Route
              path="users/AddUser"
              element={
                <MainLayout>
                  <AddUsers />
                </MainLayout>
              }
            />

            <Route
              path="employeepage/:userID/viewUser"
              element={
                <MainLayout>
                  <ViewEmployees />
                </MainLayout>
              }
            />
            <Route path="resendemail" element={<ResendEmail />} />
            <Route
              path="pharmacies"
              element={
                <MainLayout>
                  <Pharmacies />
                </MainLayout>
              }
            />
            <Route
              path="pharmacies/AddPharmacy"
              element={
                <MainLayout>
                  <AddPharmacy />
                </MainLayout>
              }
            />
            <Route
              path="pharmacies/:pharmacy_id/pharmacydetails"
              element={
                <MainLayout>
                  <PharmacyDetails />
                </MainLayout>
              }
            />
            <Route
              path="pharmacies/:pharmacy_id/pharmacyedit"
              element={
                <MainLayout>
                  <EditPharmacy />
                </MainLayout>
              }
            />
            <Route
              path="employeepage/:userID/editUser"
              element={
                <MainLayout>
                  <EditUsers />
                </MainLayout>
              }
            />
            <Route
              path="/Profile/Settings"
              element={
                <MainLayout>
                  <EditUsers />
                </MainLayout>
              }
            ></Route>
            <Route
              path="/Profile/Security"
              element={<UpdatePassword />}
            ></Route>
            <Route
              path="reports"
              element={
                <MainLayout>
                  <Reports />
                </MainLayout>
              }
            />
          </Routes>
        </Content>
      </>
    );
}

// function shouldRenderNavbar(location) {
//   const currentPath = location.pathname;
//   return (
//     currentPath !== "/" &&
//     currentPath !== "/forgotpassword" &&
//     currentPath !== "/checkemail" &&
//     currentPath !== "/resetpassword" &&
//     currentPath !== "/setpassword" &&
//     currentPath !== "/profile" &&
//     currentPath !== "/profile/permissions" &&
//     currentPath !== "/profile/updatePassword" &&
//     currentPath !== "/resendemail" &&
//     currentPath !== "/passwordupdatesuccess"
//   );
// }

// function shouldRenderTopnav(location) {
//   const currentPath = location.pathname;
//   return (
//     currentPath !== "/" &&
//     currentPath !== "/forgotpassword" &&
//     currentPath !== "/checkemail" &&
//     currentPath !== "/resetpassword" &&
//     currentPath !== "/setpassword" &&
//     currentPath !== "/profile" &&
//     currentPath !== "/profile/permissions" &&
//     currentPath !== "/profile/updatePassword" &&
//     currentPath !== "/resendemail" &&
//     currentPath !== "/passwordupdatesuccess"
//   );
// }

export default App;
