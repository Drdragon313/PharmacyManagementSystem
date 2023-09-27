import React from "react";
import "./Iframe.css";

const Iframe = () => {
  return (
    <iframe
      className="exampleIframe"
      title="power bi"
      width="1026.36"
      height="510"
      src="https://app.powerbi.com/reportEmbed?reportId=5a006d6d-811f-4132-9322-7ba6ad65b4b8&autoAuth=true&ctid=a265085c-0664-4a17-ba9a-0ae700f6b5ab"
      allowFullScreen={true}
    ></iframe>
  );
};

export default Iframe;
