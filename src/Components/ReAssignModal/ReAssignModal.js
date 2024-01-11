import React, { useState, useEffect } from "react";
import { Modal, Button, Image, message } from "antd";
import deleteImg from "../../Assets/deleteexclaim.svg";
import "./ReAssignModal.css";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";
import RolesDropdown from "./RolesDropdown";
import axios from "axios";

const ReAssignModal = ({ open, onConfirm, onCancel, roleId }) => {
  const [numberOfEmployees, setNumberOfEmployees] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const handleRoleSelect = (value) => {
    setSelectedRoleId(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/list-users-of-a-role?role_id=${roleId}`
        );
        const data = response.data;
        if (data.status === "success") {
          setNumberOfEmployees(data.data.numberOfEmployees);
        } else {
          console.error("Error fetching employee count");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, roleId]);

  const handleConfirmDelete = async () => {
    try {
      if (!selectedRoleId) {
        console.error("Please select a new role.");
        return;
      }

      // Delete the existing role and replace it with the new one
      await axios.post(`${baseURL}/delete-role`, {
        role_id_to_delete: roleId,
        new_role_id: selectedRoleId,
      });

      // Call the parent onConfirm with the newRoleId
      onConfirm(selectedRoleId);

      // Reset the selected role ID and close the modal
      setSelectedRoleId(null);
      onCancel();
      setTimeout(() => {
        message.success("Role Deleted Successfylly");
      }, 2000);
    } catch (error) {
      console.error("Error deleting and creating role:", error);
    }
  };
  console.log("selected role id", selectedRoleId);
  return (
    <Modal
      open={open}
      onOk={handleConfirmDelete}
      title={<Image src={deleteImg} preview={false}></Image>}
      onCancel={onCancel}
      className="delete-modal-body"
      footer={[
        <div className="delete-modal-btns-container" key="footer">
          <Button
            key="cancel"
            onClick={onCancel}
            className="delete-modal-cancel-btn"
          >
            Cancel
          </Button>

          <Button
            key="confirm"
            type="primary"
            onClick={handleConfirmDelete}
            className="delete-modal-ok-btn"
            disabled={!selectedRoleId}
          >
            Reassign Role
          </Button>
        </div>,
      ]}
    >
      <p className="delete-pharm-modal-heading-txt">Delete Role</p>
      <p className="delete-pharm-modal-body-txt">
        {numberOfEmployees} employee(s) are assigned to the role you are
        removing. To remove the role, select a role to which the employees
        should be reassigned.
      </p>
      <p className="label-roles-dropdown">Reassign Role to Employees</p>
      <RolesDropdown onSelect={handleRoleSelect} excludedRoleId={roleId} />
    </Modal>
  );
};

export default ReAssignModal;
