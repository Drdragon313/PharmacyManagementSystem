import React, { useState } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
import SignInFirstModal from "../../Components/SingInFirstModal/SignInFirstModal";
import CustomButton from "../../Components/CustomButton/CustomButton";

const Users = () => {
  const authToken = localStorage.getItem("AuthorizationToken");
  const [modalVisible, setModalVisible] = useState(!authToken);

  if (!authToken) {
    const openModal = () => {
      setModalVisible(true);
    };
    return <SignInFirstModal visible={modalVisible} open={openModal} />;
  }
  return (
    <div className="cardscontainer">
      <div className="ContainerButtons">
        <div>
          <Link to="/users/AddUser">
            <CustomButton type="default" className="gridStyleButtons">
              List of Employees
            </CustomButton>
          </Link>
          {/* <Link to="/rolesandpermissions">
            <Button className="gridStyleButtons">
              Assign Roles and Permissions
            </Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Users;
