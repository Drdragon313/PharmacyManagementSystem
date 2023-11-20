import React, { useState } from "react";
import "./Iframe.css";
import { Spin } from "antd";

const PharmacyIframe = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="iframe-container">
      {!isLoaded && (
        <div className="loader">
          <Spin size="large" />
        </div>
      )}
      <iframe
        className={`exampleIframe ${isLoaded ? "loaded" : "hidden"}`}
        title="Pharmacy_Report"
        width="100%"
        height="70vh"
        src="https://app.powerbi.com/reportEmbed?reportId=6bba72ab-c3ef-4748-9d43-4761af0926f9&autoAuth=true&ctid=a265085c-0664-4a17-ba9a-0ae700f6b5ab"
        allowFullScreen="true"
        onLoad={handleIframeLoad}
      ></iframe>
    </div>
  );
};

export default PharmacyIframe;
