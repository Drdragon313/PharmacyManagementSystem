import React, { useEffect, useState } from "react";
import { Modal, Form, Checkbox, message } from "antd";
import axios from "axios";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";
import "./AddEmployeeModal.css";
import CustomButton from "../../Components/CustomButton/CustomButton";
const AddEmployeeModal = ({
  open,
  onCancel,
  onAddEmployee,
  pharmacy_id,
  initialSelectedUsers,
}) => {
  const [employees, setEmployees] = useState([]);

  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const authToken = localStorage.getItem("AuthorizationToken");
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/list-users-not-in-pharmacy?pharmacy_id=${pharmacy_id}`,
          {
            headers: {
              Authorization: ` ${authToken}`,
            },
          }
        );

        if (response.data && response.data.status === "success") {
          setEmployees(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
      }
    };

    fetchEmployees();
    setSelectedEmployees(initialSelectedUsers);
  }, [initialSelectedUsers, authToken, pharmacy_id]);

  const handleCheckboxChange = (employeeID) => {
    setSelectedEmployees((prevSelectedEmployees) => {
      if (prevSelectedEmployees.includes(employeeID)) {
        return prevSelectedEmployees.filter((id) => id !== employeeID);
      } else {
        return [...prevSelectedEmployees, employeeID];
      }
    });
  };

  const onFinish = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/assign-pharmacy-to-users`,
        {
          pharmacy_id: parseInt(pharmacy_id, 10),
          users: employees
            .filter((employee) => selectedEmployees.includes(employee.userID))
            .map((selectedEmployee) => ({
              email: selectedEmployee.email,
              id: selectedEmployee.userID,
              name: selectedEmployee.employeeName,
            })),
        },
        {
          headers: {
            Authorization: ` ${authToken}`,
          },
        }
      );

      if (response.data && response.data.status === "success") {
        console.log("Employees assigned successfully:", response.data);
        onAddEmployee(response.data.users);

        message.success("Employees assigned successfully");
      }
    } catch (error) {
      console.error("Error assigning employees to pharmacy:", error);

      message.error("Error assigning employees to pharmacy.");
    }
  };
  return (
    <Modal
      title="Add Employee to Pharmacy"
      open={open}
      onCancel={onCancel}
      footer={null}
      className="add-emp-modal"
      header={false}
    >
      <Form name="addEmployeeForm" onFinish={onFinish}>
        {employees.map((employee) => (
          <Form.Item key={employee.userID} valuePropName="checked">
            <Checkbox
              value={employee.userID}
              onChange={() => handleCheckboxChange(employee.userID)}
              checked={selectedEmployees.includes(employee.userID)}
            >
              {employee.employeeName} - {employee.email}
            </Checkbox>
          </Form.Item>
        ))}

        <Form.Item>
          <div className="add-emp-modal-btns">
            <CustomButton
              className="add-emp-modal-cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </CustomButton>
            <CustomButton
              style={{ width: "50%" }}
              type="primary"
              htmlType="submit"
            >
              Add Employee
            </CustomButton>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployeeModal;
