import { Upload, Button, message, Progress } from "antd";
import React, { useState } from "react";
import { validateCSV } from "../../Utility Function/FileUtils";
import { useSelector } from "react-redux";
import "./File.css";
import uploadIcon from "../../Components/Images/uploadIcon.png";
import { useNavigate } from "react-router-dom";

const File = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState([]);
  const index = useSelector((state) => state.SchemaSelection.index);
  const navigate = useNavigate();

  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);

  const validateAndUpload = async (file) => {
    try {
      setIsLoading(true);
      await validateCSV(
        file,
        index,
        schemaDataArray,
        setProgress,
        (event) => {}
      );
      setError("");
      message.success("Valid CSV File", 2);
      navigate("UploadSuccess");
    } catch (errorMessage) {
      setError(errorMessage);
      message.error("Invalid CSV File", 2);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="file-container">
        <h2>Files and Assets</h2>
        <p className="file-paragraph">
          Documents and Attachments that have been uploaded will be validated
          with the already defined selected schema in order to upload to the
          database.
        </p>
        <div className="file-dragger">
          <Upload.Dragger
            listType="text"
            className="file-upload"
            accept=".csv"
            beforeUpload={validateAndUpload}
            onRemove={() => {
              setError();
            }}
          >
            <img src={uploadIcon} alt="Upload Icon" />
            <br />
            <p className="file-uploadText">Drag or Drop your files here</p>
            <p className="file-supportedText">Files Supported: .CSV</p>
            <Button className="import-button">Choose File</Button>
          </Upload.Dragger>
        </div>
        {isLoading ? (
          <div className="loading-indicator">
            <Progress className="fileProgress" percent={progress} />
          </div>
        ) : (
          error && (
            <div style={{ color: "red" }}>
              {error.map((value, index) => (
                <p key={index}>{value}</p>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default File;
