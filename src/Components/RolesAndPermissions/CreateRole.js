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
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const CreateRole = () => {
  const authToken = localStorage.getItem("AuthorizationToken");
  const [modalVisible, setModalVisible] = useState(!authToken);
  const [modules, setModules] = useState([]);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);

  const previousModulesRef = useRef();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(`${baseURL}/list-available-modules`, {
          headers: {
            Authorization: `${authToken}`,
          },
        });
        const data = response.data;

        if (data.status === "success") {
          setModules(data.Data.modules);
          const initialDataSource = data.Data.modules.map((module) => ({
            key: module.module_id,
            module: module.module_name,
            actions: {
              read: false,
              write: false,
              update: false,
              delete: false,
            },
            subModules: (module.sub_modules || []).map((subModule) => ({
              key: subModule.sub_module_id,
              module: subModule.sub_module_name,
              actions: {
                read: false,
                write: false,
                update: false,
                delete: false,
              },
            })),
          }));
          setDataSource(initialDataSource);
        } else {
        }
      } catch (error) {}
    };

    if (
      !previousModulesRef.current ||
      !isEqual(previousModulesRef.current, modules)
    ) {
      fetchModules();
    }

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
          checked={record.write || false}
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
          checked={record.read || false}
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
          checked={record.update || false}
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
          checked={record.delete || false}
          onChange={(e) => handleModuleCheckboxChange(e, record, "delete")}
        />
      ),
    },
  ];
  const handleModuleCheckboxChange = (e, record, columnName) => {
    setDataSource((prevDataSource) => {
      const updatedData = prevDataSource.map((item) =>
        item.key === record.key
          ? { ...item, [columnName]: e.target.checked }
          : item
      );

      setCheckedCheckboxes((prevChecked) => {
        const existingModuleIndex = prevChecked.findIndex(
          (item) => item.module_id === record.key
        );

        if (existingModuleIndex !== -1) {
          const updatedCheckedModules = [...prevChecked];
          updatedCheckedModules[existingModuleIndex].actions[columnName] =
            e.target.checked;

          return updatedCheckedModules;
        } else {
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
      setIsAnyCheckboxChecked(updatedData.some((item) => item[columnName]));
      return updatedData;
    });
  };
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
        const existingModuleIndex = prevChecked.findIndex(
          (item) => item.module_id === parentKey
        );

        if (existingModuleIndex !== -1) {
          const updatedCheckedModules = [...prevChecked];
          const existingSubModuleIndex = updatedCheckedModules[
            existingModuleIndex
          ].sub_modules.findIndex(
            (sModule) => sModule.sub_module_id === subModule.key
          );

          if (existingSubModuleIndex !== -1) {
            updatedCheckedModules[existingModuleIndex].sub_modules[
              existingSubModuleIndex
            ].actions[columnName] = e.target.checked;
          } else {
            const newSubModule = {
              sub_module_id: subModule.key,
              actions: {
                [columnName]: e.target.checked,
              },
            };
            updatedCheckedModules[existingModuleIndex].sub_modules.push(
              newSubModule
            );
          }

          return updatedCheckedModules;
        } else {
          const newModule = {
            module_id: parentKey,
            module_name: updatedData.find((module) => module.key === parentKey)
              .module,
            actions: {
              read: false,
              write: false,
              update: false,
              delete: false,
            },
            sub_modules: [
              {
                sub_module_id: subModule.key,
                actions: {
                  [columnName]: e.target.checked,
                },
              },
            ],
          };

          return [...prevChecked, newModule];
        }
      });

      return updatedData;
    });
  };

  const expandedRowRender = (record) => {
    const subModuleColumns = [
      {
        title: "Name",
        dataIndex: "module",
        key: "module",
        width: 200,
      },
      {
        title: "Add",
        dataIndex: "write",
        key: "write",
        render: (_, subModule) => (
          <Checkbox
            checked={subModule.write || false}
            onChange={(e) =>
              handleSubModuleCheckboxChange(e, subModule, "write", record.key)
            }
          />
        ),
      },
      {
        title: "View",
        dataIndex: "read",
        key: "read",

        render: (_, subModule) => (
          <Checkbox
            checked={subModule.read || false}
            onChange={(e) =>
              handleSubModuleCheckboxChange(e, subModule, "read", record.key)
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
            checked={subModule.update || false}
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
            checked={subModule.delete || false}
            onChange={(e) =>
              handleSubModuleCheckboxChange(e, subModule, "delete", record.key)
            }
          />
        ),
      },
    ];

    return record.subModules.length > 0 ? (
      <Table
        className="sub-module-table"
        columns={subModuleColumns}
        dataSource={record.subModules}
        pagination={false}
        showHeader={true}
      />
    ) : null;
  };

  const handleCreateRole = async () => {
    console.log("Checked Checkboxes:", checkedCheckboxes);

    try {
      const formattedPermissions = checkedCheckboxes.map(
        ({ module_id, actions, sub_modules }) => {
          console.log("Mapping:", module_id, actions, sub_modules);

          return {
            module_id,
            actions: {
              read: actions.read || false,
              write: actions.write || false,
              update: actions.update || false,
              delete: actions.delete || false,
            },
            sub_modules: sub_modules
              ? sub_modules.map(({ sub_module_id, actions }) => {
                  return {
                    sub_module_id,
                    actions: {
                      read: actions.read || false,
                      write: actions.write || false,
                      update: actions.update || false,
                      delete: actions.delete || false,
                    },
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
    }
  };
  return (
    <div className="main-container-roles-permissions">
      <Row
        className="pharmacy-list-breadcrumb"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="breadcrumb-row" span={24}>
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
            className="AddUsersDetailsInput"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </Col>
        <Col className="gutter-row" span={4}></Col>
        <Col className="gutter-row" span={6}></Col>
        <Col className="gutter-row" span={6}></Col>
      </Row>
      <Row style={{ margin: "10px", marginTop: "30px" }}>
        <div className="roles-checkbox-table-container">
          <label htmlFor="RolesInput" className="addRoleNameLabel">
            Select Role Permissions
          </label>
          <CustomTable
            className="roles-checkbox-table"
            columns={columns}
            dataSource={dataSource}
            expandable={{
              expandedRowRender,
              expandIcon: ({ expanded, onExpand, record }) =>
                record.subModules.length > 0 && (
                  <span
                    onClick={(e) => onExpand(record, e)}
                    style={{ marginRight: 8, cursor: "pointer" }}
                  >
                    {expanded ? <CaretUpOutlined /> : <CaretDownOutlined />}
                  </span>
                ),
            }}
          />
        </div>{" "}
      </Row>
      <Col span={23}>
        <div className="btns-class">
          <Link to="/employeepage">
            <CustomButton className="cancel-btn">Cancel</CustomButton>
          </Link>
          <CustomButton
            type="primary"
            style={{ width: "185px", height: "45px" }}
            onClick={() => handleCreateRole()}
            disabled={!isAnyCheckboxChecked}
          >
            Create role
          </CustomButton>
        </div>
      </Col>
    </div>
  );
};

export default CreateRole;
