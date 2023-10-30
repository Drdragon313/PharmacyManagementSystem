import React from "react";
import "./AddUsers.css";
import Input from "antd/es/input/Input";
import { PhoneInput } from "react-international-phone";
import ProfilePhoto from "../../Components/Images/ProfilePhoto.svg";
const AddUsers = () => {
  return (
    <div className="AddUsersBasicContainer">
      <div className="AddUsersBasicInfoHeading">
        <h5>Add User</h5>
      </div>
      <div className="AddUsersProfilePhoto">
        <img className="AddUsersProfileImg" src={ProfilePhoto} alt="User Pic" />
      </div>
      <div className="AddUsersDetails">
        <div className="AddUsersOneDetails">
          <form>
            <div className="mb-3">
              <label htmlFor="FName">First Name</label>
              <br />
              <Input className="AddUsersDetailsInput" name="FName" />
            </div>

            <div className="mb-3">
              <label htmlFor="Department">Department</label>
              <br />
              <Input name="Department" className="AddUsersDetailsInput" />
            </div>
            <div className="mb-3">
              <label htmlFor="Role">Role</label>
              <br />
              <Input name="Role" className="AddUsersDetailsInput" />
            </div>
          </form>
        </div>
        <div className="AddUsersTwoDetails">
          <form>
            <div className="mb-3">
              <label htmlFor="LName">Last Name</label>
              <br />
              <Input className="AddUsersDetailsInput" name="LName" />
            </div>
            <div className="mb-3">
              <label htmlFor="Salary">Salary</label>
              <br />
              <Input
                className="AddUsersDetailsInput"
                type="number"
                name="Salary"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="DateOfBirth">Date of Birth</label>
              <br />
              <Input
                type="date"
                name="DateOfBirth"
                className="AddUsersDetailsInput"
              />
            </div>
          </form>
        </div>
        <div className="AddUsersThreeDetails">
          <form>
            <div className="mb-3">
              <label htmlFor="Gender">Gender</label>
              <br />
              <select
                className="form-select AddUsersDetailsInput"
                name="Gender"
              >
                <option value="">Select Gender</option>
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
                name="Contact"
                className="AddUsersDetailsInput react-international-phone-input react-international-phone-input-container"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Designation">Designation</label>
              <br />
              <Input name="Designation" className="AddUsersDetailsInput" />
            </div>
          </form>
        </div>
      </div>
      <div className="InformationUpdateBtnContainer">
        <button
          type="button"
          className="btn btn-light AddUsersInformationUpdateBtn"
        >
          Create User
        </button>
      </div>
    </div>
  );
};

export default AddUsers;
