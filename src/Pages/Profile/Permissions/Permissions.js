import React from "react";
import "./Permissions.css";
const Permissions = () => {
  return (
    <div className="PermissionsContainer">
      <div className="PermissionsInnerContainer">
        <h5>Accont Permissions</h5>
        <p className="PermissionsText">
          <strong>
            Following are the list of permissions that are granted access to you
            from your admin.
          </strong>
        </p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            checked
          />
          <label
            className="form-check-label PermisionsLabel"
            for="flexCheckChecked"
          >
            Enter Data for a dedicated Pharmacy daily such as Prescription.
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            checked
          />
          <label
            className="form-check-label PermisionsLabel"
            for="flexCheckChecked"
          >
            Visualize the data user enters in graph and tabular form.
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            checked
          />
          <label
            className="form-check-label PermisionsLabel"
            for="flexCheckChecked"
          >
            Total Amount of money that has been spent to buy new stock
          </label>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
