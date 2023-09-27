import React from "react";
import { Upload, Button } from "antd";
import uploadIcon from "../../Components/Images/uploadIcon.png";
import Papa from "papaparse";
import { useDispatch } from "react-redux";
import { addFormData } from "../../redux/features/formSlice/formSlice";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
const AutoPopulate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateCSV = async (file) => {
    return new Promise((resolve, reject) => {
      let headers = [];
      let dataTypes = [];
      let validations = [];
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
              validations.push("none");
            });
          });
        },

        complete: () => {
          resolve({ headers, dataTypes, validations });
        },
      });
    });
  };
  const createTableData = (headers, dataTypes, validations) => {
    for (let i = 0; i < headers.length; i++) {
      dispatch(
        addFormData({
          Fieldname: headers[i],
          Type: dataTypes[i],
          Validation: validations[i],
          id: i + 1,
        })
      );
    }
  };

  const validateAndUpload = async (file) => {
    try {
      const { headers, dataTypes, validations } = await validateCSV(file);
      createTableData(headers, dataTypes, validations);
      message.success("Schema Auto Populated Successfully!", 2);
      navigate("/customschema");
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
    </div>
  );
};

export default AutoPopulate;
