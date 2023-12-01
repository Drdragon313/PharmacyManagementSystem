import React, { useState } from "react";
import "./AddUsers.css";
import Input from "antd/es/input/Input";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import axios from "axios";
import { message } from "antd";
import { getMaxDate } from "../../Utility Function/DateUtils";
import { getMinDate } from "../../Utility Function/DateUtils";
import { handleBlur } from "../../Utility Function/DateUtils";
import {
  AddressHandler,
  PostCodeHandler,
} from "../../Utility Function/PostCodeUtils";
import CustomInput from "../../Components/CustomInput/CustomInput";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
const AddUsers = () => {
  const [data, setData] = useState({
    FName: "",
    Gender: "",
    LName: "",
    Role: "",
    Permissions: "",
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
  });
  const [pCodeResponse, setPCodeResponse] = useState([]);
  const handleFindAddress = () => {
    PostCodeHandler(data, setPCodeResponse);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.FName || !data.LName || !data.Email) {
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
          Permissions: "",
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
    if (fieldName === "Address") {
      const selectedAddress = pCodeResponse.find(
        (item) => item.address === value
      );
      const selectedUdprn = selectedAddress.udprn;
      console.log("Selected udpRN:", selectedUdprn);
      AddressHandler(setData, selectedUdprn);
    }
  };
  return (
    <div className="AddUsersBasicContainer">
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
                labelclassName="adduserNotLabel"
                labelText="Gender"
                selectclassName="GenderInput ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                name="Gender"
                onChange={handleSelectChange}
                value={data.Gender}
                options={["Male", "Female", "Other", "Do Not Wish to Disclose"]}
              />
              <div className="mb-3">
                <label htmlFor="Contact" className="adduserNotLabel">
                  Contact number
                </label>
                <br />
                <Input
                  className="AddUsersDetailsInput"
                  name="Contact"
                  onChange={handleChange}
                />
              </div>
              <CustomSelect
                divclassName="mb-3"
                labelclassName="adduserNotLabel"
                labelText="Role"
                selectclassName="GenderInput ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                name="Role"
                onChange={(value) => handleSelectChange("Role", value)}
                options={["Senior Manager", "Pharmacy Manager", "User"]}
              />
              <CustomSelect
                divclassName="mb-3"
                labelclassName="adduserNotLabel"
                labelText="Pharmacy"
                selectclassName="GenderInput ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                name="Pharmacy"
                onChange={(value) => handleSelectChange("Pharmacy", value)}
                value={data.Pharmacy}
                options={["Pharmacy 1", "Pharmacy 2", "Pharmacy 3"]}
              />
              <CustomInput
                divclassName="mb-3"
                labelclassName="adduserNotLabel"
                labelText="Search your postcode"
                inputclassName="AddUsersDetailsInput"
                inputName="postCode"
                handleChange={handleChange}
                handleBlur={handleFindAddress}
                value={data.postCode}
              />
              <CustomInput
                divclassName="mb-3"
                labelclassName="adduserNotLabel"
                labelText="Address Line 1"
                inputclassName="AddUsersDetailsInput"
                inputName="Line1"
                handleChange={handleChange}
                value={data.Line1}
              />
              <CustomInput
                divclassName="mb-3"
                labelclassName="adduserNotLabel"
                labelText="Post Town"
                inputclassName="AddUsersDetailsInput"
                inputName="postTown"
                handleChange={handleChange}
                value={data.postTown}
              />
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
                <label htmlFor="DOB" className="adduserNotLabel">
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
              <CustomSelect
                divclassName="mb-3"
                labelclassName="adduserNotLabel"
                labelText="Permissions"
                selectclassName="GenderInput ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                name="Permissions"
                onChange={(value) => handleSelectChange("Permissions", value)}
                options={["Senior Manager", "Pharmacy Manager", "User"]}
              />

              <CustomInput
                divclassName="mb-3"
                labelclassName="adduserNotLabel"
                labelText="Line manager"
                inputclassName="AddUsersDetailsInput"
                inputName="Line_Manager"
                handleChange={handleChange}
                value={data.Line_Manager}
              />
              <CustomSelect
                divclassName="mb-3"
                labelclassName="adduserNotLabel"
                labelText="Please Select your Address"
                selectclassName="GenderInput ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                name="Address"
                onChange={handleSelectChange}
                options={
                  pCodeResponse ? pCodeResponse.map((item) => item.address) : []
                }
              />
              <CustomInput
                divclassName="mb-3"
                labelclassName="adduserNotLabel"
                labelText="Address Line 2"
                inputclassName="AddUsersDetailsInput"
                inputName="Line2"
                handleChange={handleChange}
                value={data.Line2}
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
