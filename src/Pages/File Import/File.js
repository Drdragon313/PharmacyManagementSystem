import { Upload, Button, Input } from "antd";
import React, { useState } from "react";

import Papa from "papaparse";
import { useSelector } from "react-redux";
import "./File.css";
import uploadIcon from "../../Components/Images/uploadIcon.png"

const File = () => {
  const [error, setError] = useState("");
  const [selectedSchema, setSelectedSchema] = useState();

  // const selectedSchema=1;
  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);
  const onInputChange = (event) => {
    setSelectedSchema(event.target.value);
  };

  const validateCSV = (file) => {
    return new Promise((resolve, reject) => {
      let hasInvalidChunk = false;
      const selectedSchemaData = schemaDataArray[selectedSchema];

      Papa.parse(file, {
        dynamicTyping: true,
        skipEmptyLines: true,
        header: true,

        chunk: (results) => {
          const csvHeaders = Object.keys(results.data[0]);
          const schemaHeaders = selectedSchemaData.data.map(
            (item) => item.Fieldname
          );

          // Check if CSV headers match Redux headers
          if (!arraysEqual(csvHeaders, schemaHeaders)) {
            hasInvalidChunk = true;
            reject("CSV file does not match the required structure.");
          }

          results.data.forEach((row) => {
            // Check if data types match the Redux structure
            selectedSchemaData.data.forEach((item) => {
              const fieldName = item.Fieldname;
              const expectedType = item.Type;
              const actualType = typeof row[fieldName];

              if (actualType !== expectedType) {
                hasInvalidChunk = true;
                reject(`Invalid data type for ${fieldName}.`);
              }
            });
          });
        },

        complete: () => {
          if (!hasInvalidChunk) {
            resolve();
          }
        },
      });
    });
  };

  const validateAndUpload = async (file) => {
    try {
      await validateCSV(file);
      setError("");
      alert("Valid CSV");
    } catch (errorMessage) {
      setError(errorMessage);
      alert("Invalid CSV");
    }
  };

  // Utility function to compare two arrays for equality
  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  return (
    <div>
      <div style={{ marginLeft: "20px" }}>
        <Input
          placeholder="Add Schema No to Validate"
          style={{ marginTop: "20px",marginBottom:"20px", width: "300px" }}
          onChange={onInputChange}
        />
        <h2>Files and Assets</h2>
        <p style={{color:"#707477"}}>
          Documents and Attachments that have been uploaded will be validated
          with the already defined selected schema in order to upload to the
          database.
        </p>
        <Upload.Dragger
          listType="text"
          style={{  width: "80vw"  }}
          // multiple={true}
          accept=".csv"
          beforeUpload={validateAndUpload}
        >
          <img src={uploadIcon} alt="Upload Icon" />
          <br />
          <p style={{height:"10px"}}>Drag or Drop your files here</p>
          <p style={{color:"#707477",fontSize:"11px",height:"10px"}}>Files Supported: .CSV</p>
          <Button className="import-button">Choose File</Button>
        </Upload.Dragger>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};

export default File;
