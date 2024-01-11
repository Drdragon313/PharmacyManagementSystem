import React, { useEffect, useState } from "react";
import { Modal, Form, Checkbox } from "antd";
import axios from "axios";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";
import "./AddEmployeeModalEditPharm.css";
import CustomButton from "../../Components/CustomButton/CustomButton";

const AddEmployeeModalEditPharm = ({
  open,
  onClose,
  onAddEmployee,
  pharmacy_id,
}) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

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

  const handleSubmit = async () => {
    // Fetch data of selected employees based on their IDs
    const selectedEmployeesData = employees
      .filter((employee) => selectedEmployees.includes(employee.userID))
      .map(({ userID, employeeName, email }) => ({
        id: userID,
        name: employeeName,
        email: email,
      }));

    // Pass the selectedEmployeesData back to the parent component
    onAddEmployee(selectedEmployeesData);

    // Close the modal
    onClose();
  };

  return (
    <Modal
      title="Add Employee to Pharmacy"
      open={open}
      onClose={onClose}
      footer={null}
      className="add-emp-modal"
      header={false}
    >
      <Form name="addEmployeeForm" onFinish={handleSubmit}>
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
            <CustomButton
              className="add-emp-modal-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </CustomButton>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployeeModalEditPharm;
