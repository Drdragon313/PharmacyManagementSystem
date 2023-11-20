import React from "react";
import "./Iframe.css";

const Iframe = () => {
  return (
    <div className="iframe-container">
      <iframe
        className="exampleIframe"
        title="Employee_Report"
        width="1100"
        height="570"
        src="https://app.powerbi.com/reportEmbed?reportId=27ea5915-1f1d-4bea-9d24-90a6845b2f48&autoAuth=true&ctid=a265085c-0664-4a17-ba9a-0ae700f6b5ab"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default Iframe;
