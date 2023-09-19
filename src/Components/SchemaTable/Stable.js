import React, { useState, useEffect,useMemo } from "react";
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

const Stable = () => {
  const [rowId, setRowId] = useState(1);
  const [editRow, setEditRow] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

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

    const reorderedData = Array.from(formDataArray);
    const [removed] = reorderedData.splice(startIndex, 1);
    reorderedData.splice(endIndex, 0, removed);

    dispatch(updateFormDataOrder(reorderedData));
  };

  const downloadCSV = () => {
    const fieldNames = formDataArray.map((entry) => entry.Fieldname);
    const csvContent = fieldNames.join(",") + "\n";
    const encodedCSV = encodeURIComponent(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", `data:text/csv;charset=utf-8,${encodedCSV}`);
    link.setAttribute("download", "field_names.csv");
    document.body.appendChild(link);
    link.click();
  };

  const saveSchema = () => {
    const newSchema = {
      name: "Schema Name",
      data: formDataArray,
    };

    dispatch(addSchemaData(newSchema));
  };

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Schema Saved Successfully",
    });
  };

  const handleSaveAndSuccess = () => {
    saveSchema();
    success();
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
    const validationOptions =useMemo(() => [ 
      { value: "ValidationOption1", label: "Validation Option 1" },
      { value: "ValidationOption2", label: "Validation Option 2" },
      { value: "ValidationOption3", label: "Validation Option 3" },
      { value: "ValidationOption4", label: "Validation Option 4" },
      { value: "ValidationOption5", label: "Validation Option 5" },
      { value: "ValidationOption6", label: "Validation Option 6" },
    ], []);



    useEffect(() => {
      if (selectedType === "string") {
        setFilteredValidationOptions(
          validationOptions.filter(
            (option) =>
              option.value === "ValidationOption1" ||
              option.value === "ValidationOption2"
          )
        );
      } else if (selectedType === "number") {
        setFilteredValidationOptions(
          validationOptions.filter(
            (option) =>
              option.value === "ValidationOption3" ||
              option.value === "ValidationOption4"
          )
        );
      } else if (selectedType === "boolean") {
        setFilteredValidationOptions(
          validationOptions.filter(
            (option) =>
              option.value === "ValidationOption5" ||
              option.value === "ValidationOption6"
          )
        );
      } else {
        setFilteredValidationOptions(validationOptions);
      }
    }, [selectedType,validationOptions]);

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
                style={{ margin: "20px" }}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button className="csvbtn" type="primary" onClick={downloadCSV}>
        Download CSV
      </Button>
      {contextHolder}
      <Button type="primary" onClick={handleSaveAndSuccess}>
        Save Schema
      </Button>

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
