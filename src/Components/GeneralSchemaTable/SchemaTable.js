import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Table, Button, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { numericToAlphabetic } from "../../Utility Function/numericToAlphabetic";
import MoveRowModal from "../MoveRowModal/MoveRowModal";
import { updateFormDataOrder } from "../../redux/features/formSlice/formSlice";
import { moveRow } from "../../Utility Function/moveRow";

const SchemaTable = ({ data, handleDelete, editFormData }) => {
  const dispatch = useDispatch();
  const [moveRowModalVisible, setMoveRowModalVisible] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const columns = [
    {
      title: "",
      width: "5%",
      render: (_, record, index) => (
        <Draggable draggableId={record.id.toString()} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <MenuOutlined />
            </div>
          )}
        </Draggable>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      width: "5%",
      render: (id) => numericToAlphabetic(id),
    },
    {
      title: "Field Name",
      dataIndex: "Fieldname",
      width: "30%",
    },
    {
      title: "Type",
      dataIndex: "Type",
      width: "30%",
    },
    {
      title: "Validation",
      dataIndex: "Validation",
      width: "30%",
    },
    {
      title: "Operations",
      dataIndex: "id",
      render: (id) => (
        <Space size={10}>
          <Button onClick={() => handleDelete(id)}>Delete</Button>
          <Button onClick={() => editFormData(id)}>Edit</Button>
          <Button onClick={() => handleMoveRow(id)}>...</Button>
        </Space>
      ),
    },
  ];

  const handleMoveRow = (id) => {
    setSelectedRowId(id);
    setMoveRowModalVisible(true);
  };

  const onMoveRowOk = (moveToId) => {
    moveRow(selectedRowId, moveToId, data, dispatch, updateFormDataOrder);
    setMoveRowModalVisible(false);
  };

  return (
    <div>
      <Droppable droppableId="data">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Table
              dataSource={data}
              pagination={{
                pageSize: 5,
              }}
              bordered
              columns={columns}
            />
            <MoveRowModal
              visible={moveRowModalVisible}
              onCancel={() => setMoveRowModalVisible(false)}
              onOk={onMoveRowOk}
              data={data}
            />
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default SchemaTable;
