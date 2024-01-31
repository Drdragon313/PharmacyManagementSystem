import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Image, Row, Select, Space, message } from "antd";
import "./Pharmacies.css";
import eyeIcon from "../../Assets/Icon feather-eye.svg";
import deleteActionbtn from "../../Assets/deleteAction.svg";
import plusOutline from "../../Assets/PlusOutlined.svg";
import { Link } from "react-router-dom";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import Spinner from "../../Components/Spinner/Spinner";
import rightArrow from "../../Assets/rightarrow.svg";
import leftArrow from "../../Assets/leftarrow.svg";
import SignInFirstModal from "../../Components/SingInFirstModal/SignInFirstModal";
import CustomButton from "../../Components/CustomButton/CustomButton";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";
import editIcon from "../../Assets/editInBlue.svg";
import PaginationComponent from "../../Components/PaginationComponent/PaginationComponent";
import bookImg from "../../Assets/notebook.svg";
import { fetchUserPermissions } from "../../Utility Function/ModulesAndPermissions";

const Pharmacies = () => {
  const [tableDataSource, setTableDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [pharmacyToDeleteId, setPharmacyToDeleteId] = useState(null);
  const [userPermissions, setUserPermissions] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [sortField, setSortField] = useState("rent");
  const [sortDirection, setSortDirection] = useState("asc");
  const [availablePostalCodes, setAvailablePostalCodes] = useState([]);
  const authToken = localStorage.getItem("AuthorizationToken");
  const [modalVisible, setModalVisible] = useState(!authToken);
  const [selectedPostalCode, setSelectedPostalCode] = useState([]);

  useEffect(() => {
    const fetchPostalCodes = async () => {
      try {
        const response = await axios.get(`${baseURL}/list-available-postcodes`);
        const postCodeData = response.data;
        console.log(postCodeData);

        if (postCodeData && postCodeData.postCodes) {
          setAvailablePostalCodes(postCodeData.postCodes);
        }
      } catch (error) {
        console.error("Error fetching postal codes:", error);
      }
    };

    const fetchData = async () => {
      const authToken = localStorage.getItem("AuthorizationToken");
      const headers = {
        Authorization: authToken,
      };
      try {
        const response = await axios.get(
          `${baseURL}/list-pharmacies?page=${page}&limit=${limit}&post_code=${selectedPostalCode}&sort_field=${sortField}&sort_direction=${sortDirection}`,
          { headers }
        );
        const data = response.data;

        if (data && data.data) {
          setTableDataSource(data.data);
          setTotalItems(data.totalItems);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostalCodes();
    fetchData();
  }, [page, limit, sortDirection, sortField, selectedPostalCode]);
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
  const showDeleteModal = (pharmacyId) => {
    setDeleteModalVisible(true);
    setPharmacyToDeleteId(pharmacyId);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };
  const handleSelectedPostalCodeChange = (values) => {
    setSelectedPostalCode(values);
    setPage(1);
  };

  const handleSortChange = (columnKey, order) => {
    setSortField(columnKey);
    setSortDirection((prevSortDirection) =>
      columnKey === sortField
        ? prevSortDirection === "asc"
          ? "desc"
          : "asc"
        : "asc"
    );
    setPage(page);
  };

  const handleDelete = (pharmacyId) => {
    showDeleteModal(pharmacyId);
  };
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${baseURL}/delete-pharmacy?pharmacy_id=${pharmacyToDeleteId}`
      );
      const updatedData = tableDataSource.filter(
        (item) => item.id !== pharmacyToDeleteId
      );
      setTableDataSource(updatedData);
      message.success("Record Deleted Successfully");
    } catch (error) {
      console.error("Error deleting pharmacy:", error);
      message.error("Error deleting pharmacy:", error);
    } finally {
      setDeleteModalVisible(false);
    }
  };
  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const canCreatePharmacy =
    userPermissions?.find((module) => module.module_name === "Pharmacy")
      ?.actions?.write || false;
  const canDeletePharmacy =
    userPermissions?.find((module) => module.module_name === "Pharmacy")
      ?.actions?.delete || false;
  const canEditPharmacy =
    userPermissions?.find((module) => module.module_name === "Pharmacy")
      ?.actions?.update || false;
  if (!authToken) {
    const openModal = () => {
      setModalVisible(true);
    };
    return <SignInFirstModal visible={modalVisible} open={openModal} />;
  }

  const tableColumns = [
    {
      title: "Pharmacy Name",
      dataIndex: "pharmacyName",
      key: "pharmacyName",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: <div>Creation date</div>,
      dataIndex: "dateOfCreation",
      key: "dateOfCreation",
      sorter: true,
      showSorterTooltip: false,
      sortOrder: sortField === "dateOfCreation" && sortDirection,
      onHeaderCell: (column) => ({
        onClick: () => handleSortChange(column.dataIndex, column.order),
      }),
    },

    {
      title: "Rent",
      dataIndex: "rent",
      key: "rent",
      sorter: true,
      showSorterTooltip: false,
      sortOrder: sortField === "rent" && sortDirection,
      onHeaderCell: (column) => ({
        onClick: () => handleSortChange(column.dataIndex, column.order),
      }),
    },
    {
      title: "Number of Employees",
      dataIndex: "numberOfEmployees",
      key: "numberOfEmployees",
      sorter: true,
      showSorterTooltip: false,
      sortOrder: sortField === "numberOfEmployees" && sortDirection,
      onHeaderCell: (column) => ({
        onClick: () => handleSortChange(column.dataIndex, column.order),
      }),
      width: 200,
    },
    {
      title: "Manager",
      dataIndex: "managerName",
      key: "managerName",
    },
    {
      title: "Action(s)",
      width: 150,
      fixed: "right",
      render: (text, record) => (
        <Space className="action-btns">
          <Link to={`/pharmacies/${record.id}/pharmacydetails`}>
            <Image preview={false} src={eyeIcon}></Image>
          </Link>
          {canEditPharmacy && (
            <Link to={`/pharmacies/${record.id}/pharmacyedit`}>
              <Image preview={false} src={editIcon}></Image>
            </Link>
          )}
          {canDeletePharmacy && (
            <Image
              preview={false}
              src={deleteActionbtn}
              onClick={() => handleDelete(record.id)}
            ></Image>
          )}{" "}
        </Space>
      ),
    },
  ];

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <Image
          preview={false}
          src={leftArrow}
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        ></Image>
      );
    }
    if (type === "next") {
      return (
        <Image
          preview={false}
          src={rightArrow}
          disabled={page * limit >= totalItems}
          onClick={() => handlePageChange(page + 1)}
        ></Image>
      );
    }
    return originalElement;
  };

  const breadcrumbItems = [{ label: "Pharmacy", link: "/pharmacies" }];
  if (loading === true) {
    return <Spinner />;
  }

  if (!authToken) {
    const openModal = () => {
      setModalVisible(true);
    };
    return <SignInFirstModal visible={modalVisible} open={openModal} />;
  }

  const placeholderSelect = () => {
    return (
      <div className="placeholder-for-select-postcodes">
        <div>
          <Image className="filter-icon" src={bookImg} preview={false} />
          <span> Select Postcode</span>
        </div>
      </div>
    );
  };

  return (
    <div className="main-container-pharmacies">
      <Row
        className="pharmacy-list-breadcrumb"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="breadcrumb-border" span={24}>
          <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
        </Col>
      </Row>
      <Row
        className="pharmacy-list-head"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <ConfirmationModal
          title="Confirm Delete"
          open={deleteModalVisible}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmationHeading="Delete pharmacy"
          confirmationText="Are you sure you want to delete this pharmacy? This action cannot be undone."
          btnTxt="Delete"
          cancelText="Cancel"
          btnclassName="delete-btn-modal"
        >
          Are you sure you want to delete this pharmacy?
        </ConfirmationModal>

        <Col className="gutter-row" span={4}>
          <p className="pharmacy-list-head-txt">Pharmacy list</p>
        </Col>
        <Col span={3.5}>
          <Link to="AddPharmacy">
            {canCreatePharmacy && (
              <CustomButton type="primary">
                <Image
                  className="plus-outline-img"
                  preview={false}
                  src={plusOutline}
                ></Image>
                Create Pharmacy
              </CustomButton>
            )}
          </Link>
        </Col>
      </Row>
      <Row
        className="pharmacy-list-search-filter-container"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={8}></Col>
        <Col className="filter-container-pharm" span={3.5}>
          <Select
            allowClear={true}
            className="filter-pharm-btn"
            mode="multiple"
            value={selectedPostalCode}
            onChange={handleSelectedPostalCodeChange}
            placeholder={placeholderSelect()}
            showSearch={false}
            optionLabelProp="label"
          >
            {availablePostalCodes.map((postalCode) => (
              <Select.Option
                className="select-options"
                key={postalCode}
                value={postalCode}
                label={postalCode}
              >
                {postalCode}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row
        className=""
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="table-row" span={24}>
          <CustomTable
            className="pharmacy-details-table"
            dataSource={tableDataSource}
            footer={false}
            columns={tableColumns.map((column) => ({
              ...column,
              title: (
                <span className="custom-table-header">{column.title}</span>
              ),
              render: (text, record) => (
                <span className="custom-table-content">
                  {typeof column.render === "function"
                    ? column.render(text, record)
                    : text}
                </span>
              ),
            }))}
          />
          <PaginationComponent
            limit={limit}
            handleLimitChange={handleLimitChange}
            page={page}
            totalItems={totalItems}
            handlePageChange={handlePageChange}
            itemRender={itemRender}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Pharmacies;
