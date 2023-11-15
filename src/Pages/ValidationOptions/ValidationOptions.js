import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./VaidationOptions.css";
import { Col, Row, Button, Pagination, Checkbox, Space, Image } from "antd";
import schemaImg from "../../Assets/Schemas.png";
import axios from "axios";
import { addIndex } from "../../redux/features/SchemaSelectionSlice/SchemaSelectionSlice";
import { Link } from "react-router-dom";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import CustomCard from "../../Components/Card/Card";

const ValidationOptions = () => {
  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);
  const [schemas, setSchemas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSchema, setSelectedSchema] = useState();
  const dispatch = useDispatch();
  const localHeader = localStorage.getItem("AuthorizationToken");
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
      })
      .catch((error) => {
        console.error("Error fetching schemas: ", error);
      });
  }, [headers]);

  const schemasPerPage = 3;
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
                  <Col span={6} className="validation-col">
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
                          checked={schema.selected}
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
                total={schemas.length}
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
