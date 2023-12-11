import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Image, Row, Space, message, Pagination, Modal } from "antd";
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
const Pharmacies = () => {
  const [tableDataSource, setTableDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [pharmacyToDeleteId, setPharmacyToDeleteId] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [sortField, setSortField] = useState("rent");
  const [sortDirection, setSortDirection] = useState("asc");
  const [availablePostalCodes, setAvailablePostalCodes] = useState([]);
  const authToken = localStorage.getItem("AuthorizationToken");
  const [modalVisible, setModalVisible] = useState(!authToken);
  const [selectedPostalCode, setSelectedPostalCode] = useState("");

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
      try {
        const response = await axios.get(
          `${baseURL}/list-pharmacies?page=${page}&limit=${limit}&post_code=${selectedPostalCode}&sort_field=${sortField}&sort_direction=${sortDirection}`
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
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: "Action(s)",
      width: 150,
      fixed: "right",
      render: (text, record) => (
        <Space className="action-btns">
          <Link to={`/pharmacies/${record.id}`}>
            <Image preview={false} src={eyeIcon}></Image>
          </Link>
          <Image
            preview={false}
            src={deleteActionbtn}
            onClick={() => handleDelete(record.id)}
          ></Image>
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
  return (
    <div className="main-container-pharmacies" style={{ margin: "10px" }}>
      <Row
        className="pharmacy-list-breadcrumb"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={4}>
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
        <Modal
          title="Confirm Delete"
          open={deleteModalVisible}
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          okText="Yes"
          cancelText="Cancel"
        >
          Are you sure you want to delete this pharmacy?
        </Modal>

        <Col className="gutter-row" span={4}>
          <p className="pharmacy-list-head-txt">Pharmacy list</p>
        </Col>
        <Col span={3.5}>
          <Link to="AddPharmacy">
            <CustomButton title="" type="primary">
              <Image
                className="plus-outline-img"
                preview={false}
                src={plusOutline}
              ></Image>
              Create Pharmacy
            </CustomButton>
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
          <div className="custom-select-container">
            <select
              className="filter-pharm-btn"
              value={selectedPostalCode}
              onChange={(e) => setSelectedPostalCode(e.target.value)}
              defaultValue="" // Set defaultValue to an empty string
            >
              <option value="" disabled>
                Pharmacy postal code
              </option>
              {availablePostalCodes.map((postalCode) => (
                <option
                  className="select-options"
                  key={postalCode}
                  value={postalCode}
                >
                  {postalCode}
                </option>
              ))}
            </select>
          </div>
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
          <Row className="pharm-table-footer" gutter={4}>
            <Col span={4}>
              <Space style={{ paddingTop: "7px" }} direction="horizontal">
                <p>Show per page</p>
                <select
                  className="items-per-page-dropdown"
                  value={limit}
                  onChange={(e) => handleLimitChange(e.target.value)}
                >
                  {[2, 5, 10].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </Space>
            </Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={8} style={{ paddingLeft: "40px" }}>
              <Space direction="horizontal">
                Showing
                <p style={{ marginTop: "15px" }}>{page}</p>-
                <p style={{ marginTop: "15px" }}>
                  {Math.ceil(totalItems / limit)}
                </p>
                of
                <p style={{ marginTop: "15px" }}>{totalItems}</p>
                <Pagination
                  itemRender={itemRender}
                  current={page}
                  pageSize={limit}
                  total={totalItems}
                  onChange={handlePageChange}
                  size="small"
                />
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Pharmacies;
