import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./VaidationOptions.css";
import {
  Col,
  Row,
  Button,
  Pagination,
  Checkbox,
  Space,
  Image,
  Spin,
  Avatar,
} from "antd";
import schemaImg from "../../Assets/schemaImg.svg";
import axios from "axios";
import { addIndex } from "../../redux/features/SchemaSelectionSlice/SchemaSelectionSlice";
import { Link } from "react-router-dom";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import CustomCard from "../../Components/Card/Card";
import SignInFirstModal from "../../Components/SingInFirstModal/SignInFirstModal";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
const ValidationOptions = () => {
  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);
  const [schemas, setSchemas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSchema, setSelectedSchema] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const localHeader = localStorage.getItem("AuthorizationToken");

  const [modalVisible, setModalVisible] = useState(!localHeader);

  const headers = useMemo(() => {
    return {
      Authorization: localHeader,
    };
  }, [localHeader]);

  useEffect(() => {
    axios
      .get(`${baseURL}/schema/get-all-schema`, { headers })
      .then((response) => {
        const schemaData = response.data.data.published;
        setSchemas(schemaData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching schemas: ", error);
        setLoading(false);
      });
  }, [headers]);

  useEffect(() => {
    if (schemaDataArray.length === 1) {
      dispatch(addIndex(0));
    }
  }, [schemaDataArray, dispatch]);

  const handleSelect = (index) => {
    setSelectedSchema((prevSelectedSchema) =>
      prevSelectedSchema === index ? null : index
    );
    dispatch(addIndex(index));
    const updatedSchemas = schemas.map((schema, i) => ({
      ...schema,
      selected: i === index,
    }));

    setSchemas(updatedSchemas);

    const selectedSchemaId = updatedSchemas[index].schema_id;
    localStorage.setItem("selectedSchemaID", selectedSchemaId);

    axios
      .get(`${baseURL}/schema/get-all-schema?schema_id=${selectedSchemaId}`, {
        headers,
      })
      .then((response) => {
        const schemaData = response.data.schema.schemaDataArray[0].data;
        localStorage.setItem("selectedSchemaData", JSON.stringify(schemaData));
      })
      .catch((error) => {
        console.error("Error fetching selected schema data: ", error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (!localHeader) {
    const openModal = () => {
      setModalVisible(true);
    };
    return <SignInFirstModal visible={modalVisible} open={openModal} />;
  }

  const breadcrumbItems = [{ label: "Available Schemas", link: "/file" }];
  return (
    <div className="Validation-container">
      <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
      <h2>Upload File</h2>
      <p className="Validation-paragraph">
        Default tiles for Pharmlytics are below. An example schema can be viewed
        from below.
      </p>
      <div className="Options-container">
        {loading ? (
          <div className="loader">
            <Spin size={"large"}></Spin>
            loading...
          </div>
        ) : (
          <div className="Options-containerElements">
            <h6>
              Select the schema with which you want to validate this file's data
              with.
            </h6>
            <p className="Validation-paragraph">Available Schemas:</p>
            <Row gutter={16}>
              {schemas.map((schema, index) => (
                <Col span={6} className="validation-col" key={index}>
                  <CustomCard
                    className="schema-file-upload-cards"
                    bordered={true}
                    onCheckboxChange={handleSelect}
                  >
                    <div className="dropdown">
                      <Checkbox
                        className="checkbox"
                        onChange={() => handleSelect(index)}
                        checked={schema.selected}
                      />
                    </div>
                    <div className="schema-file-upload-content">
                      <Space
                        direction="vertical"
                        size={8}
                        className="schema-content"
                      >
                        <Image
                          className="schema-file-upload-img"
                          preview={false}
                          src={schemaImg}
                        ></Image>

                        <h5 className="schema-file-upload-name">
                          {" "}
                          {schema.schema_name}
                        </h5>
                        <Link to={`/schema/${schema.schema_id}`}>
                          <Button type="link">View Details</Button>
                        </Link>
                      </Space>

                      <div></div>
                      {/* <Image
                        className="schema-img"
                        preview={false}
                        src={schemaImg}
                      ></Image>
                      <h5 className="tile-name" style={{ color: "#000" }}>
                        {schema.schema_name}
                      </h5> */}
                    </div>
                  </CustomCard>
                </Col>
              ))}
            </Row>
            <Pagination
              current={currentPage}
              total={schemas.length}
              pageSize={3}
              onChange={handlePageChange}
              className="options-pagination"
            />
          </div>
        )}
        <div className="Validation-buttoncontainer">
          {schemas.length !== 0 ? (
            selectedSchema !== null ? (
              <Link to="fileUpload">
                <Button className="Validation-button">Next</Button>
              </Link>
            ) : (
              <CustomButton
                disabled={true}
                className="Validation-button-disabled"
              >
                Next
              </CustomButton>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ValidationOptions;
