import React from "react";
import { Upload, Button } from "antd";
import uploadIcon from "../../Components/Images/uploadIcon.png";
import Papa from "papaparse";
import { useDispatch } from "react-redux";
import { addFormData } from "../../redux/features/formSlice/formSlice";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "./AutoPopulate.css";
const AutoPopulate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateCSV = async (file) => {
    return new Promise((resolve, reject) => {
      let headers = [];
      let columnData = {};
      Papa.parse(file, {
        dynamicTyping: true,
        skipEmptyLines: true,
        header: true,

        chunk: (results) => {
          const csvHeaders = Object.keys(results.data[0]);
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
        },

        complete: () => {
          resolve({ headers, columnData });
        },
      });
    });
  };

  const createTableData = (headers, columnData) => {
    let currentId = 1;

    headers.forEach((fieldName) => {
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
      const { headers, columnData, validations } = await validateCSV(file);
      createTableData(headers, columnData, validations);
      message.success("Schema Auto Populated Successfully!", 2);
      navigate("/customschema");
    } catch (errorMessage) {}
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
        </div>
      </div>
    </div>
  );
};

export default AutoPopulate;
