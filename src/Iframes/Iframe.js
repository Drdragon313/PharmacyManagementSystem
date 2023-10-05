import React from "react";
import "./Iframe.css";

const Iframe = () => {
  return (
    <iframe
      className="exampleIframe"
      title="power bi"
      width="1250"
      height="650"
      src="https://app.powerbi.com/reportEmbed?reportId=8b1df912-b9dc-47d5-8088-4547dc7eb976&autoAuth=true&ctid=a265085c-0664-4a17-ba9a-0ae700f6b5ab"
      allowFullScreen={true}
    ></iframe>
  );
};

export default Iframe;
