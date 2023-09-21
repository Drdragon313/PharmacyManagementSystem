import React, { useState, useEffect, useMemo } from "react";
import { Button, Space, Table, message, Modal, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addFormData,
  removeFormData,
  updateFormDataOrder,
} from "../../redux/features/formSlice/formSlice";
import { addSchemaData } from "../../redux/features/SchemaSlice/schemaSlice";
import SchemaForm from "../Form/Form";
import { MenuOutlined } from "@ant-design/icons";
import "./style.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CustomSelect from "../Select/Select";
import { reorderFormDataArray } from "../../Utility Function/Utility Function/reorderFormDataArray";
import { downloadCSV } from "../../Utility Function/Utility Function/downloadCSV";
import { filterValidationOptions } from "../../Utility Function/Utility Function/validationOptions";

const Stable = () => {
  const [rowId, setRowId] = useState(1);
  const [editRow, setEditRow] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [schemaName, setSchemaName] = useState("");

  const dispatch = useDispatch();
  const formDataArray = useSelector((state) => state.form.formDataArray);

  const handleAddRow = (formDataEntry) => {
    formDataEntry.id = rowId;
    dispatch(addFormData(formDataEntry));
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

  const handleDownloadCSV = () => {
    downloadCSV(formDataArray);
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

      setSchemaName("");
    } else {
      console.error("No rows to save in the schema.");
    }
  };

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
  const EditForm = ({ editRow, onCancel, onSubmit }) => {
    const [form] = Form.useForm();
    const [selectedType, setSelectedType] = useState(editRow?.Type);
    const [filteredValidationOptions, setFilteredValidationOptions] = useState(
      []
    );
    const validationOptions = useMemo(
      () => [
        { value: "CamelCase", label: "Camel Case" },
        { value: "SpecialCharacter", label: "Special Character" },
        { value: "Integer", label: "Integer" },
        { value: "Decimal", label: "Decimal" },
        { value: "Required", label: "Required" },
      ],
      []
    );

    useEffect(() => {
      const filteredValidationOptions = filterValidationOptions(
        selectedType,
        validationOptions
      );
      setFilteredValidationOptions(filteredValidationOptions);
    }, [selectedType, validationOptions]);

    const handleFormSubmit = () => {
      form.validateFields().then((values) => {
        const editedData = {
          ...editRow,
          Fieldname: values.fieldName,
          Type: values.type,
          Validation: values.validation,
        };
        onSubmit(editedData);
        form.resetFields();
      });
    };

    const typeOptions = [
      { value: "string", label: "String" },
      { value: "number", label: "Number" },
      { value: "boolean", label: "Boolean" },
    ];

    return (
      <Modal
        title="Edit Row"
        open={editModalVisible}
        onCancel={() => {
          onCancel();
          setEditModalVisible(false);
        }}
        onOk={handleFormSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="fieldName"
            label="Field Name"
            initialValue={editRow?.Fieldname}
            rules={[{ required: true, message: "Please enter a field name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            initialValue={editRow?.Type}
            rules={[{ required: true, message: "Please select Type" }]}
          >
            <CustomSelect
              options={typeOptions}
              value={selectedType}
              onChange={(value) => {
                setSelectedType(value);
                form.setFieldsValue({ type: value, validation: undefined });
              }}
              placeholder="Select a Type"
            />
          </Form.Item>
          <Form.Item
            name="validation"
            label="Validation"
            initialValue={editRow?.Validation}
            rules={[{ required: true, message: "Please select Validation" }]}
          >
            <CustomSelect
              options={filteredValidationOptions}
              value={editRow?.Validation}
              placeholder="Select a Validation"
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <div className="Stable">
      <SchemaForm className="addrow" onAddRow={handleAddRow} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="formDataArray">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Table
                bordered
                dataSource={formDataArray}
                rowKey="id"
                pagination={false}
                columns={columns}
                className="schemaTable"
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button className="csvbtn" type="primary" onClick={handleDownloadCSV}>
        Download CSV
      </Button>

      <Button type="primary" onClick={handleSaveAndSuccess}>
        Save Schema
      </Button>
      {contextHolder}
      {editRow && (
        <EditForm
          editRow={editRow}
          onCancel={() => setEditRow(null)}
          onSubmit={(editedData) => {
            const updatedDataArray = formDataArray.map((entry) =>
              entry.id === editedData.id ? editedData : entry
            );
            dispatch(updateFormDataOrder(updatedDataArray));
            setEditRow(null);
            setEditModalVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default Stable;
