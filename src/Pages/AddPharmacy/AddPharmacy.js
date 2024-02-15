import React, { useState, useEffect } from "react";
import "./AddPharmmacy.css";

import { Input, Select, DatePicker, message, Button, Image } from "antd";
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
import AddEmployeeModalEditPharm from "../../Components/AddEmployeeModalEditPharm/AddEmployeeModalEditPharm";
import plusOutline from "../../Assets/add-circle-line-blue.svg";
const AddPharmacy = () => {
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = selectedUsers;
  const { Option } = Select;

  console.log(users);
  const [data, setData] = useState({
    pharmacyName: "",
    dateOfCreation: "",
    rent: null,
    Line1: "",
    Line2: "",
    postCode: "",
    postTown: "",
    managerID: null,
    users: [],
  });
  const pharmacy_id = "";
  useEffect(() => {
    axios
      .get(`${baseURL}/list-pharmacy-managers`)
      .then((response) => {
        if (response.data.status === "success") {
          setManagers(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching pharmacy managers:", error);
      });
  }, []);

  const [pCodeResponse, setPCodeResponse] = useState([]);

  const handleFindAddress = () => {
    const { postCode, value } = data;

    PostCodeHandler(data, setPCodeResponse);

    if (postCode !== value) {
      message.warning("Please update the address according to the postcode");

      setData((prevUserData) => ({
        ...prevUserData,
        Line1: "",
        Line2: "",
        postTown: "",
      }));
    }
  };

  const handleDateChange = (date, dateString) => {
    const currentDate = moment();
    const selectedDate = moment(dateString, "DD-MM-YYYY");

    if (selectedDate.isAfter(currentDate, "day")) {
      message.error("Date of creation cannot be in the future");
    } else if (currentDate.diff(selectedDate, "years") > 100) {
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
    if (fieldName === "PharmacyManager") {
      const managerId = value;

      setData((prevData) => ({
        ...prevData,
        managerID: managerId,
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
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.managerID) {
      message.error(
        "Please select a Pharmacy Manager before creating the pharmacy"
      );
      return;
    }
    if (!data.postCode || !data.postTown) {
      message.error("Please select the appropriate address");
      return;
    }

    if (!data.pharmacyName) {
      message.error("Please Enter a Name for your pharmacy");
      return;
    }
    const updatedData = {
      ...data,
      users: users,
    };

    axios
      .post(`${baseURL}/create-pharmacy`, updatedData)
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
          managerID: null,
          users: [],
        });
        setSelectedUsers([]);
      })
      .catch((error) => {
        console.error("Error creating pharmacy:", error);
        message.error("Error creating pharmacy", 3);
      });
  };

  const [isAddEmployeeModalVisible, setAddEmployeeModalVisible] =
    useState(false);

  const openAddEmployeeModal = () => {
    setAddEmployeeModalVisible(true);
  };

  const closeAddEmployeeModal = () => {
    setAddEmployeeModalVisible(false);
  };

  const updateUsersArray = (selectedUsers) => {
    setSelectedUsers(selectedUsers);
    console.log("selected user", selectedUsers);
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
                  name="pharmacyName"
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
                required={true}
              />

              <CustomInput
                divclassName="mb-3"
                labelText="Building Name"
                inputclassName="AddUsersDetailsInput"
                inputName="Line1"
                handleChange={handleChange}
                value={data.Line1}
                required={true}
              />
              <CustomInput
                divclassName="mb-3"
                labelclassName="addPharmacyNotLabel"
                labelText="Street Name"
                inputclassName="AddUsersDetailsInput"
                inputName="Line2"
                handleChange={handleChange}
                value={data.Line2}
              />

              <div className="mb-3">
                <label htmlFor="users" className="addPharmacyNotLabel">
                  Add users in pharmacy
                </label>
                <br />
                <Button
                  type="dashed"
                  className="dashed-btn-add-emp"
                  onClick={openAddEmployeeModal}
                >
                  <Image
                    className="plus-outline-img"
                    preview={false}
                    src={plusOutline}
                  ></Image>
                  Add employee to pharmacy
                </Button>
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
                  format="DD-MM-YYYY"
                  name="dateOfCreation"
                  onChange={handleDateChange}
                  disabledDate={(current) =>
                    current && current.isAfter(moment().endOf("day"))
                  }
                />
              </div>

              <div className="mb-3">
                <label className="addPharmacyManager" htmlFor="managerName">
                  Pharmacy manager
                </label>
                <br />
                <Select
                  className="AddPharmacySelect ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                  name="managerName"
                  onChange={(value) =>
                    handleSelectChange("PharmacyManager", value)
                  }
                  value={data.managerID}
                  required={true}
                >
                  {managers.map((manager) => (
                    <Option key={manager.id} value={manager.id}>
                      {manager.name}
                    </Option>
                  ))}
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
                labelText="Post Town"
                inputclassName="AddUsersDetailsInput"
                inputName="postTown"
                handleChange={handleChange}
                value={data.postTown}
                required={true}
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
      <AddEmployeeModalEditPharm
        open={isAddEmployeeModalVisible}
        onClose={closeAddEmployeeModal}
        onAddEmployee={updateUsersArray}
        pharmacy_id={pharmacy_id}
      />
    </div>
  );
};

export default AddPharmacy;
