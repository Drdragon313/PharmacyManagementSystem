import React, { useEffect, useState, useMemo } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { numericToAlphabetic } from "../../Utility Function/numericToAlphabetic";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";
import { Button, Image, Spin } from "antd";
import downloadIcon from "../../Assets/Download.svg";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { downloadCSV } from "../../Utility Function/downloadCSV";
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
        console.log(response.data.schema);
      } catch (error) {
        console.error("Error fetching schema data:", error);
      }
    };

    fetchData();
  }, [schemaId, headers]);
  const handleDownloadClick = () => {
    if (schemaData) {
      downloadCSV(schemaData.data, schemaData.name);
    }
  };
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
          <h3>Tile Name: {schemaData.name}</h3>
          <Button
            className="download-btn-schema-details"
            onClick={handleDownloadClick}
          >
            <Image
              className="down-img-schema-details"
              preview={false}
              src={downloadIcon}
            ></Image>
            Download example CSV
          </Button>
          <CustomTable
            className="schema-table-schema-details"
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
