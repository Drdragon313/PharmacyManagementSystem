import React, { useState } from "react";
import { Modal, Form, Select } from "antd";
import { numericToAlphabetic } from "../../Utility Function/numericToAlphabetic";
const { Option } = Select;

const MoveRowModal = ({ visible, onCancel, onOk, data }) => {
  const [moveToId, setMoveToId] = useState("");

  const handleOk = () => {
    onOk(moveToId);
    setMoveToId("");
  };

  return (
    <Modal open={visible} title="Move Row" onCancel={onCancel} onOk={handleOk}>
      <Form>
        <Form.Item label="Select Destination Row">
          <Select
            value={moveToId}
            onChange={(value) => setMoveToId(value)}
            style={{ width: "100%" }}
          >
            {data.map((row) => (
              <Option key={row.id} value={row.id}>
                {numericToAlphabetic(row.id)}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MoveRowModal;
