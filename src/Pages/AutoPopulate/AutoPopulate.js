import React, { useState } from "react";
import { Upload, Button, Progress } from "antd";
import uploadIcon from "../../Components/Images/uploadIcon.png";
import Papa from "papaparse";
import { useDispatch } from "react-redux";
import { addFormData } from "../../redux/features/formSlice/formSlice";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "./AutoPopulate.css";
const AutoPopulate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorArray, setErrorArray] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateCSV = async (file) => {
    return new Promise((resolve, reject) => {
      let headers = [];
      let columnData = {};
      let hasError = false;
      let totalLines = 0;
      Papa.parse(file, {
        dynamicTyping: true,
        skipEmptyLines: true,
        header: true,
        chunk: (results) => {
          if (results.data.length === 0) {
            hasError = true;
            setErrorArray([...errorArray, "No data found in the CSV file."]);
          } else {
            let csvHeaders = Object.keys(results.data[0]);
            totalLines += results.data.length;
            let progress = Math.round((totalLines / file.size) * 10000);
            setProgress(progress);
            csvHeaders.forEach((value) => {
              if (value === "__parsed_extra") {
                hasError = true;
                setErrorArray([
                  ...errorArray,
                  "Invalid File Structure. Some headers are missing.",
                ]);
              }
            });
            headers.push(...csvHeaders);
            csvHeaders.forEach((fieldName) => {
              if (!columnData[fieldName]) {
                columnData[fieldName] = {};
              }
              results.data.forEach((row) => {
                const actualType = typeof row[fieldName];
                columnData[fieldName][actualType] =
                  (columnData[fieldName][actualType] || 0) + 1;
              });
            });
          }
        },
        complete: () => {
          if (hasError !== true) {
            resolve({ headers, columnData });
          } else {
            reject("Invalid or empty CSV file.");
          }
        },
      });
    });
  };

  const createTableData = (headers, columnData) => {
    let currentId = 1;
    const uniqueHeaders = [...new Set(headers)];
    uniqueHeaders.forEach((fieldName) => {
      const typesCount = columnData[fieldName];
      const dataType = Object.keys(typesCount).reduce((a, b) =>
        typesCount[a] > typesCount[b] ? a : b
      );
      dispatch(
        addFormData({
          Fieldname: fieldName,
          Type: dataType,
          Validation: "none",
          id: currentId,
        })
      );
      currentId++;
    });
  };

  const validateAndUpload = async (file) => {
    try {
      setIsLoading(true);
      const { headers, columnData, validations } = await validateCSV(file);
      createTableData(headers, columnData, validations);
      message.success("Schema Auto Populated Successfully!", 2);
      navigate("/customschema");
    } catch (errorMessage) {
      message.error("Invalid File Structure!", 2);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="populate-container">
        <h2>Choose File</h2>
        <p className="populate-paragraph">
          Choose File to Automatically Populate the Schema
        </p>
        <div className="populate-dragger">
          <Upload.Dragger
            listType="text"
            className="populate-file-upload"
            accept=".csv"
            beforeUpload={validateAndUpload}
          >
            <img src={uploadIcon} alt="Upload Icon" />
            <br />
            <p className="populate-uploadText">Drag or Drop your files here</p>
            <p className="populate-supportedText">Files Supported: .CSV</p>
            <Button className="populate-import-button">Choose File</Button>
          </Upload.Dragger>
          {isLoading ? (
            <div className="loading-indicator">
              <Progress
                className="AutoPopulatefileProgress"
                percent={progress}
              />
            </div>
          ) : (
            errorArray && (
              <div style={{ color: "red" }}>
                {errorArray.map((value, index) => (
                  <p key={index}>{value}</p>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoPopulate;
