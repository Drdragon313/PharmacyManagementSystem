import { Upload, message, Progress, Pagination, Image, Modal } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { validateCSV } from "../../Utility Function/FileUtils";
import "./File.css";
import uploadloadIcon from "../../Assets/uploadbtn.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomTable from "../../Components/CustomTable/CustomTable";
import PaginationComponent from "../../Components/PaginationComponent/PaginationComponent";

const File = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listReports, setListReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const errorsPerPage = 6;
  const schemaData = localStorage.getItem("selectedSchemaData");
  const schemaID = localStorage.getItem("selectedSchemaID");
  const localHeader = localStorage.getItem("AuthorizationToken");
  const headers = useMemo(() => {
    return {
      Authorization: localHeader,
    };
  }, [localHeader]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/get-files-data?schema_id=${schemaID}&page=${currentPage}&limit=${limit}`,
          { headers }
        );
        setListReports(response.data.data);
        setTotalItems(response.data.total_items);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching schema data:", error);
      }
    };

    fetchData();
  }, [schemaID, headers]);
  const getCurrentPageErrors = () => {
    const startIndex = (currentPage - 1) * errorsPerPage;
    const endIndex = startIndex + errorsPerPage;
    return error.slice(startIndex, endIndex);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleLimitChange = (value) => {
    setLimit(value);
    setCurrentPage(1); // Reset current page when changing limit
  };
  const validateAndUpload = async (file) => {
    try {
      setIsLoading(true);
      const fileSizeLimit = 5 * 1024 * 1024;
      if (file.size > fileSizeLimit) {
        message.error("File size exceeds the limit (5MB).", 2);
        return;
      }
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
            message.error(error.response.data.error.message, 3);
          } else {
            message.error("File Uploading Failed!", 3);
          }
        });
    } catch (errorMessage) {
      setError(errorMessage);
      message.error("Invalid CSV File", 2);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };
  const columns = [
    {
      title: "File Name",
      dataIndex: "file_name",
    },
    {
      title: "File Size",
      dataIndex: "file_size",
    },
    {
      title: "Upload Date",
      dataIndex: "upload_date",
    },
    {
      title: "Uploaded by",
      dataIndex: "upload_by",
    },
  ];
  const breadcrumbItems = [
    { label: "Available Schemas", link: "/file" },
    { label: "Choose File", link: `/file/fileUpload` },
  ];
  const handleModalCancel = () => {
    setShowModal(false);
  };
  return (
    <div>
      <div className="breadcrumb-file-upload">
        <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
      </div>
      <div className="file-container">
        <p className="pharmacy-list-head-txt">Upload schema</p>
        <p className="file-paragraph">
          The CSV file's default column names can be viewed in the Details
          section for each tile. Additionally, a template file can be downloaded
          from there.
        </p>
        <div className="upload-download-btn-container">
          <Upload
            listType="text"
            className="file-upload"
            accept=".csv"
            beforeUpload={validateAndUpload}
            showUploadList={error ? true : false}
            onRemove={() => {
              setError([]);
            }}
          >
            <CustomButton className="import-button">
              <Image
                className="down-img"
                preview={false}
                src={uploadloadIcon}
              ></Image>
              Choose File
            </CustomButton>
          </Upload>
        </div>
        <Modal
          open={showModal}
          onCancel={handleModalCancel}
          footer={null}
          title="Errors in the uploaded file"
        >
          {error &&
            getCurrentPageErrors().map((value, index) => (
              <div style={{ color: "red" }} key={index}>
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
          )}
        </Modal>
        <p className="table-tile-schema-details">Uploaded Reports List</p>
        <CustomTable dataSource={listReports} columns={columns} />
        <PaginationComponent
          limit={limit}
          handleLimitChange={handleLimitChange}
          page={currentPage}
          totalItems={totalItems}
          handlePageChange={handlePageChange}
        />
        {isLoading && (
          <div className="loading-indicator">
            <Progress className="fileProgress" percent={progress} />
          </div>
        )}
      </div>
    </div>
  );
};

export default File;
