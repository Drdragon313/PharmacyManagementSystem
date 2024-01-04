import React, { useState, useEffect } from "react";
import "./AddPharmmacy.css";
import { Input, Select, DatePicker, message } from "antd";
import axios from "axios";
import { baseURL } from "../../Components/BaseURLAPI/BaseURLAPI";
import CustomInput from "../../Components/CustomInput/CustomInput";
import CustomSelect from "../../Components/CustomSelect/CustomSelect";
import moment from "moment";
import {
  AddressHandler,
  PostCodeHandler,
} from "../../Utility Function/PostCodeUtils";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
const { Option } = Select;
const AddPharmacy = () => {
  const [user, setUsers] = useState([]);
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const users = selectedUsers;
  console.log(users);
  const [data, setData] = useState({
    pharmacyName: "",
    dateOfCreation: "",
    rent: null,
    Line1: "",
    Line2: "",
    postCode: "",
    postTown: "",
    users: [],
  });

  useEffect(() => {
    axios
      .get(`${baseURL}/list-users`)
      .then((response) => {
        if (response.data.status === "success") {
          setUsers(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const [pCodeResponse, setPCodeResponse] = useState([]);
  const handleFindAddress = () => {
    PostCodeHandler(data, setPCodeResponse);
  };
  const handleDateChange = (date, dateString) => {
    const currentDate = new Date();
    const selectedDate = new Date(dateString);

    if (selectedDate > currentDate) {
      message.error("Date of creation cannot be in the future");
    } else if (currentDate.getFullYear() - selectedDate.getFullYear() > 100) {
      message.error("Date of creation cannot be more than 100 years ago");
    } else {
      setData((prevUserData) => ({
        ...prevUserData,
        dateOfCreation: dateString,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "rent" && parseInt(value) < 0) {
      message.error("Rent cannot be less than 0");
    } else {
      setData((prevUserData) => ({
        ...prevUserData,
        [name]: name === "rent" ? parseInt(value) : value,
      }));
    }
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
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${baseURL}/create-pharmacy`, data)
      .then((response) => {
        console.log("Pharmacy created successfully:", response.data);
        message.success("Pharmacy Created Successfully");
        navigate("/pharmacies");
        setData({
          pharmacyName: "",
          dateOfCreation: "",
          rent: null,
          Line1: "",
          Line2: "",
          postCode: "",
          postTown: "",
          users: [],
        });
        setSelectedUsers([]);
      })
      .catch((error) => {
        console.error("Error creating pharmacy:", error);
      });
  };
  const breadcrumbItems = [
    { label: "Pharmacy", link: "/pharmacies" },
    { label: "Add Pharmacy", link: "/pharmacies/AddPharmacy" },
  ];
  return (
    <div className="AddPharmacyBasicContainer">
      <div className="breadcrumb-border-add-pharmacy">
        <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
      </div>

      <div className="AddPharmacyBasicInfoHeading">
        <h5 className="Pharmacycreationtxt">New pharmacy creation</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="AddPharmacyDetails">
          <div className="AddPharmacyOneDetails">
            <form>
              <div className="mb-3">
                <label htmlFor="PharmacyName" className="addPharmacyLabel">
                  Pharmacy name
                </label>
                <br />
                <Input
                  required={true}
                  className="AddPharmacyDetailsInput"
                  name="PharmacyName"
                  onChange={handleChange}
                  value={data.pharmacyName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="rent" className="addPharmacyNotLabel">
                  Rent
                </label>
                <br />
                <Input
                  className="AddPharmacyDetailsInput"
                  type="number"
                  name="rent"
                  onChange={handleChange}
                  value={data.rent}
                />
              </div>

              <CustomInput
                divclassName="mb-3"
                labelclassName="adduserNotLabel"
                labelText="Postcode"
                inputclassName="AddUsersDetailsInput"
                inputName="postCode"
                handleChange={handleChange}
                handleBlur={handleFindAddress}
                value={data.postCode}
              />
              <div
                direction="horizontal"
                style={{ display: "flex", flexDirection: "row", gap: "47px" }}
                className="mb-3 "
              >
                <CustomInput
                  // divclassName="mb-3"
                  style={{ width: "160px" }}
                  labelclassName="adduserNotLabel"
                  labelText="Building Name"
                  inputclassName="AddUsersDetailsInput"
                  inputName="Line1"
                  handleChange={handleChange}
                  value={data.Line1}
                />
                <CustomInput
                  // divclassName="mb-3"
                  style={{ width: "150px" }}
                  labelclassName="addPharmacyNotLabel"
                  labelText="Street Name"
                  inputclassName="AddUsersDetailsInput"
                  inputName="Line2"
                  handleChange={handleChange}
                  value={data.Line2}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="users" className="addPharmacyNotLabel">
                  Add users in pharmacy
                </label>
                <br />
                <Select
                  mode="multiple"
                  className="select-custom"
                  style={{ width: "100%", height: "100%" }}
                  name="users"
                  onChange={(values) => {
                    const selectedUsersArray = user.filter((user) =>
                      values.includes(user.id.toString())
                    );
                    setSelectedUsers(selectedUsersArray);

                    setData((prevData) => ({
                      ...prevData,
                      users: selectedUsersArray,
                    }));
                  }}
                >
                  {user.map((user) => (
                    <Option
                      className="add-user-in-pharm-select"
                      key={user.id}
                      value={user.id.toString()}
                    >
                      {user.name} - {user.email}
                    </Option>
                  ))}
                </Select>
              </div>
            </form>
          </div>
          <div className="AddPharmacyTwoDetails">
            <form>
              <div className="mb-3">
                <label htmlFor="dateOfCreation" className="dateOfCreationLabel">
                  Date of creation
                </label>
                <br />
                <DatePicker
                  className="AddPharmacyDetailsInput"
                  format="YYYY-MM-DD"
                  name="dateOfCreation"
                  onChange={handleDateChange}
                  disabledDate={(current) =>
                    current &&
                    (current > moment().endOf("day") ||
                      current < moment().subtract(100, "years"))
                  }
                />
              </div>

              <div className="mb-3">
                <label
                  className="addPharmacyNotLabel"
                  htmlFor="PharmacyManager"
                >
                  Pharmacy manager
                </label>
                <br />
                <Select
                  className="AddPharmacySelect ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                  name="PharmacyManager"
                  onChange={handleSelectChange}
                >
                  <Option value="Male">manager1</Option>
                  <Option value="Female">manager2</Option>
                  <Option value="Other">manager3</Option>
                  <Option value="Do Not Wish to Disclose">
                    Do Not Wish to Disclose
                  </Option>
                </Select>
              </div>
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
                value={data.postTown}
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
            </form>
          </div>
          <div className="AddPharmacyThreeDetails"></div>
        </div>
        <div className="AddPharmacyInformationUpdateBtnContainer">
          <Link to="/pharmacies">
            <CustomButton
              type="default"
              className="AddPharmacyInformationCancelBtn"
            >
              Cancel
            </CustomButton>
          </Link>
          <CustomButton
            type="primary"
            htmlType="submit"
            className="AddPharmacyInformationUpdateBtn"
          >
            Create Pharmacy
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default AddPharmacy;
