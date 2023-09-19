import { Upload, Button } from "antd";
import React, { useState } from "react";
import Papa from "papaparse";
import { useSelector } from "react-redux";
import "./File.css";

const File = () => {
  const [error, setError] = useState("");
  const reduxStructure = useSelector((state) => state.form.formDataArray);

  const validateCSV = (file) => {
    return new Promise((resolve, reject) => {
      let hasInvalidChunk = false;

      Papa.parse(file, {
        dynamicTyping: true,
        skipEmptyLines: true,
        header: true,

        chunk: (results) => {
          const csvHeaders = Object.keys(results.data[0]);
          const reduxHeaders = reduxStructure.map((item) => item.Fieldname);

          if (!arraysEqual(csvHeaders, reduxHeaders)) {
            hasInvalidChunk = true;
            reject("CSV file does not match the required structure.");
          }

          results.data.forEach((row) => {
            reduxStructure.forEach((item) => {
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

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  return (
    <div>
      <Upload.Dragger
        listType="text"
        multiple={true}
        accept=".csv"
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
