import React, { useEffect, useState } from "react";
import { Modal, Form, Checkbox } from "antd";
import axios from "axios";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";
import "./AddEmployeeModalEditPharm.css";
import CustomButton from "../../Components/CustomButton/CustomButton";
import Spinner from "../Spinner/Spinner";

const AddEmployeeModalEditPharm = ({
  open,
  onClose,
  onAddEmployee,
  initialSelectedUsers,
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
        setLoading(false);
      }
    };

    fetchEmployees();
    setSelectedEmployees(initialSelectedUsers);
  }, [authToken, initialSelectedUsers, pharmacy_id]);

  const handleCheckboxChange = (employeeID) => {
    setSelectedEmployees((prevSelectedEmployees) => {
      const updatedSelectedEmployees = Array.isArray(prevSelectedEmployees)
        ? [...prevSelectedEmployees]
        : [];

      if (updatedSelectedEmployees.includes(employeeID)) {
        return updatedSelectedEmployees.filter((id) => id !== employeeID);
      } else {
        return [...updatedSelectedEmployees, employeeID];
      }
    });
  };

  const handleSubmit = async () => {
    const newSelectedEmployees = selectedEmployees.filter(
      (employeeID) =>
        !initialSelectedUsers || !initialSelectedUsers.includes(employeeID)
    );

    const selectedEmployeesData = employees
      .filter((employee) => newSelectedEmployees.includes(employee.userID))
      .map(({ userID, employeeName, email }) => ({
        id: userID,
        name: employeeName,
        email: email,
      }));

    console.log("selected employee data", selectedEmployeesData);

    onAddEmployee(selectedEmployeesData);

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
      onCancel={onClose}
    >
      {loading ? (
        <div className="loader">
          <Spinner size={"large"}></Spinner>
          loading...
        </div>
      ) : (
        <Form name="addEmployeeForm" onFinish={handleSubmit}>
          {employees.map((employee) => (
            <Form.Item key={employee.userID} valuePropName="checked">
              <Checkbox
                value={employee.userID}
                onChange={() => handleCheckboxChange(employee.userID)}
                checked={
                  selectedEmployees &&
                  selectedEmployees.includes(employee.userID)
                }
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
      )}
    </Modal>
  );
};

export default AddEmployeeModalEditPharm;
