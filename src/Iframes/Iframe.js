import React from "react";
import "./Iframe.css";

const Iframe = () => {
  return (
    <iframe
      className="exampleIframe"
      title="Employee"
      width="1100"
      height="570"
      src="https://app.powerbi.com/reportEmbed?reportId=79b9d101-5f95-4f30-9caf-03f218e30446&autoAuth=true&ctid=a265085c-0664-4a17-ba9a-0ae700f6b5ab"
      allowFullScreen="true"
    ></iframe>
  );
};

export default Iframe;
