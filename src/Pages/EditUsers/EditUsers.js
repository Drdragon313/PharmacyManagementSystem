import React, { useEffect, useState } from "react";
import "./EditUsers.css";
import Input from "antd/es/input/Input";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import axios from "axios";
import { DatePicker, Select, message } from "antd";
import { getMaxDate } from "../../Utility Function/DateUtils";
import { getMinDate } from "../../Utility Function/DateUtils";
import {
  AddressHandler,
  PostCodeHandler,
} from "../../Utility Function/PostCodeUtils";
import CustomInput from "../../Components/CustomInput/CustomInput";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import { useParams } from "react-router-dom";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import CustomButton from "../../Components/CustomButton/CustomButton";
import { fetchUserPermissions } from "../../Utility Function/ModulesAndPermissions";
const { Option } = Select;

const EditUsers = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    FName: "",
    Gender: "",
    LName: "",
    Selected_Role: "",
    Selected_Role_Name: "",
    Email: "",
    Contact: "",
    DateOfBirth: "",
    Pharmacy: [],
    postCode: "",
    Address: "",
    Line_Manager: "",
    Line_Manager_id: "",
    Line1: "",
    Line2: "",
    postTown: "",
    salary: "",
    Available_Roles: [],
    AvailablePharmacies: [],
    Role_Permissions: [],
  });
  const [responseID, setResponseID] = useState();
  const authToken = localStorage.getItem("AuthorizationToken");
  const [validContact, setValidContact] = useState(false);
  const [pCodeResponse, setPCodeResponse] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState();
  const [isRoleSelectDisabled, setIsRoleSelectDisabled] = useState(false);
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
      const headers = {
        Authorization: `${authToken}`,
      };
      axios
        .get(`${baseURL}/get-user-data?user_id=${userID}`, { headers })
        .then((response) => {
          const datafromAPI = response.data.data;
          setData((prevData) => ({
            ...prevData,
            ...datafromAPI,
          }));
          handleContactValidation(datafromAPI.Contact);
        })
        .catch((error) => {
          message.error("Failed to fetch employee details", 3);
          console.error(error);
        });
    } else {
      const headers = {
        Authorization: `${authToken}`,
      };
      axios
        .get(`${baseURL}/get-user-data`, { headers })
        .then((response) => {
          const datafromAPI = response.data.data;
          setData((prevData) => ({
            ...prevData,
            ...datafromAPI,
          }));
          const id = response.data.data.ID;
          setResponseID(id);
        })

        .catch((error) => {
          message.error("Failed to fetch employee details", 3);
          console.error(error);
        });
    }
  }, [userID, authToken]);
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
    if (validContact) {
      if (userID) {
        axios
          .put(`${baseURL}/update-profile?user_id=${userID}`, data, { headers })
          .then(() => {
            message.success("User Updated Successfully!", 3);
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
              message.error("User Updation Failed!", 3);
              console.error(error);
            }
          });
      } else {
        axios
          .put(`${baseURL}/update-profile?user_id=${responseID}`, data, {
            headers,
          })
          .then(() => {
            message.success("User Updated Successfully!", 3);
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
              message.error("User Updation Failed!", 3);
              console.error(error);
            }
          });
      }
    } else {
      message.error("Please enter a valid UK telephone number.", 3);
    }
  };
  useEffect(() => {
    if (userID) {
      axios
        .get(`${baseURL}/role-permissions?role_id=${selectedRole}`)
        .then((response) => {
          const permissionsData = response.data.Data.role_permissions;
          setPermissions(permissionsData);
        })
        .catch(() => {});
      const setUserPermissions = (permissions) => {
        const isUpdateActionAllowed = permissions.find(
          (permission) =>
            permission.module_id === 7 && permission.actions.update === false
        );

        setIsRoleSelectDisabled(isUpdateActionAllowed);
      };

      fetchUserPermissions(setUserPermissions);
    }
  }, [data.Selected_Role_Name]);

  useEffect(() => {
    if (userID) {
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
    }
  }, [data.Pharmacy, userID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleContactValidation = (contactValue) => {
    const ukTelephoneNumberRegex = /^\+44\s?\d{3}\s?\d{7}$/;

    if (contactValue && ukTelephoneNumberRegex.test(contactValue)) {
      setValidContact(true);
    } else {
      setValidContact(false);
    }
  };

  const handleSelectChange = (fieldName, value) => {
    if (fieldName === "Selected_Role_Name") {
      setSelectedRole(value);
      setData((prevData) => ({
        ...prevData,
        Selected_Role: value,
      }));
    }
    if (fieldName === "Pharmacy") {
      setData((prevData) => ({
        ...prevData,
        Pharmacy_id: value,
      }));
    }
    if (fieldName === "Address") {
      const selectedAddress = pCodeResponse.find(
        (item) => item.address === value
      );
      const selectedUdprn = selectedAddress.udprn;
      console.log("Selected udpRN:", selectedUdprn);
      AddressHandler(setData, selectedUdprn);
    }
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    const currentDate = moment();
    const selectedDate = moment(dateString, "DD-MM-YYYY");
    const maxDate = getMaxDate();
    const minDate = getMinDate();

    if (selectedDate.isAfter(currentDate, "day")) {
      message.error("Date of creation cannot be in the future");
    } else if (selectedDate.isBefore(moment(minDate, "DD-MM-YYYY"))) {
      message.error("Date of creation should be after 100 years ago");
    } else if (selectedDate.isAfter(moment(maxDate, "DD-MM-YYYY"))) {
      message.error("Date of creation should be before 18 years ago");
    } else {
      setData((prevUserData) => ({
        ...prevUserData,
        DateOfBirth: dateString,
      }));
    }
  };
  return (
    <div className="EditUsersBasicContainer">
      {userID && (
        <div className="breadcrumb-border-edit-user">
          <CustomBreadcrumb
            seperator=">>"
            items={breadcrumbItems}
          ></CustomBreadcrumb>
        </div>
      )}
      <div className="EditUsersBasicInfoHeading">
        {userID ? (
          <h5 className="usercreationtxt">Edit Employee Details</h5>
        ) : (
          <h5>Update Profile</h5>
        )}
      </div>
      <div className="EditUsersDetails">
        <form onSubmit={handleSubmit}>
          <div className="adjacent-fields">
            {" "}
            <CustomInput
              divclassName="mb-3"
              labelclassName={userID ? "adduserLabel" : "addUserNotLabel"}
              labelText="First Name"
              inputclassName="AddUsersDetailsInput"
              inputName="FName"
              handleChange={handleChange}
              value={data.FName}
            />
            <CustomInput
              divclassName="mb-3"
              labelclassName={userID ? "adduserLabel" : "addUserNotLabel"}
              labelText="Last Name"
              inputclassName="AddUsersDetailsInput"
              inputName="LName"
              handleChange={handleChange}
              value={data.LName}
            />
          </div>
          <div className="adjacent-fields">
            <CustomSelect
              divclassName="mb-3"
              labelclassName="addUserNotLabel"
              labelText="Gender"
              selectclassName="AddUsersDetailsInput"
              name="Gender"
              onChange={handleSelectChange}
              value={data.Gender}
              options={["Male", "Female", "Other", "Do Not Wish to Disclose"]}
            />
            <div className="mb-3">
              <label htmlFor="DOB" className="addUserNotLabel">
                Date of birth
              </label>
              <br />
              <DatePicker
                disabled={userID ? false : true}
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
                placeholder={data.DateOfBirth}
              />
            </div>
          </div>
          <div className="adjacent-fields">
            {" "}
            <div className="mb-3">
              <label htmlFor="Contact" className="addUserNotLabelContact">
                Contact number
              </label>
              <br />
              <Input
                className="AddUsersDetailsInput"
                name="Contact"
                onChange={(e) => {
                  handleChange(e);
                  handleContactValidation(e.target.value);
                }}
                value={data.Contact}
              />
              {data.Contact.length > 0 && !validContact && (
                <p className="InvalidContactTxt">Invalid Contact</p>
              )}
            </div>{" "}
            <CustomInput
              divclassName="mb-3"
              labelclassName={userID ? "adduserLabel" : "addUserNotLabel"}
              labelText="Email"
              type="email"
              inputclassName="AddUsersDetailsInput"
              inputName="Email"
              handleChange={handleChange}
              value={data.Email}
              disabled={true}
            />
          </div>
          <div className="adjacent-fields">
            {" "}
            <div className="mb-3">
              <label className={userID ? "adduserLabel" : "addUserNotLabel"}>
                Role
              </label>
              <br />
              <Select
                className="AddUsersDetailsInput"
                name="Selected_Role_Name"
                value={data.Selected_Role_Name}
                onChange={(value) =>
                  handleSelectChange("Selected_Role_Name", value)
                }
                disabled={isRoleSelectDisabled}
              >
                {data.Available_Roles.map((option) => (
                  <Option key={option.id} value={option.id}>
                    {option.role_name}
                  </Option>
                ))}
              </Select>
            </div>{" "}
            <div className="mb-3">
              <label className="addUserNotLabel">Permissions</label>
              <br />
              <Select
                className="AddUsersDetailsInput"
                name="Role_Permissions"
                value={data.Role_Permissions}
                style={{
                  backgroundColor:
                    userID && !isRoleSelectDisabled ? "#d9d9d9" : "inherit",
                }}
                onChange={(value) =>
                  handleSelectChange("Role_Permissions", value)
                }
                disabled={userID && !isRoleSelectDisabled ? false : true}
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
            <div className="mb-3">
              <label className="addUserNotLabel">Pharmacy</label>
              <br />
              <Select
                className="AddUsersDetailsInput"
                name="Pharmacy"
                value={data.Pharmacy}
                onChange={(value) => handleSelectChange("Pharmacy", value)}
                disabled={userID ? false : true}
              >
                {data.AvailablePharmacies &&
                  data.AvailablePharmacies.map((option) => (
                    <Option key={option.id} value={option.id}>
                      {option.pharmacy_name}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className="DetailsInput-container">
              {" "}
              <CustomInput
                divclassName="mb-3"
                labelclassName="addUserNotLabel"
                labelText="Salary"
                inputclassName="DetailsInput"
                inputName="salary"
                handleChange={handleChange}
                value={data.salary}
                disabled={userID ? false : true}
              />
              <CustomInput
                divclassName="mb-3"
                labelclassName="addUserNotLabel"
                labelText="Line manager"
                inputclassName="DetailsInput"
                inputName="Line_Manager"
                handleChange={handleChange}
                value={data.Line_Manager}
                disabled={true}
              />
            </div>
          </div>
          <div className="adjacent-fields">
            {" "}
            <CustomInput
              divclassName="mb-3"
              labelclassName="addUserNotLabel"
              labelText="Postcode"
              inputclassName="AddUsersDetailsInput"
              inputName="postCode"
              handleChange={handleChange}
              handleBlur={handleFindAddress}
              value={data.postCode}
            />{" "}
            <CustomSelect
              divclassName="mb-3"
              labelclassName="adduserNotLabel"
              labelText="Please Select your Address"
              selectclassName="AddUsersDetailsInput"
              name="Address"
              onChange={handleSelectChange}
              options={
                pCodeResponse ? pCodeResponse.map((item) => item.address) : []
              }
              value={data.postTown}
            />
          </div>
          <div className="adjacent-fields">
            {" "}
            <CustomInput
              divclassName="mb-3"
              labelclassName="addUserNotLabel"
              labelText="Town"
              inputclassName="AddUsersDetailsInput"
              inputName="PostTown"
              handleChange={handleChange}
              value={data.postTown}
            />
            <div className="DetailsInput-container">
              {" "}
              <CustomInput
                divclassName="mb-3"
                labelclassName="addUserNotLabel"
                labelText="Building No."
                inputclassName="DetailsInput"
                inputName="Line1"
                handleChange={handleChange}
                value={data.Line1}
              />{" "}
              <CustomInput
                divclassName="mb-3"
                labelclassName="addUserNotLabel"
                labelText="Street No"
                inputclassName="DetailsInput"
                inputName="Line2"
                handleChange={handleChange}
                value={data.Line2}
              />{" "}
            </div>
          </div>

          <div className="AddUsersInformationUpdateBtnContainer">
            <Link to="/employeepage">
              {" "}
              <CustomButton className="AddUsersInformationCancelBtn">
                Cancel
              </CustomButton>
            </Link>
            <CustomButton
              className="add-user-btn-submit"
              htmlType="submit"
              type="primary"
            >
              {userID ? "Update User" : "Update Profile"}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUsers;
