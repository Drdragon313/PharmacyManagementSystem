import React, { useState, useEffect } from "react";
import { Select } from "antd";
import axios from "axios";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";
import "./ReAssignModal.css";
const { Option } = Select;

const RolesDropdown = ({ excludedRoleId, onSelect }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${baseURL}/list-available-roles`);
        const data = response.data;

        if (data.status === "success" && data.Data && data.Data.roles) {
          // Exclude the role with the specified ID
          const filteredRoles = data.Data.roles.filter(
            (role) => role.id !== excludedRoleId
          );
          setRoles(filteredRoles);
        } else {
          console.error("Invalid response format:", data);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [excludedRoleId]);

  return (
    <Select
      showSearch
      placeholder="Select a role"
      optionFilterProp="children"
      loading={loading}
      className="roles-dropdown-reassign-modal"
      onSelect={onSelect} // Pass selected value to parent component
    >
      {roles.map((role) => (
        <Option key={role.id} value={role.id}>
          {role.name}
        </Option>
      ))}
    </Select>
  );
};

export default RolesDropdown;
