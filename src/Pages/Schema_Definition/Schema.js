import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./Schema.css";
import { Button, Col, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SchemaCard from "../../Components/Card/SchemaCard";
import SelectionModal from "../../Components/CreateSchemaSelectionModal/SelectionModal";

const Schema = () => {
  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);
  const [isSelectionModalVisible, setSelectionModalVisible] = useState(false);

  const toggleCreateModal = () => {
    setSelectionModalVisible(true);
    console.log(isSelectionModalVisible);
  };
  return (
    <>
      <div className="title">
        <h2>Schema Definition</h2>
        <h6>
          Schemas can be defined here by adding data using different available
          methods. These schemas will be matched against any data you import
          into the system
        </h6>
      </div>

      <div className="availableSchemas">
        <h4 className="AvailSchemastxt">Available Schemas</h4>

        <Row gutter={16} className="SchemaRow">
          {schemaDataArray.map((schema, index) => (
            <Col span={6} key={index}>
              <SchemaCard
                className="card"
                key={index}
                title={schema}
                schema={schema}
                index={index}
                bordered={true}
                span={6}
              ></SchemaCard>
            </Col>
          ))}
        </Row>
      </div>
      <div className="addNewSchema">
        <h2>Add Schema</h2>
        <h6>Create New Schema</h6>

        <Button
          className="circlebtn"
          onClick={toggleCreateModal}
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
        />
        <Button type="link" className="linkbtn">
          Create New Schema
        </Button>
        <SelectionModal
          visible={isSelectionModalVisible}
          setSelectionModalVisible={setSelectionModalVisible}
        />
      </div>
    </>
  );
};

export default Schema;
