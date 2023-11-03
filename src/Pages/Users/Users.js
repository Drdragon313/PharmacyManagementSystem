import React from "react";
import "./Users.css";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <div className="app-container">
      <div className="button-container">
        <div className="button-group">
          <Link to="/users/ViewEmployees">
            <button className="users-action-button">View Employees</button>
          </Link>
          <button className="users-action-button">Roles</button>
        </div>
        <div className="button-group">
          <Link to="/users/AddUser">
            <button className="users-action-button">Add User</button>
          </Link>
          <button className="users-action-button">Permissions</button>
        </div>
      </div>
    </div>
  );
};

export default Users;
