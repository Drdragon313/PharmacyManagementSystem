import React from "react";
import { Table } from "antd";
import "./ViewEmployees.css";
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    Role: "PM",
    Permissions: "Edit, View, Delete Reports",
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    Role: "Developer",
    Permissions: "View, Delete Reports",
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    Role: "Designer",
    Permissions: "View Reports",
  },
];

const ViewEmployees = () => {
  return (
    <div>
      <Table dataSource={data}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Role" dataIndex="Role" key="Role" />
        <Column title="Permissions" dataIndex="Permissions" key="Permissions" />
        <Column
          title="Actions"
          key="action"
          render={(_, record) => (
            <span>
              <a href="/">
                View {record.firstName} {record.lastName}
              </a>
              <a href="/" className="DeleteUserButton">
                Delete
              </a>
            </span>
          )}
        />
      </Table>
    </div>
  );
};

export default ViewEmployees;
