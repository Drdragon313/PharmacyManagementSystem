import React, { useState, useEffect } from "react";
import "./Iframe.css";
import { PowerBIEmbed } from "powerbi-client-react";
// import { models } from "powerbi-client";
import axios from "axios";
import { baseURL } from "../Components/BaseURLAPI/BaseURLAPI";
import { embedConfig } from "../Utility Function/ReportUtils";

const PharmacyIframe = () => {
  const [reportData, setReportData] = useState({
    embedToken: "",
    pharmacyIDs: [],
    reportID: "",
  });
  useEffect(() => {
    const authToken = localStorage.getItem("AuthorizationToken");
    const headers = {
      Authorization: authToken,
    };
    const reportID = localStorage.getItem("ReportID");

    axios
      .get(`${baseURL}/get-report-data?report_id=${reportID}`, { headers })
      .then((response) => {
        console.log(response.data.Data);
        const newData = response.data.Data;
        setReportData((prevData) => ({
          ...prevData,
          ...newData,
        }));
      })
      .catch((error) => {
        console.log("Error from API", error);
      });
  }, []);
  const table = "public pharmacy_data_1";
  const column = "pharmacy_id";
  const operator = "eq";

  return (
    <div>
      <PowerBIEmbed
        embedConfig={embedConfig(
          reportData.reportID,
          reportData.embedToken,
          reportData.pharmacyIDs,
          table,
          column,
          operator
        )}
        // embedConfig={{
        //   type: "report",
        //   id: reportData.reportID,
        //   embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportData.reportID}`,
        //   accessToken: reportData.embedToken,
        //   tokenType: models.TokenType.Embed,
        //   settings: {
        //     panes: {
        //       filters: {
        //         expanded: false,
        //         visible: false,
        //       },
        //     },
        //     background: models.BackgroundType.Transparent,
        //   },
        //   filters: [
        //     {
        //       $schema: "http://powerbi.com/product/schema#basicFilter",
        //       target: {
        //         table: "public pharmacy_data_1",
        //         column: "pharmacy_id",
        //       },
        //       operator: "eq",
        //       values: reportData.pharmacyIDs.map((value) => value),
        //     },
        //   ],
        // }}
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
        cssClassName={"customIframe"}
        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport;
        }}
      />
    </div>
  );
};

export default PharmacyIframe;
