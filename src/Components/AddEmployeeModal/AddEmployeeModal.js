import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Checkbox, message } from "antd";
import axios from "axios";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";
import "./AddEmployeeModal.css";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { useParams } from "react-router-dom";
const AddEmployeeModal = ({ open, onCancel, onAddEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const { pharmacy_id } = useParams();
  const authToken = localStorage.getItem("AuthorizationToken");
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${baseURL}/list-all-users`, {
          headers: {
            Authorization: ` ${authToken}`,
          },
        });

        if (response.data && response.data.status === "success") {
          setEmployees(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

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
        message.success("Employees assigned successfully");

        onAddEmployee(response.data.users);

        onCancel();
      }
    } catch (error) {
      message.error("Error assigning employees to pharmacy");

      setTimeout(() => {
        onCancel();
      }, 3000);
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
            >
              {employee.employeeName} - {employee.email}
            </Checkbox>
          </Form.Item>
        ))}

        <Form.Item>
          <div className="add-emp-modal-btns">
            <CustomButton
              style={{ width: "40%" }}
              type="primary"
              htmlType="submit"
            >
              Add Employee
            </CustomButton>
            <CustomButton className="add-emp-modal-cancel-btn">
              Cancel
            </CustomButton>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployeeModal;
