import React, { useState } from "react";
import { Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addFormData,
  removeFormData,
  updateFormDataOrder,
  resetFormDataArray,
  resetId,
} from "../../redux/features/formSlice/formSlice";
import {
  addSchemaData,
  updateSchemaName,
} from "../../redux/features/SchemaSlice/schemaSlice";
import SchemaForm from "../Form/Form";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./style.css";
import { reorderFormDataArray } from "../../Utility Function/reorderFormDataArray";
import EditForm from "../EditForm/EditForm";
import SchemaTable from "../GeneralSchemaTable/SchemaTable";
import { Link } from "react-router-dom";
const Stable = () => {
  const [rowId, setRowId] = useState(1);
  const [editRow, setEditRow] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const schemaName = useSelector((state) => state.schema.schemaName);

  const dispatch = useDispatch();
  const formDataArray = useSelector((state) => state.form.formDataArray);

  function numericToAlphabetic(id) {
    let result = "";
    while (id > 0) {
      const remainder = (id - 1) % 26;
      result = String.fromCharCode(65 + remainder) + result;
      id = Math.floor((id - 1) / 26);
    }
    return result;
  }
  const handleAddRow = (formDataArray) => {
    const numericId = rowId;
    const alphabeticId = numericToAlphabetic(numericId);

    formDataArray.id = alphabeticId;
    dispatch(addFormData(formDataArray));
    setRowId(rowId + 1);
  };

  const handleDelete = (id) => {
    dispatch(removeFormData(id));
  };

  const editFormData = (id) => {
    const rowToEdit = formDataArray.find((entry) => entry.id === id);
    if (rowToEdit) {
      setEditRow(rowToEdit);
      setEditModalVisible(true);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const reorderedData = reorderFormDataArray(
      formDataArray,
      startIndex,
      endIndex
    );
    dispatch(updateFormDataOrder(reorderedData));
  };

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Schema Saved Successfully",
    });
  };

  const handleSaveAndSuccess = () => {
    if (formDataArray.length > 0) {
      const newSchema = {
        name: schemaName,
        data: formDataArray,
      };

      dispatch(addSchemaData(newSchema));
      success();
      dispatch(resetFormDataArray());
      dispatch(updateFormDataOrder([]));
      dispatch(updateSchemaName(newSchema.name));
      dispatch(resetId());
    } else {
      console.error("No rows to save in the schema.");
    }
  };

  const handleEditSubmit = (editedData) => {
    const updatedDataArray = formDataArray.map((entry) =>
      entry.id === editedData.id ? editedData : entry
    );
    dispatch(updateFormDataOrder(updatedDataArray));
    setEditRow(null);
    setEditModalVisible(false);
  };

  return (
    <div className="Stable">
<<<<<<< Updated upstream
      <div className="buttons">
        <SchemaForm className="addrow" onAddRow={handleAddRow} />
=======
<<<<<<< Updated upstream
      <SchemaForm className="addrow" onAddRow={handleAddRow} />
=======
      <div className="buttons">
        <SchemaForm className="addNewEntry" onAddRow={handleAddRow} />
>>>>>>> Stashed changes
        <Link to="/schema">
          <Button
            type="primary"
            className="save-button"
            onClick={handleSaveAndSuccess}
          >
            Save Schema
          </Button>
        </Link>
      </div>

<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="formDataArray">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="Stable"
            >
              <SchemaTable
                data={formDataArray}
                onEdit={() => setEditModalVisible(true)}
                handleDelete={handleDelete}
                editFormData={editFormData}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {contextHolder}
      {editRow && (
        <EditForm
          editRow={editRow}
          onCancel={() => setEditRow(null)}
          onSubmit={handleEditSubmit}
          editModalVisible={editModalVisible}
        />
      )}
    </div>
  );
};

export default Stable;
