import { Upload, Button, message, Progress, Pagination } from "antd";
import React, { useState } from "react";
import { validateCSV } from "../../Utility Function/FileUtils";
import "./File.css";
import uploadIcon from "../../Components/Images/uploadIcon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";

const File = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const errorsPerPage = 6;
  const schemaData = localStorage.getItem("selectedSchemaData");
  const schemaID = localStorage.getItem("selectedSchemaID");
  const localHeader = localStorage.getItem("AuthorizationToken");
  const headers = {
    Authorization: localHeader,
  };

  const navigate = useNavigate();

  const getCurrentPageErrors = () => {
    const startIndex = (currentPage - 1) * errorsPerPage;
    const endIndex = startIndex + errorsPerPage;
    return error.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const validateAndUpload = async (file) => {
    try {
      setIsLoading(true);
      await validateCSV(file, schemaData, setProgress);
      setError("");
      message.success("Valid CSV File", 2);
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(`${baseURL}/file-upload?schema_id=${schemaID}`, formData, {
          headers,
          "Content-Type": "multipart/form-data",
        })
        .then(() => {
          message.success("File Uploaded Successfully!");
          navigate("UploadSuccess");
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error &&
            error.response.data.error.message
          ) {
            // message.error(error.response.data.error.message, 3);
          } else {
            // message.error("File Uploading Failed!", 3);
          }
        });
    } catch (errorMessage) {
      // setError(errorMessage);
      // message.error("Invalid CSV File", 2);
    } finally {
      setIsLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: "Available Schemas", link: "/file" },
    { label: "Choose File", link: `/file/fileUpload` },
  ];
  return (
    <div>
      <div className="file-container">
        <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
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
            // onRemove={() => {
            //   setError([]);
            // }}
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
          <div>
            {/* {error &&
              getCurrentPageErrors().map((value, index) => (
                <div style={{ color: "green" }} key={index}>
                  <p>{value}</p>
                </div>
              ))}
            {error.length > errorsPerPage && (
              <Pagination
                current={currentPage}
                pageSize={errorsPerPage}
                total={error.length}
                onChange={handlePageChange}
                showSizeChanger={false}
                className="pagination"
              />
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default File;
