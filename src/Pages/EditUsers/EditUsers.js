import React, { useEffect, useState } from "react";
import "./EditUsers.css";
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
import { useParams } from "react-router-dom";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
const { Option } = Select;

const EditUsers = () => {
  const [data, setData] = useState({
    FName: "",
    Gender: "",
    LName: "",
    Selected_Role: "",
    Email: "",
    Contact: "",
    DateOfBirth: "",
    Pharmacy: [],
    PostCode: "",
    Address: "",
    Line_Manager: "",
    Line_Manager_id: "",
    Line1: "",
    Line2: "",
    PostTown: "",
    salary: "",
    Available_Roles: [],
    AvailablePharmacies: [],
    Role_Permissions: [],
  });
  // const [selectedRole, setSelectedRole] = useState();
  // const [selectedPharmacy, setSelectedPharmacy] = useState();
  const [pCodeResponse, setPCodeResponse] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const { userID } = useParams();
  const breadcrumbItems = [
    { label: "Employees", link: "/employeepage" },
    {
      label: "Update Employee Details",
      link: `/employeepage/${userID}/editUser`,
    },
  ];

  useEffect(() => {
    if (userID) {
      axios
        .get(`${baseURL}/get-user-data?user_id=${userID}`)
        .then((response) => {
          const datafromAPI = response.data.data;
          setData((prevData) => ({
            ...prevData,
            ...datafromAPI,
          }));
        })
        .catch((error) => {
          message.error("Failed to fetch employee details", 3);
          console.error(error);
        });
    } else {
    }
  }, [userID]);
  useEffect(() => {
    console.log("Data object after API call,", data);
  }, [data]);
  const handleFindAddress = () => {
    PostCodeHandler(data, setPCodeResponse);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.FName || !data.LName || !data.Email || !data.Selected_Role) {
      message.error("Please fill in necessary fields.", 3);
      return;
    }
    const localHeader = localStorage.getItem("AuthorizationToken");
    const headers = {
      Authorization: localHeader,
    };

    axios
      .put(`${baseURL}/update-profile?user_id=${userID}`, data, { headers })
      .then(() => {
        message.success("User Updated Successfully!", 3);
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
          message.error("User Updation Failed!", 3);
          console.error(error);
        }
      });
  };
  useEffect(() => {
    axios
      .get(`${baseURL}/role-permissions?role_id=${data.Selected_Role}`)
      .then((response) => {
        const permissionsData = response.data.Data.role_permissions;
        console.log("Permissions against selected role", permissionsData);
        setPermissions(permissionsData);
      })
      .catch(() => {});
  }, [data.Selected_Role]);

  useEffect(() => {
    axios
      .get(`${baseURL}/pharmacy-manager?pharmacy_id=${data.Pharmacy}`)
      .then((response) => {
        const managerData = response.data.data;

        setData((prevData) => ({
          ...prevData,
          Line_Manager: managerData.manager_name,
          Line_Manager_id: managerData.manager_id,
        }));
      })
      .catch(() => {});
  }, [data.Pharmacy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const handleSelectChange = (fieldName, value) => {
    // if (fieldName === "Selected_Role") {
    //   setSelectedRole(value);
    // } else if (fieldName === "Pharmacy") {
    //   setSelectedPharmacy(value);
    // }
    if (fieldName === "Address") {
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
  return (
    <div className="AddUsersBasicContainer">
      <CustomBreadcrumb
        seperator=">>"
        items={breadcrumbItems}
      ></CustomBreadcrumb>
      <div className="AddUsersBasicInfoHeading">
        <h5 className="usercreationtxt">Edit Employee Details</h5>
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
                  value={data.Contact}
                />
              </div>
              <div className="mb-3">
                <label className="adduserLabel">Role</label>
                <br />
                <Select
                  className="GenderInput ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                  name="Selected_Role"
                  value={data.Selected_Role}
                  onChange={(value) =>
                    handleSelectChange("Selected_Role", value)
                  }
                >
                  {data.Available_Roles.map((option) => (
                    <Option key={option.id} value={option.id}>
                      {option.role_name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="mb-3">
                <label className="addUserNotLabel">Pharmacy</label>
                <br />
                <Select
                  className="GenderInput ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                  name="Pharmacy"
                  value={data.Pharmacy}
                  onChange={(value) => handleSelectChange("Pharmacy", value)}
                >
                  {data.AvailablePharmacies.map((option) => (
                    <Option key={option.id} value={option.id}>
                      {option.pharmacy_name}
                    </Option>
                  ))}
                </Select>
              </div>
              <CustomInput
                divclassName="mb-3"
                labelclassName="addUserNotLabel"
                labelText="Postcode"
                inputclassName="AddUsersDetailsInput"
                inputName="PostCode"
                handleChange={handleChange}
                handleBlur={handleFindAddress}
                value={data.PostCode}
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
                  value={data.DateOfBirth}
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
                  name="Role_Permissions"
                  value={data.Role_Permissions}
                  onChange={(value) =>
                    handleSelectChange("Role_Permissions", value)
                  }
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
                    value={data.Line_Manager}
                  />
                </Col>
              </Row>
              <CustomSelect
                divclassName="mb-3"
                labelclassName="addUserNotLabel"
                labelText="Select address"
                selectclassName="GenderInput ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                name="Address"
                value={data.Address}
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
                inputName="PostTown"
                handleChange={handleChange}
                value={data.PostTown}
              />
            </div>
          </div>
          <div className="AddUsersThreeDetails"></div>
        </div>
        <div className="AddUsersInformationUpdateBtnContainer">
          <button className="btn AddUsersInformationCancelBtn">Cancel</button>
          <button type="submit" className="btn AddUsersInformationUpdateBtn">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUsers;
