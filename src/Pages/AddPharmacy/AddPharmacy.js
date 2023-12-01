import React from "react";
import "./AddPharmmacy.css";
import { Input, Select } from "antd";
const { Option } = Select;
const AddPharmacy = () => {
  return (
    <div className="AddPharmacyBasicContainer">
      <div className="AddPharmacyBasicInfoHeading">
        <h5 className="Pharmacycreationtxt">New pharmacy creation</h5>
      </div>
      <form>
        <div className="AddPharmacyDetails">
          <div className="AddPharmacyOneDetails">
            <form>
              <div className="mb-3">
                <label htmlFor="FName" className="addPharmacyLabel">
                  Pharmacy name
                </label>
                <br />
                <Input
                  className="AddPharmacyDetailsInput"
                  name="PharmacyName"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="DOB" className="addPharmacyNotLabel">
                  Date of creation
                </label>
                <br />
                <Input
                  className="AddPharmacyDetailsInput"
                  type="date"
                  name="DOB"
                />
              </div>
              <div className="mb-3">
                <label className="addPharmacyNotLabel" htmlFor="Gender">
                  Pharmacy manager
                </label>
                <br />
                <Select
                  className="AddPharmacySelect ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                  name="Gender"
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                  <Option value="Do Not Wish to Disclose">
                    Do Not Wish to Disclose
                  </Option>
                </Select>
              </div>
              <div className="mb-3">
                <label htmlFor="Contact" className="addPharmacyNotLabel">
                  Number of employees
                </label>
                <br />
                <Input
                  type="number"
                  className="AddPharmacyDetailsInput"
                  name="Contact"
                />
              </div>
            </form>
          </div>
          <div className="AddPharmacyTwoDetails">
            <form>
              <div className="mb-3">
                <label htmlFor="LName" className="addPharmacyLabel">
                  Pharmacy Location
                </label>
                <br />
                <Input className="AddPharmacyDetailsInput" name="LName" />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="addPharmacyNotLabel">
                  Rent
                </label>
                <br />
                <Input
                  className="AddPharmacyDetailsInput"
                  type="number"
                  name="Email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Permissions" className="addPharmacyNotLabel">
                  Add users in pharmacy
                </label>
                <br />
                <Select
                  className="AddPharmacySelect ant-select-custom ant-select-selector ant-select-arrow ant-select-selection-placeholder"
                  name="Permissions"
                >
                  <Option value="Senior Manager">Senior Manager</Option>
                  <Option value="Pharmacy Manager">Pharmacy Manager</Option>
                  <Option value="User">User</Option>
                </Select>
              </div>
            </form>
          </div>
          <div className="AddPharmacyThreeDetails"></div>
        </div>
        <div className="AddPharmacyInformationUpdateBtnContainer">
          <button className="btn AddPharmacyInformationCancelBtn">
            Cancel
          </button>
          <button type="submit" className="btn AddPharmacyInformationUpdateBtn">
            Create Pharmacy
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPharmacy;
