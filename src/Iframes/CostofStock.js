import React, { useState, useEffect } from "react";
import "./Iframe.css";
import { PowerBIEmbed } from "powerbi-client-react";

import { embedConfig, getReportData } from "../Utility Function/ReportUtils";
const CostofStock = () => {
  const [reportData, setReportData] = useState({
    embedToken: "",
    pharmacyIDs: [],
    reportID: "",
  });
  const [screenSize, setScreenSize] = useState(window.innerWidth);
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

  return (
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
  );
};

export default CostofStock;
