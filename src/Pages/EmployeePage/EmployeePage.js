// EmployeePage.js
import React, { useState } from "react";
import "./Employeepage.css";

import Roles from "../../Components/RolesAndPermissions/Roles";
import CustomSwitch from "../../Components/CustomSwitch/CustomSwitch"; // Adjust the import path based on your project structure
import EmployeeListing from "../EmployeeListing/EmployeeListing";

const EmployeePage = () => {
  const [displayUsers, setDisplayUsers] = useState(true);
  const handleSwitchChange = (checked) => {
    setDisplayUsers(checked);
  };
  return (
    <div>
      <CustomSwitch checked={displayUsers} onChange={handleSwitchChange} />
      {displayUsers ? <EmployeeListing /> : <Roles />}
    </div>
  );
};

export default EmployeePage;
