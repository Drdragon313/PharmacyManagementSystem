import React, { useState } from "react";
import "./AddUsers.css";
import Input from "antd/es/input/Input";
import { useEffect } from "react";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import axios from "axios";
import { Select, message } from "antd";
const { Option } = Select;
const AddUsers = () => {
  const [data, setData] = useState({
    FName: "",
    Gender: "",
    Department: "",
    LName: "",
    Role: "",
    Designation: "",
    Email: "",
    Pharmacy: "",
    Salary: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !data.FName ||
      !data.Department ||
      !data.LName ||
      !data.Role ||
      !data.Designation ||
      !data.Email
    ) {
      message.error("Please fill in all the fields.", 3);
      return;
    }
    const localHeader = localStorage.getItem("AuthorizationToken");
    const headers = {
      Authorization: localHeader,
    };
    axios
      .post(`${baseURL}/register-user`, data, { headers })
      .then(() => {
        message.success("User Created Successfully!", 3);
        setData({
          FName: "",
          Gender: "",
          Department: "",
          LName: "",
          Role: "",
          Designation: "",
          Email: "",
          Pharmacy: "",
          Salary: "",
        });
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message
        ) {
          message.error(error.response.data.error.message, 3);
        } else {
          message.error("User Creation Failed!", 3);
        }
      });
    console.log("From submitted");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const handleSelectChange = (fieldName, value) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="AddUsersBasicContainer">
      <div className="AddUsersBasicInfoHeading">
        <h5>Add Employee</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="AddUsersDetails">
          <div className="AddUsersOneDetails">
            <form>
              <div className="mb-3">
                <label htmlFor="FName" className="adduserLabel">
                  First Name
                </label>
                <br />
                <Input
                  className="AddUsersDetailsInput"
                  name="FName"
                  onChange={handleChange}
                  value={data.FName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Gender">Gender</label>
                <br />
                <Select
                  className="ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                  name="Gender"
                  placeholder="Select Gender"
                  onChange={(value) => handleSelectChange("Gender", value)}
                  value={data.Gender}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                  <Option value="Do Not Wish to Disclose">
                    Do Not Wish to Disclose
                  </Option>
                </Select>
              </div>

              <div className="mb-3">
                <label htmlFor="Department" className="adduserLabel">
                  Department
                </label>
                <br />
                <Input
                  name="Department"
                  className="AddUsersDetailsInput"
                  onChange={handleChange}
                  value={data.Department}
                />
              </div>
            </form>
          </div>
          <div className="AddUsersTwoDetails">
            <form>
              <div className="mb-3">
                <label htmlFor="LName" className="adduserLabel">
                  Last Name
                </label>
                <br />
                <Input
                  className="AddUsersDetailsInput"
                  name="LName"
                  onChange={handleChange}
                  value={data.LName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Role" className="adduserLabel">
                  Role
                </label>
                <br />
                <Select
                  className="ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                  name="Role"
                  placeholder="Select Role"
                  onChange={(value) => handleSelectChange("Role", value)}
                  value={data.Role}
                >
                  <Option value="Senior Manager">Senior Manager</Option>
                  <Option value="Pharmacy Manager">Pharmacy Manager</Option>
                  <Option value="User">User</Option>
                </Select>
              </div>

              <div className="mb-3">
                <label htmlFor="Designation" className="adduserLabel">
                  Designation
                </label>
                <br />
                <Input
                  name="Designation"
                  className="AddUsersDetailsInput"
                  onChange={handleChange}
                  value={data.Designation}
                />
              </div>
            </form>
          </div>
          <div className="AddUsersThreeDetails">
            <form>
              <div className="mb-3">
                <label htmlFor="Email" className="adduserLabel">
                  Email
                </label>
                <br />
                <Input
                  type="email"
                  className="AddUsersDetailsInput"
                  name="Email"
                  onChange={handleChange}
                  value={data.Email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Pharmacy">Pharmacy</label>
                <br />
                <Select
                  className="ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                  name="Pharmacy"
                  placeholder="Select Pharmacy"
                  onChange={(value) => handleSelectChange("Pharmacy", value)}
                  value={data.Pharmacy}
                >
                  <Option value="Pharmacy 1">Pharmacy 1</Option>
                  <Option value="Pharmacy 2">Pharmacy 2</Option>
                  <Option value="Pharmacy 3">Pharmacy 3</Option>
                </Select>
              </div>
              <div className="mb-3">
                <label htmlFor="Salary">Salary</label>
                <br />
                <Input
                  className="AddUsersDetailsInput"
                  type="number"
                  name="Salary"
                  onChange={handleChange}
                  value={data.Salary}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="AddUsersInformationUpdateBtnContainer">
          <button
            type="submit"
            className="btn btn-light AddUsersInformationUpdateBtn"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUsers;
