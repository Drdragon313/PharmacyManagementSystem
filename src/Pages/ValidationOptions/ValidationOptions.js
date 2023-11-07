import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./VaidationOptions.css";
import { Col, Row, Button, Pagination, Space, Image, Checkbox } from "antd";
import axios from "axios";
import { addIndex } from "../../redux/features/SchemaSelectionSlice/SchemaSelectionSlice";
import { Link } from "react-router-dom";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import CustomCard from "../../Components/Card/Card";
import schemaImg from "../../Assets/Schemas.png";

const ValidationOptions = () => {
  const [schemaData, setSchemaData] = useState();

  useEffect(() => {
    const localHeader = localStorage.getItem("AuthorizationToken");
    const headers = {
      Authorization: localHeader,
    };
    axios
      .get(`${baseURL}/schema/get-all-schema`, { headers })
      .then((response) => {
        console.log("inside then", response.data.data);
        setSchemaData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        message.error("There was an issue while fetching the schemas!", 3);
      });
  }, []);
  useEffect(() => {
    console.log("This is data from APi", schemaData);
  }, [schemaData]);

  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);
  const [schemas, setSchemas] = useState([]);
  const dispatch = useDispatch();
  const localHeader = localStorage.getItem("AuthorizationToken");
  const headers = {
    Authorization: localHeader,
  };
  useEffect(() => {
    axios
      .get(`${baseURL}/schema/get-all-schema`, { headers })
      .then((response) => {
        console.log("Received data:", response.data);

        const schemaData = response.data.data.temporary;
        console.log("Schema Data:", schemaData);

        setSchemas(schemaData);
      })
      .catch((error) => {
        console.error("Error fetching schemas: ", error);
      });
  }, []);
  const [selectedSchema, setSelectedSchema] = useState(
    schemas.length === 1 ? 0 : null
  );
  console.log("schemas for useState", schemas);
  const [currentPage, setCurrentPage] = useState(1);
  const schemasPerPage = 3;
  useEffect(() => {
    if (schemas.length === 1) {
      dispatch(addIndex(0));
    }
  }, [schemas, dispatch]);

  const handleSelect = (index) => {
    setSelectedSchema((prevSelectedSchema) =>
      prevSelectedSchema === index ? null : index
    );
    dispatch(addIndex(index));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="Validation-container">
      <h2>Files and Assets</h2>
      <p className="Validation-paragraph">
        Documents and Attachments that have been uploaded will be validated with
        the already defined selected schema in order to upload to the database.
      </p>
      <div className="Options-container">
        <div className="Options-containerElements">
          {schemas.length !== 0 ? (
            <div>
              <h5>
                Select the schema with which you want to validate this file's
                data with.
              </h5>

              <p className="Validation-paragraph">Available Schemas:</p>

              <Row gutter={16}>
                {schemas.map((schema, index) => (
                  <Col span={6} className="validation-col" key={index}>
                    <CustomCard
                      className="schemacards"
                      key={index}
                      bordered={true}
                      onCheckboxChange={handleSelect}
                    >
                      <div className="dropdown">
                        <Checkbox
                          className="checkbox"
                          onChange={() => handleSelect(index)}
                        />
                      </div>
                      <Space
                        className="schema-content"
                        direction="vertical"
                        size={5}
                      >
                        <Image preview={false} src={schemaImg}></Image>

                        <h5 className="tile-name">{schema.schema_name}</h5>
                        <h6 className="tile-name">
                          Tile Path: {schema.tile_path}
                        </h6>
                      </Space>
                    </CustomCard>
                  </Col>
                ))}
              </Row>
              <Pagination
                current={currentPage}
                total={schemaDataArray.length}
                pageSize={schemasPerPage}
                onChange={handlePageChange}
                className="options-pagination"
              />
            </div>
          ) : (
            <div className="zeroSchemas">
              <h5>No Available Schemas</h5>
            </div>
          )}
        </div>
        <div className="Validation-buttoncontainer">
          {schemas.length !== 0 ? (
            selectedSchema !== null ? (
              <Link to="fileUpload">
                <Button className="Validation-button">Next</Button>
              </Link>
            ) : (
              <Button disabled={true} className="Validation-button-disabled">
                Next
              </Button>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ValidationOptions;
