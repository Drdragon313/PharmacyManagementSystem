import React from "react";
import "./Iframe.css";

const PharmacyIfame = () => {
  return (
    <iframe
      className="exampleIframe"
      title="Pharmacy_Report"
      width="1100"
      height="570"
      src="https://app.powerbi.com/reportEmbed?reportId=6bba72ab-c3ef-4748-9d43-4761af0926f9&autoAuth=true&ctid=a265085c-0664-4a17-ba9a-0ae700f6b5ab"
      frameborder="0"
      allowFullScreen="true"
    ></iframe>
  );
};

export default PharmacyIfame;
