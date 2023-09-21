import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, Button } from "antd";

const SchemaDetail = () => {
  const { schemaId } = useParams();
  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);
  const schemaData = schemaDataArray[schemaId];

  return (
    <div>
      {schemaData ? (
        <div>
          <h3>Schema Name: {schemaData.name}</h3>
          <Table
            dataSource={schemaData.data}
            pagination={false}
            bordered
            columns={[
              {
                title: "ID",
                dataIndex: "id",
                key: "id",
              },
              {
                title: "Field Name",
                dataIndex: "Fieldname",
                key: "Fieldname",
              },
              {
                title: "Type",
                dataIndex: "Type",
                key: "Type",
              },
              {
                title: "Validation",
                dataIndex: "Validation",
                key: "Validation",
              },
            ]}
          />
          <Button type="primary">Edit Schema</Button>
        </div>
      ) : (
        <p>Schema not found</p>
      )}
    </div>
  );
};

export default SchemaDetail;
