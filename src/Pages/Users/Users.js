import React from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Users = () => {
  return (
    <div className="cardscontainer">
      <div className="ContainerButtons">
        <div>
          <Link to="/users/ViewEmployees">
            <Button className="gridStyleButtons">List of Employees</Button>
          </Link>
          <Button className="gridStyleButtons">
            Assign Roles and Permissions
          </Button>
        </div>
        <div>
          <Link to="/users/AddUser">
            <Button className="gridStyleButtons">Create New Employee</Button>
          </Link>
          <Button className="gridStyleButtons">Staffing Cost</Button>
        </div>
      </div>
    </div>
  );
};

export default Users;
