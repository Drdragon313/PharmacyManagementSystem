import React, { useEffect, useState } from "react";
import "./BasicInformation.css";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import Input from "antd/es/input/Input";
import ProfilePhoto from "../../../Components/Images/ProfilePhoto.svg";
import axios from "axios";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { message } from "antd";
import { Country, State, City } from "country-state-city";
import { getMaxDate } from "../../../Utility Function/DateUtils";
import { baseURL } from "../../../Components/BaseURLAPI/BaseURLAPI";

const BasicInformation = () => {
  let countryData = Country.getAllCountries();
  let allStateData = State.getAllStates();

  const [stateData, setStateData] = useState();
  const [selectedCountryObject, setSelectedCountryObject] = useState();
  const [cityData, setCityData] = useState();

  const handleCountryChange = (event) => {
    const selectedCountryValue = event.target.value;
    const selectedCountry = countryData.find(
      (country) => country.name === selectedCountryValue
    );
    setSelectedCountryObject(selectedCountry);
    console.log("selected Country", selectedCountry.isoCode);
    const statesForSelectedCountry = State.getStatesOfCountry(
      selectedCountry.isoCode
    );
    setStateData(statesForSelectedCountry);
    console.log("states for selected county", stateData);
    setUserData((prevUserData) => ({
      ...prevUserData,
      Country: selectedCountryValue,
    }));
    console.log("UseState Object for API:", userData);
  };

  const handleStateChange = (event) => {
    const SelectedStateValue = event.target.value;
    const currentState = allStateData.find(
      (state) => state.name === SelectedStateValue
    );
    console.log("selected country object:", selectedCountryObject);
    const citiesForSelectedState = City.getCitiesOfState(
      selectedCountryObject.isoCode,
      currentState.isoCode
    );
    setCityData(citiesForSelectedState);
    console.log("Cities for selected state:", citiesForSelectedState);
    console.log("current State", currentState);
    setUserData((prevUserData) => ({
      ...prevUserData,
      State: SelectedStateValue,
    }));
    console.log("UseState Object for State:", userData);
  };

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
        console.log("APIGETUSERDATA", apiUserData);
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
        console.log("This is the result of USEState from get API", userData);
      })
      .catch((error) => {
        console.log(error);
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
        },
        { headers }
      )
      .then((response) => {
        message.success("Data Updated Successfully!", 2);
      })
      .catch((error) => {
        message.error("Data Updation Failed!", 2);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    console.log("UseState Object for API:", userData);
  };
  const handlePhoneChange = (value, name) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    console.log("UseState Object for API:", userData);
  };

  return (
    <div className="BasicContainer">
      <div className="BasicInfoHeading">
        <h5>Basic Information</h5>
      </div>
      <div className="ProfilePhoto">
        <img className="ProfileImg" src={ProfilePhoto} alt="User Pic" />
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
                className="UserDetailsInput"
                prefix={<UserOutlined />}
                size="medium"
                type="email"
                name="FName"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Gender">Gender</label>
              <br />
              <Input
                value={userData.Gender}
                onChange={handleChange}
                disabled={true}
                name="Gender"
                prefix={<UserOutlined />}
                className="UserDetailsInput"
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Contact">Contact</label>
              <br />
              <PhoneInput
                defaultCountry="ua"
                value={userData.Contact}
                onChange={(value) => handlePhoneChange(value, "Contact")}
                name="Contact"
                className="UserDetailsInput react-international-phone-input react-international-phone-input-container"
                required={true}
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
                className="UserDetailsInput"
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Country">Address</label>
              <br />
              <select
                className="form-select UserDetailsInput"
                name="Country"
                value={userData.Country}
                onChange={handleCountryChange}
              >
                <option value="">Select a country</option>
                {countryData &&
                  countryData.map((country) => (
                    <option key={country.isoCode} value={country.name}>
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="City">City</label>
              <br />
              {console.log("The City Value is", userData.City)}
              <select
                className="form-select UserDetailsInput"
                name="City"
                value={userData.City}
                onChange={handleChange}
              >
                <option value="">Select a city</option>
                {userData.Country &&
                  userData.State &&
                  cityData &&
                  cityData.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
              </select>
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
                className="UserDetailsInput"
                prefix={<UserOutlined />}
                size="medium"
                type="email"
                name="LName"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email">Email Address</label>
              <br />
              <Input
                onChange={handleChange}
                value={userData.Email}
                disabled={true}
                className="UserDetailsInput"
                prefix={<MailOutlined />}
                size="medium"
                type="email"
                name="Email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="DateOfBirth">Date of Birth</label>
              <br />
              <Input
                value={userData.DateOfBirth}
                onChange={handleChange}
                type="date"
                name="DateOfBirth"
                className="UserDetailsInput"
                required={true}
                max={getMaxDate()}
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
                className="UserDetailsInput"
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="State">State</label>
              <br />
              <select
                className="form-select UserDetailsInput"
                name="State"
                value={userData.State}
                onChange={handleStateChange}
              >
                {console.log("The State Value is", userData.State)}
                <option value="">Select a state</option>
                {userData.Country &&
                  stateData &&
                  stateData.map((state) => (
                    <option key={state.id} value={state.name}>
                      {state.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="StreetAddress">Street Address</label>
              <br />
              <Input
                value={userData.StreetAddress}
                onChange={handleChange}
                name="StreetAddress"
                className="UserDetailsInput"
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="PostCode">Post Code</label>
              <br />
              <Input
                value={userData.PostCode}
                onChange={handleChange}
                name="PostCode"
                className="UserDetailsInput"
                required={true}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="InformationUpdateBtnContainer">
        <button
          onClick={handleUpdate}
          type="button"
          className="btn btn-light InformationUpdateBtn"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default BasicInformation;
