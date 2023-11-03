import React, { useEffect, useState } from "react";
import "./BasicInformation.css";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import Input from "antd/es/input/Input";
import Profile from "../../../Components/Images/Profile.png";
import axios from "axios";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Select, message } from "antd";
import { Country, State, City } from "country-state-city";
import { getMaxDate } from "../../../Utility Function/DateUtils";
import { getMinDate } from "../../../Utility Function/DateUtils";
import { handleBlur } from "../../../Utility Function/DateUtils";
import { baseURL } from "../../../Components/BaseURLAPI/BaseURLAPI";
import {
  handleCountryChange,
  handleStateChange,
  handleCityChange,
} from "../../../Utility Function/AddressUtils";
const { Option } = Select;

const BasicInformation = () => {
  let countryData = Country.getAllCountries();
  let allStateData = State.getAllStates();

  const [stateData, setStateData] = useState();
  const [selectedCountryObject, setSelectedCountryObject] = useState();
  const [cityData, setCityData] = useState();

  const [userData, setUserData] = useState({
    StreetAddress: "",
    Country: "",
    State: "",
    City: "",
    Contact: "",
    DateOfBirth: "",
    Department: "",
    Designation: "",
    Email: "",
    FName: "",
    Gender: "",
    LName: "",
    PostCode: "",
  });

  useEffect(() => {
    const localHeader = localStorage.getItem("AuthorizationToken");
    const headers = {
      Authorization: localHeader,
    };
    axios
      .get(`${baseURL}/get-profile`, { headers })
      .then((response) => {
        const apiUserData = response.data.data;
        setUserData((prevUserData) => ({
          ...prevUserData,
          City: apiUserData.City,
          Contact: apiUserData.Contact,
          Country: apiUserData.Country,
          DateOfBirth: apiUserData.DateOfBirth,
          Department: apiUserData.Department,
          Designation: apiUserData.Designation,
          Email: apiUserData.Email,
          FName: apiUserData.FName,
          Gender: apiUserData.Gender,
          LName: apiUserData.LName,
          PostCode: apiUserData.PostCode,
          State: apiUserData.State,
          StreetAddress: apiUserData.StreetAddress,
        }));
      })
      .catch(() => {
        message.error("Some Error has Occured in Loading Information!", 2);
      });
  }, []);

  const handleUpdate = () => {
    const localHeader = localStorage.getItem("AuthorizationToken");
    const headers = {
      Authorization: localHeader,
    };
    axios
      .put(
        `${baseURL}/update-profile`,
        {
          FName: userData.FName,
          LName: userData.LName,
          Contact: userData.Contact,
          StreetAddress: userData.StreetAddress,
          Country: userData.Country,
          State: userData.State,
          City: userData.City,
          PostCode: userData.PostCode,
          DateOfBirth: userData.DateOfBirth.toString(),
          Gender: userData.Gender,
        },
        { headers }
      )
      .then(() => {
        message.success("Data Updated Successfully!", 2);
      })
      .catch(() => {
        message.error("Data Updation Failed!", 2);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const handlePhoneChange = (value, name) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  return (
    <div className="BasicContainer">
      <div className="BasicInfoHeading">
        <h5>Basic Information</h5>
      </div>
      <div className="ProfilePhoto">
        <img
          className="ProfileImg"
          src={Profile}
          height={200}
          width={200}
          alt="User Pic"
        />
      </div>
      <div className="UserDetails">
        <div className="OneDetails">
          <form>
            <div className="mb-3">
              <label htmlFor="FName">First Name</label>
              <br />
              <Input
                onChange={handleChange}
                value={userData.FName}
                className="BasicUserDetailsInput"
                prefix={<UserOutlined />}
                name="FName"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Gender">Gender</label>
              <br />
              <select
                className="form-select BasicUserDetailsInput"
                name="Gender"
                value={userData.Gender}
                onChange={handleChange}
              >
                <option value="">Select Your Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Do Not Wish to Disclose">
                  Do Not Wish to Disclose
                </option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="Contact">Contact</label>
              <br />
              <PhoneInput
                defaultCountry="ua"
                value={userData.Contact}
                onChange={(value) => handlePhoneChange(value, "Contact")}
                name="Contact"
                className=" basic-react-international-phone-input BasicUserDetailsInput react-international-phone-input-container"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Department">Department</label>
              <br />
              <Input
                value={userData.Department}
                disabled={true}
                onChange={handleChange}
                name="Department"
                className="BasicUserDetailsInput"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Country">Address</label>
              <br />
              <Select
                className="basic-ant-select-selector basic-ant-select-arrow"
                name="Country"
                value={userData.Country}
                onChange={(selectedCountryValue) =>
                  handleCountryChange(
                    selectedCountryValue,
                    setSelectedCountryObject,
                    setStateData,
                    setUserData,
                    countryData,
                    State
                  )
                }
              >
                <Option value="">Select a Country</Option>
                {countryData &&
                  countryData.map((country) => (
                    <Option key={country.isoCode} value={country.name}>
                      {country.name}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className="mb-3">
              <label htmlFor="City">City</label>
              <br />
              <Select
                className="basic-ant-select-selector basic-ant-select-arrow"
                name="City"
                value={userData.City}
                onChange={(selectedCityValue) => {
                  handleCityChange(selectedCityValue, setUserData);
                }}
              >
                <Option value="">Select a City</Option>
                {userData.Country &&
                  userData.State &&
                  cityData &&
                  cityData.map((city) => (
                    <Option key={city.id} value={city.name}>
                      {city.name}
                    </Option>
                  ))}
              </Select>
            </div>
          </form>
        </div>
        <div className="TwoDetails">
          <form>
            <div className="mb-3">
              <label htmlFor="LName">Last Name</label>
              <br />
              <Input
                onChange={handleChange}
                value={userData.LName}
                className="BasicUserDetailsInput"
                prefix={<UserOutlined />}
                name="LName"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email">Email Address</label>
              <br />
              <Input
                onChange={handleChange}
                value={userData.Email}
                disabled={true}
                className="BasicUserDetailsInput"
                prefix={<MailOutlined />}
                type="email"
                name="Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="DateOfBirth">Date of Birth</label>
              <br />
              <Input
                value={userData.DateOfBirth}
                onChange={handleChange}
                onBlur={(e) =>
                  handleBlur(
                    "DateOfBirth",
                    e.target.value,
                    userData,
                    setUserData
                  )
                }
                type="date"
                name="DateOfBirth"
                className="BasicUserDetailsInput"
                max={getMaxDate()}
                min={getMinDate()}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Designation">Designation</label>
              <br />
              <Input
                value={userData.Designation}
                disabled={true}
                onChange={handleChange}
                name="Designation"
                className="BasicUserDetailsInput"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="State">State/County</label>
              <br />
              <Select
                className="basic-ant-select-selector basic-ant-select-arrow"
                name="State"
                value={userData.State}
                onChange={(selectedStateValue) =>
                  handleStateChange(
                    selectedStateValue,
                    setCityData,
                    setUserData,
                    City,
                    allStateData,
                    selectedCountryObject
                  )
                }
              >
                <Option value="">Select a state</Option>
                {userData.Country &&
                  stateData &&
                  stateData.map((state) => (
                    <Option key={state.id} value={state.name}>
                      {state.name}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className="mb-3">
              <label htmlFor="StreetAddress">Street Address</label>
              <br />
              <Input
                value={userData.StreetAddress}
                onChange={handleChange}
                name="StreetAddress"
                className="BasicUserDetailsInput"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="PostCode">Post Code</label>
              <br />
              <Input
                value={userData.PostCode}
                onChange={handleChange}
                name="PostCode"
                className="BasicUserDetailsInput"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="BasicInformationUpdateBtnContainer">
        <button
          onClick={handleUpdate}
          type="button"
          className="btn btn-light BasicInformationUpdateBtn"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default BasicInformation;
