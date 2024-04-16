import React, { useState, useEffect } from "react";
import "./Iframe.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { embedConfig } from "../Utility Function/ReportUtils";
import axios from "axios";
import { baseURL } from "../Components/BaseURLAPI/BaseURLAPI";
import { fetchUserPermissions } from "../Utility Function/ModulesAndPermissions";
import Spinner from "../Components/Spinner/Spinner";
import AccessDenied from "../Pages/AccessDenied/AccessDenied";
const Dashboard = () => {
  const [reportData, setReportData] = useState({
    embedToken: "",
    pharmacyIDs: [],
    reportID: "",
  });
  const [userPermissions, setUserPermissions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
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
  const canViewDashboard =
    userPermissions?.find((module) => module.module_name === "Dashboard")
      ?.actions?.read || false;
  useEffect(() => {
    const authToken = localStorage.getItem("AuthorizationToken");
    const headers = {
      Authorization: authToken,
    };
    axios
      .get(`${baseURL}/get-report-data?report_id=9`, { headers })
      .then((response) => {
        const newData = response.data.Data;
        setReportData((prevData) => ({
          ...prevData,
          ...newData,
        }));
      })
      .catch(() => {});

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
  if (loading === true) {
    return <Spinner />;
  }
  return (
    <>
      {canViewDashboard ? (
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

export default Dashboard;
