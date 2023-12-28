import React, { useEffect, useState } from "react";
import "./AddUsers.css";
import Input from "antd/es/input/Input";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import axios from "axios";
import { Col, Row, Select, message } from "antd";
import { getMaxDate } from "../../Utility Function/DateUtils";
import { getMinDate } from "../../Utility Function/DateUtils";
import { handleBlur } from "../../Utility Function/DateUtils";
import {
  AddressHandler,
  PostCodeHandler,
} from "../../Utility Function/PostCodeUtils";
import CustomInput from "../../Components/CustomInput/CustomInput";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
const { Option } = Select;
const AddUsers = () => {
  const [data, setData] = useState({
    FName: "",
    Gender: "",
    LName: "",
    Role: "",
    Email: "",
    Contact: "",
    DateOfBirth: "",
    Pharmacy: "",
    postCode: "",
    Address: "",
    Line1: "",
    Line2: "",
    postTown: "",
    Line_Manager: "",
  });
  const [avaiableRoles, setAvailableRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState();
  const [selectedPharmacy, setSelectedPharmacy] = useState();
  const [manager, setManager] = useState();

  const [avaiablePharmacies, setAvailablePharmacies] = useState([]);
  const [pCodeResponse, setPCodeResponse] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const handleFindAddress = () => {
    PostCodeHandler(data, setPCodeResponse);
  };
  useEffect(() => {
    console.log("Data Obj", data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.FName || !data.LName || !data.Email || !data.Role) {
      message.error("Please fill in necessary fields.", 3);
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
          LName: "",
          Role: "",
          Email: "",
          Contact: "",
          DateOfBirth: "",
          Pharmacy: "",
          postCode: "",
          Address: "",
          Line_Manager: "",
          Line1: "",
          Line2: "",
          postTown: "",
          salary: "",
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
  };
  useEffect(() => {
    axios
      .get(`${baseURL}/list-available-roles`)
      .then((response) => {
        const data = response.data.Data.roles;
        setAvailableRoles(data);
      })
      .catch(() => {});
    axios.get(`${baseURL}/list-pharmacies`).then((response) => {
      const pharmData = response.data.data;
      setAvailablePharmacies(pharmData);
    });
  }, []);
  useEffect(() => {
    axios
      .get(`${baseURL}/role-permissions?role_id=${selectedRole}`)
      .then((response) => {
        const permissionsData = response.data.Data.role_permissions;
        setPermissions(permissionsData);
      })
      .catch(() => {});
  }, [selectedRole]);

  useEffect(() => {
    axios
      .get(`${baseURL}/pharmacy-manager?pharmacy_id=${selectedPharmacy}`)
      .then((response) => {
        const managerData = response.data.data;
        setManager(managerData);
        setData((prevData) => ({
          ...prevData,
          Line_Manager: managerData.manager_id,
        }));
      })
      .catch(() => {});
  }, [selectedPharmacy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const handleSelectChange = (fieldName, value) => {
    if (fieldName === "Role") {
      setSelectedRole(value);
    } else if (fieldName === "Pharmacy") {
      setSelectedPharmacy(value);
    } else if (fieldName === "Address") {
      const selectedAddress = pCodeResponse.find(
        (item) => item.address === value
      );
      const selectedUdprn = selectedAddress.udprn;
      AddressHandler(setData, selectedUdprn);
    }
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const breadcrumbItems = [
    {
      label: "Employees",
      link: "/employeepage",
    },
    {
      label: "Add Employee",
      link: "/users/AddUser",
    },
  ];
  return (
    <div className="AddUsersBasicContainer">
      <CustomBreadcrumb seperator=">>" items={breadcrumbItems} />
      <div className="AddUsersBasicInfoHeading">
        <h5 className="usercreationtxt">New user creation</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="AddUsersDetails">
          <div className="AddUsersOneDetails">
            <div>
              <CustomInput
                divclassName="mb-3"
                labelclassName="adduserLabel"
                labelText="First Name"
                inputclassName="AddUsersDetailsInput"
                inputName="FName"
                handleChange={handleChange}
                value={data.FName}
              />
              <CustomSelect
                divclassName="mb-3"
                labelclassName="addUserNotLabel"
                labelText="Gender"
                selectclassName="GenderInput ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                name="Gender"
                onChange={handleSelectChange}
                value={data.Gender}
                options={["Male", "Female", "Other", "Do Not Wish to Disclose"]}
              />
              <div className="mb-3">
                <label htmlFor="Contact" className="addUserNotLabel">
                  Contact number
                </label>
                <br />
                <Input
                  className="AddUsersDetailsInput"
                  name="Contact"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="adduserLabel">Role</label>
                <br />
                <Select
                  className="GenderInput ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                  name="Role"
                  onChange={(value) => handleSelectChange("Role", value)}
                >
                  {avaiableRoles.map((option) => (
                    <Option key={option.id} value={option.id}>
                      {option.name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="mb-3">
                <label className="addUserNotLabel">Pharmacy</label>
                <br />
                <Select
                  className="GenderInput ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                  name="Role"
                  onChange={(value) => handleSelectChange("Pharmacy", value)}
                >
                  {avaiablePharmacies.map((option) => (
                    <Option key={option.id} value={option.id}>
                      {option.pharmacyName}
                    </Option>
                  ))}
                </Select>
              </div>
              <CustomInput
                divclassName="mb-3"
                labelclassName="addUserNotLabel"
                labelText="Postcode"
                inputclassName="AddUsersDetailsInput"
                inputName="postCode"
                handleChange={handleChange}
                handleBlur={handleFindAddress}
                value={data.postCode}
              />
              <Row>
                <Col span={10}>
                  <CustomInput
                    divclassName="mb-3"
                    labelclassName="addUserNotLabel"
                    labelText="Building No."
                    inputclassName="DetailsInput"
                    inputName="Line1"
                    handleChange={handleChange}
                    value={data.Line1}
                  />
                </Col>
                <Col span={1}></Col>
                <Col span={10}>
                  <CustomInput
                    divclassName="mb-3"
                    labelclassName="addUserNotLabel"
                    labelText="Street No"
                    inputclassName="DetailsInput"
                    inputName="Line2"
                    handleChange={handleChange}
                    value={data.Line2}
                  />
                </Col>
              </Row>
            </div>
          </div>
          <div className="AddUsersTwoDetails">
            <div>
              <CustomInput
                divclassName="mb-3"
                labelclassName="adduserLabel"
                labelText="Last Name"
                inputclassName="AddUsersDetailsInput"
                inputName="LName"
                handleChange={handleChange}
                value={data.LName}
              />
              <div className="mb-3">
                <label htmlFor="DOB" className="addUserNotLabel">
                  Date of birth
                </label>
                <br />
                <Input
                  className="AddUsersDetailsInput"
                  type="date"
                  name="DateOfBirth"
                  onChange={handleChange}
                  onBlur={(e) =>
                    handleBlur("DateOfBirth", e.target.value, data, setData)
                  }
                  max={getMaxDate()}
                  min={getMinDate()}
                />
              </div>
              <CustomInput
                divclassName="mb-3"
                labelclassName="adduserLabel"
                labelText="Email"
                type="email"
                inputclassName="AddUsersDetailsInput"
                inputName="Email"
                handleChange={handleChange}
                value={data.Email}
              />
              <div className="mb-3">
                <label className="addUserNotLabel">Permissions</label>
                <br />
                <Select
                  className="GenderInput ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                  name="Role"
                  onChange={(value) => handleSelectChange("Permissions", value)}
                >
                  {permissions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </div>
              <Row>
                <Col span={10}>
                  <CustomInput
                    divclassName="mb-3"
                    labelclassName="addUserNotLabel"
                    labelText="Salary"
                    inputclassName="DetailsInput"
                    inputName="salary"
                    handleChange={handleChange}
                    value={data.salary}
                  />
                </Col>
                <Col span={1}></Col>
                <Col span={10}>
                  <CustomInput
                    divclassName="mb-3"
                    labelclassName="addUserNotLabel"
                    labelText="Line manager"
                    inputclassName="DetailsInput"
                    inputName="Line_Manager"
                    handleChange={handleChange}
                    // value={manager.manager_name}
                    value={manager?.manager_name || ""}
                  />
                </Col>
              </Row>
              <CustomSelect
                divclassName="mb-3"
                labelclassName="addUserNotLabel"
                labelText="Select address"
                selectclassName="GenderInput ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                name="Address"
                onChange={handleSelectChange}
                options={
                  pCodeResponse ? pCodeResponse.map((item) => item.address) : []
                }
              />
              <CustomInput
                divclassName="mb-3"
                labelclassName="addUserNotLabel"
                labelText="Town"
                inputclassName="AddUsersDetailsInput"
                inputName="postTown"
                handleChange={handleChange}
                value={data.postTown}
              />
            </div>
          </div>
          <div className="AddUsersThreeDetails"></div>
        </div>
        <div className="AddUsersInformationUpdateBtnContainer">
          <button className="btn AddUsersInformationCancelBtn">Cancel</button>
          <button type="submit" className="btn AddUsersInformationUpdateBtn">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUsers;
