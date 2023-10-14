import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SchemaTable from "../GeneralSchemaTable/SchemaTable";
import { DragDropContext } from "react-beautiful-dnd";
import { downloadCSV } from "../../Utility Function/downloadCSV";
import { Button, Modal } from "antd";

import {
  updateSchemaDataOrder,
  removeData,
  updateData,
} from "../../redux/features/SchemaSlice/schemaSlice";

import "./style.css";
import EditForm from "../EditForm/EditForm";

const SchemaDetails = () => {
  const { schemaId } = useParams();
  const dispatch = useDispatch();
  const schemaDataArray = useSelector((state) => state.schema.schemaDataArray);
  const schemaName = useSelector((state) => state.schema.schemaName);
  const schemaData = schemaDataArray[schemaId];

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const reorderedData = Array.from(schemaData.data);
    const [movedItem] = reorderedData.splice(startIndex, 1);
    reorderedData.splice(endIndex, 0, movedItem);
    dispatch(updateSchemaDataOrder({ schemaId, updatedData: reorderedData }));
  };

  const handleEdit = (id) => {
    const dataToEdit = schemaData.data.find((item) => item.id === id);
    setSelectedRow(dataToEdit);
    setEditModalVisible(true);
  };

  const handleEditSubmit = (editedData) => {
    dispatch(updateData(editedData));
    setEditModalVisible(false);
  };

  const handleDelete = (id) => {
    dispatch(removeData(id));
  };

  const handleDownloadCSV = () => {
    downloadCSV(schemaDataArray, schemaName);
  };

  return (
    <div>
      {schemaData ? (
        <div className="table">
          <h3>Schema Name: {schemaData.name}</h3>
          <Button className="csvbtn" type="primary" onClick={handleDownloadCSV}>
            Download CSV
          </Button>
          <DragDropContext onDragEnd={onDragEnd}>
            <SchemaTable
              data={schemaData.data}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </DragDropContext>
        </div>
      ) : (
        <p>Schema not found</p>
      )}

      <Modal
        title="Edit Data"
        open={editModalVisible}
        onOk={() => handleEditSubmit(selectedRow)}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        {selectedRow && (
          <EditForm
            editRow={selectedRow}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditModalVisible(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default SchemaDetails;
