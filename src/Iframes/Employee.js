import React, { useState, useEffect } from "react";
import "./Iframe.css";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import axios from "axios";
import { baseURL } from "../Components/BaseURLAPI/BaseURLAPI";
import { fetchUserPermissions } from "../Utility Function/ModulesAndPermissions";
import Spinner from "../Components/Spinner/Spinner";
import AccessDenied from "../Pages/AccessDenied/AccessDenied";

const Employee = () => {
  const [reportData, setReportData] = useState({
    embedToken: "",
    pharmacyIDs: [],
    reportID: "",
    userIDs: [],
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
    const authToken = localStorage.getItem("AuthorizationToken");
    const headers = {
      Authorization: authToken,
    };
    const reportID = localStorage.getItem("ReportID");
    axios
      .get(`${baseURL}/get-report-data?report_id=${reportID}`, { headers })
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

  const table1 = "public pharmacies";
  const column1 = "id";
  const operator = "eq";
  const table2 = "public users";
  const column2 = "id";

  const subModulePermissionsRead =
    userPermissions
      ?.find((module) => module.module_name === "Reports")
      .sub_modules.find((subModule) => subModule.sub_module_name === "Employee")
      ?.actions?.read || false;

  if (loading === true) {
    return <Spinner />;
  }
  return (
    <>
      {subModulePermissionsRead ? (
        <div className="iframe-container">
          <PowerBIEmbed
            embedConfig={{
              type: "report",
              id: reportData.reportID,
              embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportData.reportID}`,
              accessToken: reportData.embedToken,
              tokenType: models.TokenType.Embed,

              settings: {
                hideErrors: true,
                layoutType:
                  screenSize < 768
                    ? models.LayoutType.MobilePortrait
                    : models.LayoutType.MobileLandscape,
                panes: {
                  filters: {
                    expanded: false,
                    visible: false,
                  },
                  pageNavigation: {
                    visible: false,
                  },
                  bars: {
                    actionBar: {
                      visible: true,
                    },
                  },
                },
                hideFooter: true,
                background: models.BackgroundType.Transparent,
              },
              filters: [
                {
                  $schema: "http://powerbi.com/product/schema#basicFilter",
                  target: {
                    table: table1,
                    column: column1,
                  },
                  operator: reportData.pharmacyIDs === null ? "lt" : operator,
                  values:
                    reportData.pharmacyIDs === null
                      ? [0]
                      : reportData.pharmacyIDs,
                },
                {
                  $schema: "http://powerbi.com/product/schema#basicFilter",
                  target: {
                    table: table2,
                    column: column2,
                  },
                  operator: reportData.userIDs.length > 0 ? operator : "lt",
                  values:
                    reportData.userIDs.length > 0 ? reportData.userIDs : [0],
                },
              ],
            }}
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

export default Employee;
