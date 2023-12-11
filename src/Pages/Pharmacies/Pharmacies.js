import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Image,
  Input,
  Row,
  Select,
  Space,
  message,
  Pagination,
} from "antd";
import { Button } from "antd";
import "./Pharmacies.css";
import eyeIcon from "../../Assets/Icon feather-eye.svg";
import deleteActionbtn from "../../Assets/deleteAction.svg";
import FilterIcon from "../../Assets/FilterIcon.svg";
import SearchIcon from "../../Assets/searchIcon.svg";
import plusOutline from "../../Assets/PlusOutlined.svg";
import { Link } from "react-router-dom";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import Spinner from "../../Components/Spinner/Spinner";
import rightArrow from "../../Assets/rightarrow.svg";
import leftArrow from "../../Assets/leftarrow.svg";
import noteBookImg from "../../Assets/notebook.svg";
import SignInFirstModal from "../../Components/SingInFirstModal/SignInFirstModal";
const Pharmacies = () => {
  const [tableDataSource, setTableDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // Set an initial value
  const [totalItems, setTotalItems] = useState(0);
  const [sortField, setSortField] = useState("rent");
  const [sortDirection, setSortDirection] = useState("asc");
  const authToken = localStorage.getItem("AuthorizationToken");
  const [modalVisible, setModalVisible] = useState(!authToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/list-pharmacies?page=${page}&limit=${limit}&sort_field=${sortField}&sort_direction=${sortDirection}`
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

    fetchData();
  }, [page, limit, sortDirection, sortField]);

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

  const handleDelete = async (pharmacyId) => {
    try {
      await axios.delete(
        `${baseURL}/delete-pharmacy?pharmacy_id=${pharmacyId}`
      );
      const updatedData = tableDataSource.filter(
        (item) => item.id !== pharmacyId
      );
      setTableDataSource(updatedData);
      message.success("Record Deleted Successfully");
    } catch (error) {
      console.error("Error deleting pharmacy:", error);
      message.error("Error deleting pharmacy:", error);
    }
  };
  // const CustomSorterTooltip = ({ title }) => (
  //   <Tooltip title={title} overlayStyle={{ marginTop: "8px" }}>
  //     <div>{title}</div>
  //   </Tooltip>
  // );
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
      title: (
        <div>
          Creation date
          {/* <CustomSorterTooltip
            title={`Sort by creation date ${
              sortDirection === "asc" ? "descending" : "ascending"
            }`}
          /> */}
        </div>
      ),
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
        <Col className="gutter-row" span={4}>
          <p className="pharmacy-list-head-txt">Pharmacy list</p>
        </Col>
        <Col span={3.5}>
          <Link to="AddPharmacy">
            <Button title="" type="primary" className="create-pharm-btn">
              <Image
                className="plus-outline-img"
                preview={false}
                src={plusOutline}
              ></Image>
              Create Pharmacy
            </Button>
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
              // value={yourSelectedValue}  {/* Specify the selected value if needed */}
              // onChange={(e) => handleSelectChange(e.target.value)} {/* Add an onChange handler if needed */}
            >
              <option value="">Pharmacy postal code</option>
              <option value="lucy">Lucy</option>
              {/* Add other options as needed */}
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
