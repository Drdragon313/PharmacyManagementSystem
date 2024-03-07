import React, { useState } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addFormData,
  removeFormData,
  updateFormDataOrder,
  resetId,
} from "../../redux/features/formSlice/formSlice";

import {
  addSchemaData,
  updateSchemaName,
  resetSchemaDataArray,
} from "../../redux/features/SchemaSlice/schemaSlice";
import SchemaForm from "../Form/Form";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./style.css";
import { reorderFormDataArray } from "../../Utility Function/reorderFormDataArray";
import EditForm from "../EditForm/EditForm";
import SchemaTable from "../GeneralSchemaTable/SchemaTable";
import { useNavigate } from "react-router-dom";
import { numericToAlphabetic } from "../../Utility Function/numericToAlphabetic";
import {
  saveSchema,
  updateFormDataArrayOnEdit,
} from "../../Utility Function/stableUtil";
import CustomButton from "../CustomButton/CustomButton";
const Stable = () => {
  const tilePath = localStorage.getItem("tilePath");
  const [rowId, setRowId] = useState(1);
  const [editRow, setEditRow] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const schemaName = useSelector((state) => state.schema.schemaName);
  const dispatch = useDispatch();
  const formDataArray = useSelector((state) => state.form.formDataArray);
  const navigate = useNavigate();
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
  const handleSaveAndSuccess = async () => {
    saveSchema(schemaName, formDataArray, tilePath, dispatch, (newSchema) => {
      success();
      dispatch(addSchemaData(newSchema));
      dispatch(resetSchemaDataArray(newSchema));
      dispatch(updateFormDataOrder([]));
      dispatch(updateSchemaName(newSchema.name));
      dispatch(resetId());
      window.location.reload();
    });
    navigate("/tilepage");
  };
  const handleEditSubmit = (editedData) => {
    const updatedDataArray = updateFormDataArrayOnEdit(
      formDataArray,
      editedData
    );
    dispatch(updateFormDataOrder(updatedDataArray));
    setEditRow(null);
    setEditModalVisible(false);
  };
  return (
    <div className="Stable">
      <div className="buttons">
        <SchemaForm className="addrow" onAddRow={handleAddRow} />
        <div>
          <CustomButton type="primary" onClick={handleSaveAndSuccess}>
            Save Schema
          </CustomButton>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="formDataArray">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
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
