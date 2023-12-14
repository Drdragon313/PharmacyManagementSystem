// EmployeePage.js
import React, { useState } from "react";
import "./Employeepage.css";
import Users from "../Users/Users";
import Roles from "../../Components/RolesAndPermissions/Roles";
import CustomSwitch from "../../Components/CustomSwitch/CustomSwitch"; // Adjust the import path based on your project structure

const EmployeePage = () => {
  const [displayUsers, setDisplayUsers] = useState(true);

  const handleSwitchChange = (checked) => {
    setDisplayUsers(checked);
  };

  return (
    <div className="employee-page-container">
      <CustomSwitch checked={displayUsers} onChange={handleSwitchChange} />
      {displayUsers ? <Users /> : <Roles />}
    </div>
  );
};

export default EmployeePage;
