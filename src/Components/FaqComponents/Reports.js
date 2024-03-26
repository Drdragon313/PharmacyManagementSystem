import React, { useEffect, useState } from "react";
import "./FaqStyle.css";
import { Collapse, Image, theme } from "antd";

import Papa from "papaparse";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

const Reports = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/reports.csv");
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
          <p>{item.Path}</p>
          <div className="faq-img">
            {item.Image1 && (
              <Image src={item.Image1} alt="FAQ Image" preview={false} />
            )}
          </div>
          <div className="faq-img">
            {item.Image2 && (
              <Image src={item.Image2} alt="FAQ Image" preview={false} />
            )}
          </div>
          <div className="faq-img">
            {item.Image3 && (
              <Image src={item.Image3} alt="FAQ Image" preview={false} />
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
        defaultActiveKey={[0]}
        expandIconPosition="end"
        expandIcon={({ isActive }) =>
          isActive ? (
            <MinusCircleOutlined color="#3A3475" rotate={180} />
          ) : (
            <PlusCircleOutlined color="#3A3475" rotate={0} />
          )
        }
        style={{
          background: token.colorBgContainer,
        }}
        items={getItems(panelStyle)}
      />
    </div>
  );
};

export default Reports;
