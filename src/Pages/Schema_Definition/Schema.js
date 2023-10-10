import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Schema.css";
import { Button, Space, Pagination } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SchemaCard from "../../Components/Card/SchemaCard";
import SelectionModal from "../../Components/CreateSchemaSelectionModal/SelectionModal";

const ITEMS_PER_PAGE = 8;
const CARDS_PER_ROW = 4;

const Schema = () => {
  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);
  const [isSelectionModalVisible, setSelectionModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleCreateModal = () => {
    setSelectionModalVisible(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderSchemaCards = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    if (schemaDataArray.length === 0) {
      return <h4 className="no-schemastxt">No schemas available</h4>;
    }

    return schemaDataArray
      .slice(startIndex, endIndex)
      .map((schema, index) => (
        <SchemaCard
          className="card"
          title={schema}
          schema={schema}
          index={index}
          bordered={true}
          span={6}
          key={index}
        />
      ));
  };

  const renderSchemaRows = () => {
    const schemaCards = renderSchemaCards();
    const schemaRows = [];

    for (let i = 0; i < schemaCards.length; i += CARDS_PER_ROW) {
      schemaRows.push(
        <Space span={10} direction="horizontal" key={i}>
          {schemaCards.slice(i, i + CARDS_PER_ROW)}
        </Space>
      );
    }

    return schemaRows;
  };

  return (
    <div className="content">
      <div className="title">
        <h5>Schema Definition</h5>
        <p>
          Schemas can be defined here by adding data using different available
          methods. These schemas will be matched against any data you import
          into the system
        </p>
      </div>
      <h5 className="AvailSchemastxt">Available Schemas</h5>
      <div className="schema-container">
        {schemaDataArray.length > 0 ? (
          renderSchemaRows()
        ) : (
          <h4 className="no-schemastxt">No schemas available</h4>
        )}
      </div>
      {schemaDataArray.length > 0 && (
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={schemaDataArray.length}
            pageSize={ITEMS_PER_PAGE}
            onChange={handlePageChange}
          />
        </div>
      )}
      <div className="addNewSchema">
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
