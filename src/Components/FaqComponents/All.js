import React, { useEffect, useState } from "react";
import "./FaqStyle.css";
import { Collapse, Image, theme } from "antd";
import plusOutline from "../../Assets/plus.svg";
import Papa from "papaparse";

const All = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/faq.csv");
      const text = await response.text();

      Papa.parse(text, {
        header: true,
        complete: (result) => {
          setFaqData(result.data);
        },
      });
    };

    fetchData();
  }, []);

  const getItems = (panelStyle) => {
    return faqData.map((item) => ({
      key: item.key,
      label: (
        <div>
          <p className="heading-expandable-faq">{item.Questions}</p>
        </div>
      ),
      children: (
        <div>
          <p>{item.Answers}</p>
          <div className="faq-img">
            {item.Image && (
              <Image src={item.Image} alt="FAQ Image" preview={false} />
            )}
          </div>
        </div>
      ),
      style: panelStyle,
    }));
  };

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <div>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <Image preview={false} src={plusOutline} rotate={isActive ? 90 : 0} />
        )}
        style={{
          background: token.colorBgContainer,
        }}
        items={getItems(panelStyle)}
      />
    </div>
  );
};

export default All;
