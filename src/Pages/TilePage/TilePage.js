import React from "react";
import { Card } from "antd";

const TilePage = ({ match }) => {
  const { tileName } = match.params;

  return (
    <div>
      <h2>Content for Tile: {tileName}</h2>
      <Card title={`Content for ${tileName}`} bordered={true}></Card>
    </div>
  );
};

export default TilePage;
