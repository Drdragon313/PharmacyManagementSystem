import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./Schema.css";
import { Button, Space } from "antd";
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
    <div className="content">
      <div className="title">
        <h4>Schema Definition</h4>
        <p>
          Schemas can be defined here by adding data using different available
          methods. These schemas will be matched against any data you import
          into the system
        </p>
      </div>
      <h4 className="AvailSchemastxt">Available Schemas</h4>
      <div className="schema-container">
        {schemaDataArray.length === 0 ? (
          <div>
            <h4 className="no-schemastxt">No schemas available</h4>
          </div>
        ) : (
          schemaDataArray.map((schema, index) => (
            <Space span={10} direction="horizontal" key={index}>
              <SchemaCard
                className="card"
                title={schema}
                schema={schema}
                index={index}
                bordered={true}
                span={6}
              ></SchemaCard>
            </Space>
          ))
        )}
      </div>
      <div className="addNewSchema">
        <h2>Add Schema</h2>

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
    </div>
  );
};

export default Schema;
