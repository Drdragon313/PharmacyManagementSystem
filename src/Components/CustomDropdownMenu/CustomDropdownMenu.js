import React, { useState } from "react";
import { Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const CustomDropdownMenu = ({
  id,
  handleDelete,
  editFormData,
  handleMoveRow,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const handleClick = (e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom, left: rect.left });
    setMenuVisible(!menuVisible);
  };

  const handleMenuClick = (key) => {
    if (key === "delete") {
      handleDelete(id);
    } else if (key === "edit") {
      editFormData(id);
    } else if (key === "move") {
      handleMoveRow(id);
    }
    setMenuVisible(false);
  };

  const menuStyle = {
    position: "absolute",
    top: menuPosition.top + 10 + "px",
    left: menuPosition.left + "px",
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Button onClick={handleClick}>
        Click me <DownOutlined />
      </Button>
      {menuVisible && (
        <div style={menuStyle}>
          <Menu onClick={(e) => e.domEvent.stopPropagation()}>
            <Menu.Item key="delete" onClick={() => handleMenuClick("delete")}>
              Delete
            </Menu.Item>
            <Menu.Item key="edit" onClick={() => handleMenuClick("edit")}>
              Edit
            </Menu.Item>
            <Menu.Item key="move" onClick={() => handleMenuClick("move")}>
              Move
            </Menu.Item>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default CustomDropdownMenu;
