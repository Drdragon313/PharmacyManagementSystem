import React from "react";
import { Button } from "antd";
import "./Pharmacies.css";

const Pharmacies = () => {
  return (
    <div className="cardscontainer">
      <div className="ContainerButtons">
        <div>
          <Button className="gridStyleButtons">List of Pharmacies</Button>
          <Button className="gridStyleButtons">Create new Pharmacy</Button>
        </div>
        <div>
          <Button className="gridStyleButtons">
            Update amount of services <br />
            in specific pharmacy
          </Button>
          <Button className="gridStyleButtons">Rent</Button>
        </div>
      </div>
    </div>
  );
};

export default Pharmacies;
