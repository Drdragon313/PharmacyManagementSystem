import React, { useState, useEffect } from "react";
import "./EditPharmacy.css";
import { useParams } from "react-router-dom";
import { Input, Select, DatePicker, message, Image, Button } from "antd";
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

const { Option } = Select;
const EditPharmacy = () => {
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

  const { pharmacy_id } = useParams();
  useEffect(() => {
    // Fetch pharmacy details for pre-population
    axios
      .get(`${baseURL}/pharmacy-details?pharmacy_id=${pharmacy_id}`)
      .then((response) => {
        if (response.data.status === "success") {
          const pharmacyData = response.data.data;
          console.log(pharmacyData);
          setData({
            pharmacyName: pharmacyData.pharmacyName,
            dateOfCreation: pharmacyData.dateOfCreation,
            rent: pharmacyData.rent,
            Line1: pharmacyData.line1,
            Line2: pharmacyData.line2,
            managerID: pharmacyData.managerID,
            managerName: pharmacyData.managerName,
            postCode: pharmacyData.postCode,
            postTown: pharmacyData.postTown,
            users: pharmacyData.users,
          });
          setSelectedUsers(pharmacyData.users);
        }
      })
      .catch((error) => {
        console.error("Error fetching pharmacy details:", error);
      });

    // Fetch list of users for the Select dropdown
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
  }, [pharmacy_id]);

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
      .post(`${baseURL}/update-pharmacy?pharmacy_id=${pharmacy_id}`, data)
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
  const [isAddEmployeeModalVisible, setAddEmployeeModalVisible] =
    useState(false);

  // Function to open the modal
  const openAddEmployeeModal = () => {
    setAddEmployeeModalVisible(true);
  };

  // Function to close the modal
  const closeAddEmployeeModal = () => {
    setAddEmployeeModalVisible(false);
  };

  // Function to update the users array
  const onAddEmployee = (selectedEmployeeData) => {
    // Combine the existing users and the newly selected employees
    const updatedUsers = [...selectedUsers, ...selectedEmployeeData];

    // Remove duplicates based on employee id
    const uniqueUsers = updatedUsers.reduce((acc, user) => {
      if (!acc.find((u) => u.id === user.id)) {
        acc.push(user);
      }
      return acc;
    }, []);

    // Update the state with the unique user array
    setSelectedUsers(uniqueUsers);
  };
  const breadcrumbItems = [
    { label: "Pharmacy", link: "/pharmacies" },
    { label: "Edit Pharmacy", link: `/pharmacies/${pharmacy_id}/pharmacyedit` },
  ];
  return (
    <div className="AddPharmacyBasicContainer">
      <div className="breadcrumb-border-add-pharmacy">
        <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
      </div>

      <div className="AddPharmacyBasicInfoHeading">
        <h5 className="Pharmacycreationtxt">Edit pharmacy</h5>
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

              <Button
                type="dashed"
                className="plus-btn-edit-pharm"
                onClick={openAddEmployeeModal}
              >
                <Image
                  className="plus-outline-img"
                  preview={false}
                  src={plusOutline}
                ></Image>
                Add employee to pharmacy
              </Button>
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
                <label className="addPharmacyNotLabel" htmlFor="managerName">
                  Pharmacy manager
                </label>
                <br />
                <Select
                  className="AddPharmacySelect ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                  name="managerName"
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
      <AddEmployeeModalEditPharm
        open={isAddEmployeeModalVisible}
        onClose={closeAddEmployeeModal}
        pharmacyId={pharmacy_id}
        onAddEmployee={onAddEmployee}
      />
    </div>
  );
};

export default EditPharmacy;
