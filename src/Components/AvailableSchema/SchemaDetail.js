import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { numericToAlphabetic } from "../../Utility Function/numericToAlphabetic";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";
import { Spin, Table } from "antd";

const SchemaDetails = () => {
  const { schemaId } = useParams();
  const [schemaData, setSchemaData] = useState(null);
  const localHeader = localStorage.getItem("AuthorizationToken");
  const headers = useMemo(() => {
    return {
      Authorization: localHeader,
    };
  }, [localHeader]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/schema/get-all-schema?schema_id=${schemaId}`,
          { headers }
        );
        setSchemaData(response.data.schema.schemaDataArray[0]);
        console.log(response.data.schema.schemaDataArray[0].data);
      } catch (error) {
        console.error("Error fetching schema data:", error);
      }
    };

    fetchData();
  }, [schemaId, headers]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "5%",
      render: (id) => numericToAlphabetic(id),
    },
    {
      title: "Field Name",
      dataIndex: "Fieldname",
      width: "30%",
    },
    {
      title: "Type",
      dataIndex: "Type",
      width: "30%",
    },
    {
      title: "Validation",
      dataIndex: "Validation",
      width: "30%",
    },
  ];
  return (
    <div>
      {schemaData ? (
        <div className="table">
          <h3 style={{ marginLeft: "10px" }}>Tile Name: {schemaData.name}</h3>
          <Table
            className="schema-table"
            dataSource={schemaData.data}
            columns={columns}
            bordered
          />
        </div>
      ) : (
        <div className="loader">
          <Spin size="large"></Spin>
          <p>Loading schema data...</p>
        </div>
      )}
    </div>
  );
};

export default SchemaDetails;
