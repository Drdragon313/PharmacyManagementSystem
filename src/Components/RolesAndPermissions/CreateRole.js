import React, { useState, useEffect } from "react";
import "./CreateRole.css";
import { Col, Input, Row, Checkbox, message } from "antd";
import SignInFirstModal from "../../Components/SingInFirstModal/SignInFirstModal";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import axios from "axios";
import CustomTable from "../CustomTable/CustomTable";
import CustomButton from "../CustomButton/CustomButton";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";
import { useNavigate } from "react-router-dom";
const CreateRole = () => {
  const authToken = localStorage.getItem("AuthorizationToken");
  const [modalVisible, setModalVisible] = useState(!authToken);
  const [modules, setModules] = useState([]);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [roleName, setRoleName] = useState("");
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(`${baseURL}/list-available-modules`);
        const data = await response.json();
        if (data.status === "success") {
          setModules(data.Data.modules);
          const initialDataSource = data.Data.modules.map((module) => ({
            key: module.module_id,
            module: module.module_name,
            read: false,
            write: false,
            update: false,
            delete: false,
          }));
          setDataSource(initialDataSource);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchModules();
  }, []);
  const resetState = () => {
    setRoleName("");
    setCheckedCheckboxes([]);
  };
  const navigate = useNavigate();
  const breadcrumbItems = [
    { label: "Roles and Permission", link: "/employeepage" },
    { label: "Create Role", link: "/rolesandpermissions/createrole" },
  ];
  if (!authToken) {
    const openModal = () => {
      setModalVisible(true);
    };
    return <SignInFirstModal visible={modalVisible} open={openModal} />;
  }

  const columns = [
    {
      title: "Modules",
      dataIndex: "module",
      key: "module",
    },
    {
      title: "Add",
      dataIndex: "write",
      key: "write",
      render: (_, record) => (
        <Checkbox
          checked={record.write}
          onChange={(e) => handleCheckboxChange(e, record, "write")}
        />
      ),
    },
    {
      title: "View",
      dataIndex: "read",
      key: "read",
      render: (_, record) => (
        <Checkbox
          checked={record.read}
          onChange={(e) => handleCheckboxChange(e, record, "read")}
        />
      ),
    },
    {
      title: "Update",
      dataIndex: "update",
      key: "update",
      render: (_, record) => (
        <Checkbox
          checked={record.update}
          onChange={(e) => handleCheckboxChange(e, record, "update")}
        />
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <Checkbox
          checked={record.delete}
          onChange={(e) => handleCheckboxChange(e, record, "delete")}
        />
      ),
    },
  ];

  const handleCheckboxChange = (e, record, columnName) => {
    const updatedData = dataSource.map((item) => {
      if (item.key === record.key) {
        return { ...item, [columnName]: e.target.checked };
      }
      return item;
    });
    setDataSource(updatedData);

    // Update the checked checkboxes array
    const updatedCheckedCheckboxes = checkedCheckboxes.map((item) => {
      if (item.key === record.key) {
        return {
          ...item,
          permissions: item.permissions.map((permission) => {
            if (permission.module_id === record.key) {
              return {
                ...permission,
                actions: {
                  ...permission.actions,
                  [columnName]: e.target.checked,
                },
              };
            }
            return permission;
          }),
        };
      }
      return item;
    });

    // If the checkbox is checked, add it to the array, otherwise remove it
    if (e.target.checked) {
      const existingRole = updatedCheckedCheckboxes.find(
        (item) => item.key === record.key
      );

      if (!existingRole) {
        updatedCheckedCheckboxes.push({
          key: record.key,
          role_name: record.module, // Assuming module name is the role name
          permissions: [
            {
              module_id: record.key,
              actions: {
                [columnName]: e.target.checked,
              },
            },
          ],
        });
      }
    }

    setCheckedCheckboxes(updatedCheckedCheckboxes);
  };
  console.log(checkedCheckboxes);

  const handleCreateRole = async () => {
    const payload = {
      role_name: roleName, // Assuming the role_name is the same for all modules
      vendor_id: 1,
      permissions: checkedCheckboxes.map((checkbox) => ({
        module_id: checkbox.key,
        actions: {
          read: checkbox.permissions[0].actions.read,
          write: checkbox.permissions[0].actions.write,
          delete: checkbox.permissions[0].actions.delete,
          update: checkbox.permissions[0].actions.update,
        },
      })),
    };

    try {
      const response = await axios.post(`${baseURL}/create-role`, payload);
      console.log("Role created successfully:", response.data);
      message.success("Role created successfully");
      resetState();
      navigate("/employeepage");
    } catch (error) {
      console.error("Error creating role:", error);
      message.error("Error creating role");
      // Handle error, such as showing an error message
    }
  };
  return (
    <div className="main-container">
      <Row
        className="pharmacy-list-breadcrumb"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={12}>
          <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
        </Col>
      </Row>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        style={{ margin: "10px", marginTop: "30px" }}
      >
        <Col className="gutter-row" span={8}>
          <label htmlFor="RolesInput" className="addRoleNameLabel">
            Role name
          </label>
          <Input
            name="RolesInput"
            className="Roles-input"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </Col>
        <Col className="gutter-row" span={4}></Col>
        <Col className="gutter-row" span={6}></Col>
        <Col className="gutter-row" span={6}></Col>
      </Row>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        style={{ margin: "10px", marginTop: "30px" }}
      >
        <Col className="gutter-row" span={12}>
          <label htmlFor="RolesInput" className="addRoleNameLabel">
            Select Role Permissions
          </label>
          <CustomTable columns={columns} dataSource={dataSource}></CustomTable>
          <div className="btns-class">
            <CustomButton className="cancel-btn">Cancel</CustomButton>
            <CustomButton
              type="primary"
              style={{ width: "185px", height: "45px" }}
              onClick={() => handleCreateRole()}
            >
              Create role
            </CustomButton>
          </div>
        </Col>
        <Col className="gutter-row" span={12}></Col>
      </Row>
    </div>
  );
};

export default CreateRole;
