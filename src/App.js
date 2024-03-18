import React, { useState, useEffect } from "react";
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
import Income from "./Iframes/Income";
import Dashboard from "./Iframes/Dashboard";
import { fetchUserPermissions } from "./Utility Function/ModulesAndPermissions";
import AccessDenied from "./Pages/AccessDenied/AccessDenied";
import Spinner from "./Components/Spinner/Spinner";

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
  const [userPermissions, setUserPermissions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPermissionData = async () => {
      try {
        await fetchUserPermissions(setUserPermissions);
      } catch (error) {
        console.error("Error fetching user permissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPermissionData();
  }, []);
  const accessDataLive =
    userPermissions?.find((module) => module.module_name === "Data live")
      ?.actions?.read || false;
  // const accessDashboard =
  //   userPermissions?.find((module) => module.module_name === "Dashboard")
  //     ?.actions?.read || false;
  const accessPharmacy =
    userPermissions?.find((module) => module.module_name === "Pharmacy")
      ?.actions?.read || false;
  // const accessUploadFile =
  //   userPermissions?.find((module) => module.module_name === "Upload Files")
  //     ?.actions?.read || false;
  const accessEmployee =
    userPermissions?.find((module) => module.module_name === "Employees")
      ?.actions?.read || false;
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
  if (loading) {
    return <Spinner />;
  }

  // Render nothing on excluded paths
  if (excludedPaths.includes(location.pathname)) {
    return (
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
      </Routes>
    );
  }
  if (!authToken && !excludedPaths.includes(location.pathname)) {
    return <Navigate to="/" />;
  } else
    return (
      <>
        <Content className="MainContent">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <MainLayout>
                  <Dashboard />
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
            <Route path="accessdenied" element={<AccessDenied />} />

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
              path="/pharmacyreport"
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
              path="/costofstock"
              element={
                <MainLayout>
                  <CostofStock />
                </MainLayout>
              }
            ></Route>
            <Route
              path="/prescriptions"
              element={
                <MainLayout>
                  <Prescriptions />
                </MainLayout>
              }
            ></Route>
            <Route
              path="/tillSales"
              element={
                <MainLayout>
                  <TillSales />
                </MainLayout>
              }
            ></Route>
            <Route
              path="/services"
              element={
                <MainLayout>
                  <Services />
                </MainLayout>
              }
            ></Route>
            <Route
              path="/income"
              element={
                <MainLayout>
                  <Income />
                </MainLayout>
              }
            ></Route>
            <Route
              path="/owing"
              element={
                <MainLayout>
                  <Owing />
                </MainLayout>
              }
            ></Route>
            <Route
              path="/employeereport"
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
              element={
                <MainLayout>
                  <UpdatePassword />
                </MainLayout>
              }
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

export default App;
