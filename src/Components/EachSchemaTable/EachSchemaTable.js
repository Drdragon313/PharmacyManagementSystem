import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";

const EachSchemaTable = (schemaData) => {
  schemaData = useSelector((state) => state.schema.schemaDataArray[0]);

  if (!schemaData) {
    return <div>No data available</div>;
  }
  const columns = schemaData.data.map((field, index) => ({
    title: field.Fieldname,
    dataIndex: `field${index}`,
  }));

  const data = schemaData.data.map((field, index) => ({
    ...field,
    key: `row${index}`,
  }));

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ x: true }}
    />
  );
};

export default EachSchemaTable;
