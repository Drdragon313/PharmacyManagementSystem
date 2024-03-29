import {
  Upload,
  message,
  Progress,
  Pagination,
  Image,
  Modal,
  Space,
} from "antd";
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
import eyeIcon from "../../Assets/Icon feather-eye.svg";
import { Link } from "react-router-dom";
import deleteActionbtn from "../../Assets/deleteAction.svg";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";
import { fetchUserPermissions } from "../../Utility Function/ModulesAndPermissions";
import Spinner from "../../Components/Spinner/Spinner";
import AccessDenied from "../AccessDenied/AccessDenied";
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
  const [schemasData, setSchemasData] = useState(null);
  const schemaID = localStorage.getItem("selectedSchemaID");
  const localHeader = localStorage.getItem("AuthorizationToken");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [userPermissions, setUserPermissions] = useState(null);
  const [loading, setLoading] = useState(true);

  const headers = useMemo(() => {
    return {
      Authorization: localHeader,
    };
  }, [localHeader]);
  useEffect(() => {
    const fetchUserPermissionData = async () => {
      try {
        await fetchUserPermissions(setUserPermissions);
      } catch (error) {
        console.error("Error fetching user permissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPermissionData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/schema/get-all-schema?schema_id=${schemaID}`,
          { headers }
        );
        setSchemasData(response.data.schema.schemaDataArray[0]);
        console.log(response.data.schema);
      } catch (error) {
        console.error("Error fetching schema data:", error);
      }
    };

    fetchData();
  }, [schemaID, headers]);
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
  }, [schemaID, headers, currentPage, limit]);
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
    setCurrentPage(1);
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
      title: "ID",
      dataIndex: "id",
    },
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
    {
      title: "Action(s)",
      width: 150,
      fixed: "right",
      render: (text, record) => (
        <Space className="action-btns">
          {canDeleteFile && (
            <Image
              preview={false}
              src={deleteActionbtn}
              onClick={() => handleDeleteConfirmation(record.id)}
            ></Image>
          )}
        </Space>
      ),
    },
  ];
  const handleDeleteConfirmation = (recordId) => {
    setRecordToDelete(recordId);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = () => {
    axios
      .delete(`${baseURL}/delete-files-data?id=${recordToDelete}`, { headers })
      .then(() => {
        message.success("Record deleted successfully");
        setListReports((prevReports) =>
          prevReports.filter((report) => report.id !== recordToDelete)
        );
      })
      .catch((error) => {
        message.error("Failed to delete record");
        console.error("Delete error:", error);
      })
      .finally(() => {
        setShowDeleteConfirmation(false);
      });
  };

  const canViewFile =
    userPermissions?.find((module) => module.module_name === "Upload Files")
      ?.actions?.read || false;

  const canDeleteFile =
    userPermissions?.find((module) => module.module_name === "Upload Files")
      ?.actions?.delete || false;
  const canUploadFile =
    userPermissions?.find((module) => module.module_name === "Upload Files")
      ?.actions?.write || false;

  const breadcrumbItems = [
    { label: "Upload Files", link: "/file" },
    { label: "Choose File", link: `/file/fileUpload` },
  ];
  const handleModalCancel = () => {
    setShowModal(false);
  };
  if (loading === true) {
    return <Spinner />;
  }
  return (
    <>
      {canViewFile ? (
        <div>
          <div className="breadcrumb-file-upload">
            <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
          </div>
          <div className="file-container">
            <p className="pharmacy-list-head-txt">
              {schemasData?.name} CSV Upload
            </p>
            <p className="file-paragraph">
              The CSV file's default column names can be viewed in the Details
              section for each tile. Additionally, a template file can be
              downloaded from there.
            </p>
            <div className="upload-download-btn-container">
              {canUploadFile && (
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
              )}

              {canViewFile && (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/schema/${schemaID}`}
                >
                  <CustomButton className="ghost-btn">
                    <Image
                      className="down-img"
                      preview={false}
                      src={eyeIcon}
                    ></Image>
                    View Details
                  </CustomButton>
                </Link>
              )}
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
            <p className="table-tile-schema-details">Uploaded List</p>
            <div className="upload-file-table">
              <CustomTable dataSource={listReports} columns={columns} />
            </div>
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
          <ConfirmationModal
            open={showDeleteConfirmation}
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteConfirmation(false)}
            confirmationHeading="Delete File"
            confirmationText="Are you sure you want to delete this record?"
            titleImage={null}
            btnclassName=""
            btnTxt="Delete"
          />
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default File;
