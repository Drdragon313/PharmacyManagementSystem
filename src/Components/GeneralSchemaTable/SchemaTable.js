import React from "react";
import { Table, Button, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { numericToAlphabetic } from "../../Utility Function/numericToAlphabetic";

const SchemaTable = ({ data, handleDelete, editFormData }) => {
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
      title: "Operation",
      dataIndex: "id",
      render: (id) => (
        <Space size={10}>
          <Button onClick={() => handleDelete(id)}>Delete</Button>
          <Button onClick={() => editFormData(id)}>Edit</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Droppable droppableId="data">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Table
              dataSource={data}
              pagination={true}
              bordered
              columns={columns}
            />
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default SchemaTable;
