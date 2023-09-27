import React, { useState } from "react";
import { Upload, Button, Table } from "antd";
import uploadIcon from "../../Components/Images/uploadIcon.png";
import Papa from "papaparse";

const AutoPopulate = () => {
  const [tableData, settableData] = useState();

  const validateCSV = async (file) => {
    return new Promise((resolve, reject) => {
      let headers = [];
      let dataTypes = [];
      Papa.parse(file, {
        dynamicTyping: true,
        skipEmptyLines: true,
        header: true,

        chunk: (results) => {
          const csvHeaders = Object.keys(results.data[0]);
          headers.push(...csvHeaders);

          results.data.forEach((row) => {
            csvHeaders.forEach((fieldName) => {
              const actualType = typeof row[fieldName];
              dataTypes.push(actualType);
            });
          });
          console.log(dataTypes);
          console.log(headers);
        },

        complete: () => {
          resolve({ headers, dataTypes });
        },
      });
    });
  };
  const columns = [
    {
      title: "Field Name",
      dataIndex: "header",
      key: "header",
    },
    {
      title: "Data Type",
      dataIndex: "dataType",
      key: "dataType",
    },
  ];
  const createTableData = (headers, dataTypes) => {
    const tableData = [];
    for (let i = 0; i < headers.length; i++) {
      tableData.push({
        key: i,
        header: headers[i],
        dataType: dataTypes[i],
      });
    }

    return tableData;
  };

  const validateAndUpload = async (file) => {
    try {
      const { headers, dataTypes } = await validateCSV(file);
      settableData(createTableData(headers, dataTypes));
    } catch (errorMessage) {}
  };

  return (
    <div>
      <Upload.Dragger
        listType="text"
        className="file-upload"
        accept=".csv"
        beforeUpload={validateAndUpload}
      >
        <img src={uploadIcon} alt="Upload Icon" />
        <br />
        <p className="file-uploadText">Drag or Drop your files here</p>
        <p className="file-supportedText">Files Supported: .CSV</p>
        <Button className="import-button">Choose File</Button>
      </Upload.Dragger>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};

export default AutoPopulate;
