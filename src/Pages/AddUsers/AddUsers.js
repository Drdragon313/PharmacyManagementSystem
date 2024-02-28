import React, { useEffect, useState } from "react";
import "./AddUsers.css";
import Input from "antd/es/input/Input";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import axios from "axios";
import { Col, DatePicker, Row, Select, message } from "antd";
import { getMaxDate } from "../../Utility Function/DateUtils";
import { getMinDate } from "../../Utility Function/DateUtils";
import {
  AddressHandler,
  PostCodeHandler,
} from "../../Utility Function/PostCodeUtils";
import CustomInput from "../../Components/CustomInput/CustomInput";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CustomButton from "../../Components/CustomButton/CustomButton";

const { Option } = Select;
const AddUsers = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    FName: "",
    Gender: "",
    LName: "",
    Role: "",
    Email: "",
    Contact: "",
    DateOfBirth: "",
    Pharmacy: null,
    postCode: "",
    Address: "",
    Line1: "",
    Line2: "",
    postTown: "",
    Line_Manager: null,
  });
  const [validContact, setValidContact] = useState(false);
  const [avaiableRoles, setAvailableRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState();
  const [selectedPharmacy, setSelectedPharmacy] = useState();
  const [manager, setManager] = useState();
  const [avaiablePharmacies, setAvailablePharmacies] = useState([]);
  const [pCodeResponse, setPCodeResponse] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const authToken = localStorage.getItem("AuthorizationToken");
  const handleFindAddress = () => {
    PostCodeHandler(data, setPCodeResponse);
  };
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
    if (validContact) {
      axios
        .post(`${baseURL}/register-user`, data, { headers })
        .then(() => {
          message.success("User Created Successfully!", 3);

          navigate("/employeepage");
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
    } else {
      message.error("Please enter a valid UK telephone number.", 3);
    }
  };
  useEffect(() => {
    axios
      .get(`${baseURL}/list-available-roles`, {
        headers: {
          Authorization: ` ${authToken}`,
        },
      })
      .then((response) => {
        const data = response.data.Data.roles;
        setAvailableRoles(data);
      })
      .catch(() => {});
    axios
      .get(`${baseURL}/list-pharmacies-dropdown`, {
        headers: {
          Authorization: ` ${authToken}`,
        },
      })
      .then((response) => {
        const pharmData = response.data.data;
        setAvailablePharmacies(pharmData);
      });
  }, [authToken]);
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
  const ukTelephoneNumberRegex = /^\+44\s?\d{3}\s?\d{7}$/;

  const handleContactBlur = (e) => {
    const contactValue = e.target.value;
    console.log("blur called");
    if (ukTelephoneNumberRegex.test(contactValue)) {
      setValidContact(true);
    } else {
      setValidContact(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const handleDateChange = (date, dateString) => {
    const currentDate = moment();
    const selectedDate = moment(dateString, "DD-MM-YYYY");
    const maxDate = getMaxDate();
    const minDate = getMinDate();

    if (selectedDate.isAfter(currentDate, "day")) {
      message.error("Date of Birth cannot be in the future");
    } else if (selectedDate.isBefore(moment(minDate, "DD-MM-YYYY"))) {
      message.error("Date of Birth should be after 100 years ago");
    } else if (selectedDate.isAfter(moment(maxDate, "DD-MM-YYYY"))) {
      message.error("Date of Birth should be before 18 years ago");
    } else {
      setData((prevUserData) => ({
        ...prevUserData,
        DateOfBirth: dateString,
      }));
    }
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
  const HandleBtnBacktoLogin = () => {
    navigate("/employeepage");
  };
  return (
    <div className="AddUsersBasicContainer">
      <Row gutter={16}>
        <Col span={24}>
          <div className="breadcrumb-border-add-pharmacy">
            <CustomBreadcrumb seperator=">>" items={breadcrumbItems} />
          </div>
          <div className="AddUsersBasicInfoHeading">
            <h5 className="usercreationtxt">New user creation</h5>
          </div>
        </Col>
      </Row>

      <div className="AddUsersDetails-container">
        <form onSubmit={handleSubmit}>
          <div className="adjacent-fields">
            <CustomInput
              labelclassName="adduserLabel"
              labelText="First Name"
              inputclassName="AddUsersDetailsInput"
              inputName="FName"
              handleChange={handleChange}
              value={data.FName}
            />
            <CustomInput
              labelclassName="adduserLabel"
              labelText="Last Name"
              inputclassName="AddUsersDetailsInput"
              inputName="LName"
              handleChange={handleChange}
              value={data.LName}
            />
          </div>
          <div className="adjacent-fields">
            {" "}
            <CustomSelect
              labelclassName="addUserNotLabel"
              labelText="Gender"
              selectclassName="AddUsersDetailsInput"
              name="Gender"
              onChange={handleSelectChange}
              value={data.Gender}
              options={["Male", "Female", "Other", "Do Not Wish to Disclose"]}
            />
            <div>
              <label htmlFor="DOB" className="addUserNotLabel">
                Date of birth
              </label>
              <br />
              <DatePicker
                className="AddUsersDetailsInput"
                name="DateOfBirth"
                onChange={handleDateChange}
                format="DD-MM-YYYY"
                disabledDate={(current) =>
                  current &&
                  (current > moment().endOf("day") ||
                    current < moment().subtract(100, "years") ||
                    current > moment().subtract(18, "years"))
                }
              />
            </div>
          </div>
          <div className="adjacent-fields">
            <div>
              <label htmlFor="Contact" className="addUserNotLabelContact">
                Contact number
              </label>
              <br />
              <Input
                className="AddUsersDetailsInput"
                name="Contact"
                onChange={handleChange}
                onBlur={handleContactBlur}
              />
              {data.Contact.length > 0 && !validContact && (
                <p className="InvalidContactTxt">Invalid Contact</p>
              )}
            </div>{" "}
            <CustomInput
              labelclassName="adduserLabel"
              labelText="Email"
              type="email"
              inputclassName="AddUsersDetailsInput"
              inputName="Email"
              handleChange={handleChange}
              value={data.Email}
            />
          </div>
          <div className="adjacent-fields">
            {" "}
            <div>
              <label className="adduserLabel">Role</label>
              <br />
              <Select
                className="AddUsersDetailsInput"
                name="Role"
                onChange={(value) => handleSelectChange("Role", value)}
              >
                {avaiableRoles.map((option) => (
                  <Option key={option.id} value={option.id}>
                    {option.name}
                  </Option>
                ))}
              </Select>
            </div>{" "}
            <div>
              <label className="addUserNotLabel">Permissions</label>
              <br />
              <Select
                className="AddUsersDetailsInput"
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
          </div>
          <div className="adjacent-fields">
            {" "}
            <div>
              <label className="addUserNotLabel">Pharmacy</label>
              <br />
              <Select
                className="AddUsersDetailsInput"
                name="Role"
                onChange={(value) => handleSelectChange("Pharmacy", value)}
              >
                {avaiablePharmacies &&
                  avaiablePharmacies.map((option) => (
                    <Option key={option.id} value={option.id}>
                      {option.pharmacyName}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className="DetailsInput-container">
              <CustomInput
                labelclassName="addUserNotLabel"
                labelText="Salary"
                inputclassName="DetailsInput"
                inputName="salary"
                handleChange={handleChange}
                value={data.salary}
              />
              <CustomInput
                labelclassName="addUserNotLabel"
                labelText="Line manager"
                inputclassName="DetailsInput"
                inputName="Line_Manager"
                handleChange={handleChange}
                value={manager?.manager_name || ""}
              />
            </div>
          </div>
          <div className="adjacent-fields">
            {" "}
            <CustomInput
              labelclassName="addUserNotLabel"
              labelText="Postcode"
              inputclassName="AddUsersDetailsInput"
              inputName="postCode"
              handleChange={handleChange}
              handleBlur={handleFindAddress}
              value={data.postCode}
            />{" "}
            <CustomSelect
              labelclassName="addUserNotLabel"
              labelText="Select address"
              selectclassName="AddUsersDetailsInput"
              name="Address"
              onChange={handleSelectChange}
              options={
                pCodeResponse ? pCodeResponse.map((item) => item.address) : []
              }
            />
          </div>
          <div className="adjacent-fields">
            {" "}
            <CustomInput
              labelclassName="addUserNotLabel"
              labelText="Building Name"
              inputclassName="AddUsersDetailsInput"
              inputName="Line1"
              handleChange={handleChange}
              value={data.Line1}
            />{" "}
            <CustomInput
              labelclassName="addUserNotLabel"
              labelText="Town"
              inputclassName="AddUsersDetailsInput"
              inputName="postTown"
              handleChange={handleChange}
              value={data.postTown}
            />
          </div>

          <CustomInput
            labelclassName="addUserNotLabel"
            labelText="Street No"
            inputclassName="AddUsersDetailsInput"
            inputName="Line2"
            handleChange={handleChange}
            value={data.Line2}
          />
          <div className="AddUsersInformationUpdateBtnContainer">
            <CustomButton
              onClick={HandleBtnBacktoLogin}
              className="AddUsersInformationCancelBtn"
            >
              Cancel
            </CustomButton>

            <CustomButton
              className="add-user-btn-submit"
              htmlType="submit"
              type="primary"
            >
              Create User
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUsers;
