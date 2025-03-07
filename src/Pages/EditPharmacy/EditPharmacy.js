import React, { useState, useEffect } from "react";
import "./EditPharmacy.css";
import { debounce } from "lodash";
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
import { fetchUserPermissions } from "../../Utility Function/ModulesAndPermissions";
import Spinner from "../../Components/Spinner/Spinner";
import AccessDenied from "../AccessDenied/AccessDenied";

const { Option } = Select;
const EditPharmacy = () => {
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [initialSelectedUsers, setInitialSelectedUsers] = useState([]);
  const [permissions, setUserPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [managers, setManagers] = useState([]);
  const users = selectedUsers;
  console.log(users);
  const [data, setData] = useState({
    pharmacyName: "",
    dateOfCreation: "",
    rent: null,
    managerName: "",
    Line1: "",
    Line2: "",
    postCode: "",
    postTown: "",
    users: [],
  });

  const { pharmacy_id } = useParams();
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
        }
        setInitialSelectedUsers(
          response.data.data.users.map((user) => user.id)
        );
      })

      .catch((error) => {
        console.error("Error fetching pharmacy details:", error);
      });
  }, [pharmacy_id]);
  useEffect(() => {
    const fetchUserPermissionData = async () => {
      try {
        await fetchUserPermissions(setUserPermissions);
      } catch (error) {
        console.error("Error fetching user permissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPermissionData();
  }, []);

  const canEditPharmacy =
    permissions?.find((module) => module.module_name === "Pharmacy")?.actions
      ?.update || false;

  const [pCodeResponse, setPCodeResponse] = useState([]);
  const handleFindAddress = debounce(() => {
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
  }, 200);

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
    if (fieldName === "Address") {
      const selectedAddress = pCodeResponse.find(
        (item) => item.address === value
      );
      const selectedUdprn = selectedAddress.udprn;
      console.log("Selected udpRN:", selectedUdprn);
      AddressHandler(setData, selectedUdprn);
    }

    if (fieldName === "managerName") {
      setData((prevData) => ({
        ...prevData,
        managerID: value,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...data,

      users: users,
    };

    axios
      .post(
        `${baseURL}/update-pharmacy?pharmacy_id=${pharmacy_id}`,
        updatedData
      )
      .then((response) => {
        console.log("Pharmacy updated successfully:", response.data);
        message.success("Pharmacy Updated Successfully");
        navigate("/pharmacies");
        setData({
          pharmacyName: "",
          dateOfCreation: "",
          rent: null,
          manager_id: null,
          line1: "",
          line2: "",
          postCode: "",
          postTown: "",
          users: [],
        });
      })
      .catch((error) => {
        console.error("Error updating pharmacy:", error);
      });
  };
  const [isAddEmployeeModalVisible, setAddEmployeeModalVisible] =
    useState(false);

  const openAddEmployeeModal = () => {
    setAddEmployeeModalVisible(true);
  };

  // Function to close the modal
  const closeAddEmployeeModal = () => {
    setAddEmployeeModalVisible(false);
  };

  const updateUsersArray = (selectedUsers) => {
    setSelectedUsers(selectedUsers);
    console.log("selected user", selectedUsers);
  };

  const breadcrumbItems = [
    { label: "Pharmacy", link: "/pharmacies" },
    { label: "Edit Pharmacy", link: `/pharmacies/${pharmacy_id}/pharmacyedit` },
  ];

  if (loading === true) {
    return <Spinner />;
  }
  return (
    <>
      {canEditPharmacy ? (
        <div className="AddPharmacyBasicContainer">
          <div className="breadcrumb-border-add-pharmacy">
            <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
          </div>

          <div className="AddPharmacyBasicInfoHeading">
            <h5 className="Pharmacycreationtxt">Edit pharmacy</h5>
          </div>
          <div className="AddPharmacyDetails">
            <form onSubmit={handleSubmit}>
              <div className="adjacent-fields">
                {" "}
                <div className="mb-3">
                  <label htmlFor="PharmacyName" className="addPharmacyLabel">
                    Pharmacy name
                  </label>
                  <br />
                  <Input
                    required={true}
                    className="AddUsersDetailsInput"
                    name="pharmacyName"
                    onChange={handleChange}
                    value={data.pharmacyName}
                  />
                </div>{" "}
                <div className="mb-3">
                  <label
                    htmlFor="dateOfCreation"
                    className="dateOfCreationLabel"
                  >
                    Date of creation
                  </label>
                  <br />
                  <DatePicker
                    className="AddUsersDetailsInput"
                    format="DD-MM-YYYY"
                    name="dateOfCreation"
                    onChange={handleDateChange}
                    disabledDate={(current) =>
                      current && current.isAfter(moment().endOf("day"))
                    }
                    placeholder={data.dateOfCreation}
                  />
                </div>
              </div>
              <div className="adjacent-fields">
                {" "}
                <div className="mb-3">
                  <label htmlFor="rent" className="addPharmacyNotLabel">
                    Rent
                  </label>
                  <br />
                  <Input
                    className="AddUsersDetailsInput"
                    type="number"
                    name="rent"
                    onChange={handleChange}
                    value={data.rent}
                  />
                </div>{" "}
                <div className="mb-3">
                  <label className="addPharmacyManager" htmlFor="managerName">
                    Pharmacy manager
                  </label>
                  <br />
                  <Select
                    className="AddPharmacySelect ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                    name="managerName"
                    onChange={(value) =>
                      handleSelectChange("managerName", value)
                    }
                    value={data?.managerName}
                  >
                    {managers.map((manager) => (
                      <Option key={manager.id} value={manager.id}>
                        {manager.name}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="adjacent-fields">
                {" "}
                <CustomInput
                  divclassName="mb-3"
                  labelclassName="adduserNotLabel"
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
                  selectclassName="AddPharmacySelect ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                  name="Address"
                  onChange={handleSelectChange}
                  options={
                    pCodeResponse
                      ? pCodeResponse.map((item) => item.address)
                      : []
                  }
                  value={data.postTown}
                />
              </div>
              <div className="adjacent-fields">
                {" "}
                <CustomInput
                  divclassName="mb-3"
                  labelText="Building Name"
                  inputclassName="AddUsersDetailsInput"
                  inputName="Line1"
                  handleChange={handleChange}
                  value={data.Line1}
                />{" "}
                <CustomInput
                  divclassName="mb-3"
                  labelText="Post Town"
                  inputclassName="AddUsersDetailsInput"
                  inputName="postTown"
                  handleChange={handleChange}
                  value={data.postTown}
                />
              </div>

              <CustomInput
                divclassName="mb-3"
                labelclassName="addPharmacyNotLabel"
                labelText="Street Name"
                inputclassName="AddUsersDetailsInput"
                inputName="Line2"
                handleChange={handleChange}
                value={data.Line2}
              />

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
                  Update Pharmacy
                </CustomButton>
              </div>
            </form>
          </div>
          <AddEmployeeModalEditPharm
            open={isAddEmployeeModalVisible}
            onClose={closeAddEmployeeModal}
            pharmacy_id={pharmacy_id}
            onAddEmployee={updateUsersArray}
            initialSelectedUsers={initialSelectedUsers}
          />
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default EditPharmacy;
