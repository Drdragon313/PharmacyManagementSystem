import React, { useState, useEffect, useRef } from "react";
import isEqual from "lodash/isEqual";
import "./CreateRole.css";
import { Col, Input, Row, Checkbox, message, Table } from "antd";
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
  const previousModulesRef = useRef();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(`${baseURL}/list-available-modules`);
        const data = response.data;

        if (data.status === "success") {
          setModules(data.Data.modules);
          const initialDataSource = data.Data.modules.map((module) => ({
            key: module.module_id,
            module: module.module_name,
            read: false,
            write: false,
            update: false,
            delete: false,
            subModules: (module.sub_modules || []).map((subModule) => ({
              key: subModule.schema_id,
              module: subModule.schema_name,
              read: false,
              write: false,
              update: false,
              delete: false,
            })),
          }));
          setDataSource(initialDataSource);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    // Check if modules have changed before fetching
    if (
      !previousModulesRef.current ||
      !isEqual(previousModulesRef.current, modules)
    ) {
      fetchModules();
    }

    // Update the previousModulesRef after fetching
    previousModulesRef.current = modules;
  }, [modules]);

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
          onChange={(e) => handleModuleCheckboxChange(e, record, "write")}
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
          onChange={(e) => handleModuleCheckboxChange(e, record, "read")}
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
          onChange={(e) => handleModuleCheckboxChange(e, record, "update")}
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
          onChange={(e) => handleModuleCheckboxChange(e, record, "delete")}
        />
      ),
    },
  ];
  // Function to handle module checkbox changes
  const handleModuleCheckboxChange = (e, record, columnName) => {
    setDataSource((prevDataSource) => {
      const updatedData = prevDataSource.map((item) =>
        item.key === record.key
          ? { ...item, [columnName]: e.target.checked }
          : item
      );

      // Update checkedCheckboxes state
      setCheckedCheckboxes((prevChecked) => {
        const existingModuleIndex = prevChecked.findIndex(
          (item) => item.module_id === record.key
        );

        if (existingModuleIndex !== -1) {
          // If module exists, update the permissions
          const updatedCheckedModules = [...prevChecked];
          updatedCheckedModules[existingModuleIndex].actions[columnName] =
            e.target.checked;

          return updatedCheckedModules;
        } else {
          // If module doesn't exist, create a new module entry
          const newModule = {
            module_id: record.key,
            module_name: record.module,
            actions: {
              [columnName]: e.target.checked,
            },
            sub_modules: [],
          };

          return [...prevChecked, newModule];
        }
      });

      return updatedData;
    });
  };
  // Function to handle sub-module checkbox changes
  const handleSubModuleCheckboxChange = (
    e,
    subModule,
    columnName,
    parentKey
  ) => {
    setDataSource((prevDataSource) => {
      const updatedData = prevDataSource.map((item) =>
        item.key === parentKey
          ? {
              ...item,
              subModules: item.subModules.map((sModule) =>
                sModule.key === subModule.key
                  ? { ...sModule, [columnName]: e.target.checked }
                  : sModule
              ),
            }
          : item
      );

      setCheckedCheckboxes((prevChecked) => {
        const updatedCheckedModules = prevChecked.map((item) =>
          item.key === parentKey
            ? {
                ...item,
                permissions: [
                  {
                    module_id: parentKey,
                    actions: {
                      ...item.actions,
                    },
                    sub_modules: updatedData
                      .filter((module) => module.key === parentKey)
                      .map((module) =>
                        module.subModules.map((sModule) => ({
                          schema_id: sModule.key,
                          actions: {
                            // Include only the desired properties in actions
                            read: sModule.read,
                            write: sModule.write,
                            update: sModule.update,
                            delete: sModule.delete,
                          },
                        }))
                      )[0],
                  },
                ],
              }
            : item
        );

        if (!updatedCheckedModules.find((item) => item.key === parentKey)) {
          const parentModule = updatedData.find(
            (item) => item.key === parentKey
          );

          const updatedSubModules = updatedData
            .filter((module) => module.key === parentKey)
            .map((module) =>
              module.subModules.map((sModule) => ({
                schema_id: sModule.key,
                actions: {
                  // Include only the desired properties in actions
                  read: sModule.read,
                  write: sModule.write,
                  update: sModule.update,
                  delete: sModule.delete,
                },
              }))
            )[0];

          updatedCheckedModules.push({
            module_name: parentModule.module,
            module_id: parentKey,
            actions: {
              read: false,
              write: false,
              update: false,
              delete: false,
            },
            sub_modules: updatedSubModules,
          });
        }

        console.log(updatedCheckedModules);

        return updatedCheckedModules;
      });

      return updatedData;
    });
  };

  const expandedRowRender = (record) => {
    const subModuleColumns = [
      {
        title: "Sub Module Name",
        dataIndex: "module",
        key: "module",
      },
      {
        title: "Read",
        dataIndex: "read",
        key: "read",
        render: (_, subModule) => (
          <Checkbox
            checked={subModule.read}
            onChange={(e) =>
              handleSubModuleCheckboxChange(e, subModule, "read", record.key)
            }
          />
        ),
      },
      {
        title: "Write",
        dataIndex: "write",
        key: "write",
        render: (_, subModule) => (
          <Checkbox
            checked={subModule.write}
            onChange={(e) =>
              handleSubModuleCheckboxChange(e, subModule, "write", record.key)
            }
          />
        ),
      },
      {
        title: "Update",
        dataIndex: "update",
        key: "update",
        render: (_, subModule) => (
          <Checkbox
            checked={subModule.update}
            onChange={(e) =>
              handleSubModuleCheckboxChange(e, subModule, "update", record.key)
            }
          />
        ),
      },
      {
        title: "Delete",
        dataIndex: "delete",
        key: "delete",
        render: (_, subModule) => (
          <Checkbox
            checked={subModule.delete}
            onChange={(e) =>
              handleSubModuleCheckboxChange(e, subModule, "delete", record.key)
            }
          />
        ),
      },
    ];

    return (
      <Table
        columns={subModuleColumns}
        dataSource={record.subModules}
        pagination={false}
        showHeader={false}
      />
    );
  };

  const handleCreateRole = async () => {
    console.log("Checked Checkboxes:", checkedCheckboxes);

    try {
      const formattedPermissions = checkedCheckboxes.map(
        ({ module_id, actions, sub_modules }) => {
          console.log("Mapping:", module_id, actions, sub_modules);

          return {
            module_id,
            actions,
            sub_modules: sub_modules
              ? sub_modules.map(({ schema_id, actions }) => {
                  console.log("Sub Mapping:", schema_id, actions);

                  return {
                    schema_id,
                    actions,
                  };
                })
              : [],
          };
        }
      );

      console.log("Formatted Permissions:", formattedPermissions);

      const response = await axios.post(`${baseURL}/create-role`, {
        role_name: roleName,
        role_description: "Testing Role, not a finalized one.",
        vendor_id: 1,
        permissions: formattedPermissions,
      });

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
          <CustomTable
            columns={columns}
            dataSource={dataSource}
            expandable={{ expandedRowRender }}
          />

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
