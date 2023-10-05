import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./VaidationOptions.css";
import CustomCard from "../../Components/Card/Card";
import { Col, Image, Row, Space, Checkbox, Button, Pagination } from "antd";
import schemaImg from "../../Assets/Schemas.png";
import { addIndex } from "../../redux/features/SchemaSelectionSlice/SchemaSelectionSlice";
import { Link } from "react-router-dom";

const ValidationOptions = () => {
  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);

  const dispatch = useDispatch();

  const [selectedSchema, setSelectedSchema] = useState(
    schemaDataArray.length === 1 ? 0 : null
  );
  const [currentPage, setCurrentPage] = useState(1);
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
  };
  const startIndex = (currentPage - 1) * schemasPerPage;
  const endIndex = startIndex + schemasPerPage;
  const displayedSchemas = schemaDataArray.slice(startIndex, endIndex);

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
          {schemaDataArray.length !== 0 ? (
            <div>
              <h5>
                Select the schema with which you want to validate this file's
                data with.
              </h5>

              <p className="Validation-paragraph">Available Schemas:</p>

              <Row gutter={16}>
                {displayedSchemas.map((schema, index) => (
                  <Col span={6} key={index} className="validation-col">
                    <CustomCard bordered={true} className="optionsCustomCard">
                      <Image
                        className="Validation-Img"
                        src={schemaImg}
                        preview={false}
                      ></Image>
                      <Checkbox
                        className="Validation-Schemacheckbox"
                        onChange={() => handleSelect(index)}
                        checked={index === selectedSchema}
                      />
                      <h6> {schema.name}</h6>
                      <Space size={44}>
                        <p>No. of Fields: {schema.data.length}</p>
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
          {schemaDataArray.length !== 0 ? (
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
