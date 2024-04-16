import React, { useState, useEffect } from "react";
import "./Iframe.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { embedConfig, getReportData } from "../Utility Function/ReportUtils";
import { fetchUserPermissions } from "../Utility Function/ModulesAndPermissions";
import Spinner from "../Components/Spinner/Spinner";
import AccessDenied from "../Pages/AccessDenied/AccessDenied";
const PharmacyIframe = () => {
  const [reportData, setReportData] = useState({
    embedToken: "",
    pharmacyIDs: [],
    reportID: "",
  });
  const [screenSize, setScreenSize] = useState(window.innerWidth);
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
  useEffect(() => {
    getReportData(setReportData);
    const handleScroll = (e) => {
      setScreenSize(e.currentTarget.innerWidth);
      console.log("Page scrolled", e.currentTarget.innerWidth);
    };
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, []);
  const table = "public pharmacies";
  const column = "id";
  const operator = "eq";
  const subModulePermissionsRead =
    userPermissions
      ?.find((module) => module.module_name === "Reports")
      .sub_modules.find((subModule) => subModule.sub_module_name === "Pharmacy")
      ?.actions?.read || false;

  if (loading === true) {
    return <Spinner />;
  }
  return (
    <>
      {subModulePermissionsRead ? (
        <div className="iframe-container">
          <PowerBIEmbed
            embedConfig={embedConfig(
              reportData.reportID,
              reportData.embedToken,
              reportData.pharmacyIDs,
              table,
              column,
              operator,
              screenSize
            )}
            eventHandlers={
              new Map([
                [
                  "error",
                  function (event) {
                    console.log("Error while loading report:", event.detail);
                  },
                ],
              ])
            }
            cssClassName={"exampleIframe"}
            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport;
            }}
          />
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};
export default PharmacyIframe;
