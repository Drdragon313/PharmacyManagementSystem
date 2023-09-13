import { Upload, Button } from "antd";
import React, { useState } from "react";
import Papa from "papaparse";
import "./File.css";

const File = () => {
  const [error, setError] = useState("");

  const validateCSV = (file) => {
    return new Promise((resolve, reject) => {
      let hasInvalidChunk = false;
      console.log(file);

      Papa.parse(file, {
        dynamicTyping: true,
        header: true,
        chunk: (results) => {
          results.data.forEach((row) => {
            console.log(typeof row.name);
              console.log(typeof row.age);
            // Check if each row has "name" and "age" columns
            if (!row.name || !row.age) {
              
              hasInvalidChunk = true;
              reject("CSV file does not have the required structure.");
            }
            if (typeof row.name !== "string" || typeof row.age !== "number") {
              hasInvalidChunk = true;
              reject("CSV file contains invalid data types.");
            }
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

  return (
    <div>
      <Upload.Dragger
        listType="text"
        multiple={true}
        // action={"https://localhost:3000/"}
        accept=".csv,.doc"
        beforeUpload={validateAndUpload}
      >
        Drag Files here or
        <br />
        <Button className="import-button">Click Upload File</Button>
      </Upload.Dragger>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default File;
