import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeSchemaData } from "../../redux/features/SchemaSlice/schemaSlice";
import CustomCard from "../../Components/Card/Card";
import "./Schema.css";
import { Button, Col, Image, Row, Space } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import schemaImg from "../../Assets/Schemas.png";

const Schema = () => {
  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);
  const dispatch = useDispatch();

  const handleRemoveSchema = (indexToRemove) => {
    dispatch(removeSchemaData(indexToRemove));
  };

  return (
    <>
      <div className="title">
        <h2>Schema Definition</h2>
        <h6>
          Schemas can be defined here by adding data using different availible
          methods. These schemas will be matched against any data you import
          into the system
        </h6>
      </div>
      <div className="availibleSchemas">
        <h4>Available Schemas</h4>
        <Row gutter={16}>
          {schemaDataArray.map((schema, index) => (
            <Col span={6} key={index}>
              <CustomCard bordered={true} span={6}>
                <Image
                  className="schemaImg"
                  src={schemaImg}
                  preview={false}
                ></Image>
                <p className="schemaName">{`Schema ${index + 1}`}</p>
                <Space size={44}>
                <p>No. of Fields:</p>
                <p>No. of Types:</p>
                </Space>
                

                <Space size={10} className="availableSchemasBtn">
                  <Link to={`/schema/${index}`}>
                    {" "}
                    <Button>View Details</Button>{" "}
                  </Link>
                  <Button onClick={() => handleRemoveSchema(index)}>
                    Remove Schema
                  </Button>
                </Space>
              </CustomCard>
            </Col>
          ))}
        </Row>
      </div>
      <div className="addNewSchema">
        <h2>Add Schema</h2>
        <h6>Create New Schema</h6>
        <Link to="/customschema">
          <Button
            style={{ background: "#01A4EC", color: "#fff" }}
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
          />
          <Button
            type="link"
            style={{ fontWeight: "bolder", color: "#01A4EC" }}
          >
            Create New Schema
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Schema;
