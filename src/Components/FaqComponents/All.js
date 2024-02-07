import React from "react";
import "./FaqStyle.css";
import { Collapse, Image, theme } from "antd";
import plusOutline from "../../Assets/plus.svg";
const All = () => {
  const text = `
  Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.
`;
  const getItems = (panelStyle) => [
    {
      key: "1",
      label: (
        <p className="heading-expandable-faq">
          How do I add employees to my pharmacy?
        </p>
      ),
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: "2",
      label: (
        <p className="heading-expandable-faq">
          How can I reset my password if I forget it?
        </p>
      ),
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: "3",
      label: (
        <p className="heading-expandable-faq">
          How do I change my account password?
        </p>
      ),
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: "4",
      label: (
        <p className="heading-expandable-faq">
          My verification email says the link has expired. What should I do?
        </p>
      ),
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: "5",
      label: (
        <p className="heading-expandable-faq">
          Why are some of my fields disabled in my account settings?
        </p>
      ),
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: "6",
      label: (
        <p className="heading-expandable-faq">
          How do I add employees to my pharmacy?
        </p>
      ),
      children: <p>{text}</p>,
      style: panelStyle,
    },
  ];
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  return (
    <div>
      {" "}
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
