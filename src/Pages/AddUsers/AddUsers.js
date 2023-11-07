import React, { useState } from "react";
import "./AddUsers.css";
import Input from "antd/es/input/Input";
import { useEffect } from "react";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import axios from "axios";
import { message } from "antd";
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
      !data.Gender ||
      !data.Department ||
      !data.LName ||
      !data.Role ||
      !data.Designation ||
      !data.Email ||
      !data.Pharmacy ||
      !data.Salary
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
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="AddUsersBasicContainer">
      <div className="AddUsersBasicInfoHeading">
        <h5>Add User</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="AddUsersDetails">
          <div className="AddUsersOneDetails">
            <form>
              <div className="mb-3">
                <label htmlFor="FName">First Name</label>
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
                <select
                  className="form-select AddUsersDetailsInput"
                  name="Gender"
                  value={data.Gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Do Not Wish to Disclose">
                    Do Not Wish to Disclose
                  </option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="Department">Department</label>
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
                <label htmlFor="LName">Last Name</label>
                <br />
                <Input
                  className="AddUsersDetailsInput"
                  name="LName"
                  onChange={handleChange}
                  value={data.LName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Gender">Role</label>
                <br />
                <select
                  className="form-select AddUsersDetailsInput"
                  name="Role"
                  onChange={handleChange}
                  value={data.Role}
                >
                  <option value="">Select Role</option>
                  <option value="Male">Senior Manager</option>
                  <option value="Female">Pharmacy Manager</option>
                  <option value="Other">User</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="Designation">Designation</label>
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
                <label htmlFor="Email">Email</label>
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
                <label htmlFor="Gender">Pharmacy</label>
                <br />
                <select
                  className="form-select AddUsersDetailsInput"
                  name="Pharmacy"
                  onChange={handleChange}
                  value={data.Pharmacy}
                >
                  <option value="">Select pharmacy</option>
                  <option value="Male">Pharmacy 1</option>
                  <option value="Female">Pharmacy 2</option>
                  <option value="Other">Pharmacy 3</option>
                </select>
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
