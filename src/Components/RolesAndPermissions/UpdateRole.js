import React, { useState, useEffect } from "react";
import "./CreateRole.css";
import { Col, Input, Row, Checkbox, message, Table } from "antd";
import SignInFirstModal from "../../Components/SingInFirstModal/SignInFirstModal";
import CustomBreadcrumb from "../../Components/CustomBeadcrumb/CustomBreadcrumb";
import axios from "axios";
import CustomTable from "../CustomTable/CustomTable";
import CustomButton from "../CustomButton/CustomButton";
import { baseURL } from "../BaseURLAPI/BaseURLAPI";
import { useNavigate, useParams } from "react-router-dom";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

const UpdateRole = () => {
  const authToken = localStorage.getItem("AuthorizationToken");
  const [modalVisible, setModalVisible] = useState(!authToken);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [roleName, setRoleName] = useState("");
  const { role_id } = useParams();
  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/get-role?role_id=${role_id}`
        );
        const data = response.data;

        if (data.status === "success") {
          const roleData = data.data;
          setRoleName(roleData.role_name);

          // Map modules and submodules to the dataSource
          const updatedDataSource = roleData.permissions.map((module) => ({
            key: module.module_id,
            module: module.module_name,
            read: module.actions.read,
            write: module.actions.write,
            update: module.actions.update,
            delete: module.actions.delete,
            subModules: (module.sub_modules || []).map((subModule) => ({
              key: subModule.schema_id,
              module: subModule.schema_name,
              read: subModule.actions.read,
              write: subModule.actions.write,
              update: subModule.actions.update,
              delete: subModule.actions.delete,
            })),
          }));

          setDataSource(updatedDataSource);
          setCheckedCheckboxes(roleData.permissions);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchRoleData();
  }, []);
  const resetState = () => {
    setRoleName("");
    setCheckedCheckboxes([]);
  };
  const navigate = useNavigate();
  const breadcrumbItems = [
    { label: "Roles and Permission", link: "/employeepage" },
    { label: "Update Role", link: `/employeepage/${role_id}/update` },
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
      width: 194,
    },
    {
      title: "Add",
      dataIndex: "write",
      key: "write",
      width: 100,
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
      width: 100,
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
      width: 100,
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
      width: 100,
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
        const existingModuleIndex = prevChecked.findIndex(
          (item) => item.module_id === parentKey
        );

        if (existingModuleIndex !== -1) {
          // If module exists, update the permissions
          const updatedCheckedModules = [...prevChecked];
          const existingSubModuleIndex = updatedCheckedModules[
            existingModuleIndex
          ].sub_modules.findIndex(
            (sModule) => sModule.schema_id === subModule.key
          );

          if (existingSubModuleIndex !== -1) {
            // If sub-module exists, update the permissions
            updatedCheckedModules[existingModuleIndex].sub_modules[
              existingSubModuleIndex
            ].actions[columnName] = e.target.checked;
          } else {
            // If sub-module doesn't exist, create a new sub-module entry
            const newSubModule = {
              schema_id: subModule.key,
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
          // If module doesn't exist, create a new module entry with sub-modules
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
                schema_id: subModule.key,
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
        title: "Sub Module Name",
        dataIndex: "module",
        key: "module",
        width: 190,
      },
      {
        title: "Read",
        dataIndex: "read",
        key: "read",
        width: 100,
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
        width: 100,
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
        width: 100,
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
        width: 100,
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

  const handleUpdateRole = async () => {
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

      const response = await axios.put(
        `${baseURL}/update-role?role_id=${role_id}`,
        {
          role_name: roleName,
          role_description: "Testing Role, not a finalized one.",
          vendor_id: 1,
          permissions: formattedPermissions,
        }
      );

      console.log("Role updated successfully:", response.data);
      message.success("Role updated successfully");
      resetState();
      navigate("/employeepage");
    } catch (error) {
      console.error("Error updating role:", error);
      message.error("Error updating role");
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
            expandable={{
              expandedRowRender,
              expandIcon: ({ expanded, onExpand, record }) =>
                record.subModules.length > 0 && (
                  <span
                    onClick={(e) => onExpand(record, e)}
                    style={{ cursor: "pointer" }}
                  >
                    {expanded ? <CaretUpOutlined /> : <CaretDownOutlined />}
                  </span>
                ),
            }}
          />

          <div className="btns-class">
            <CustomButton className="cancel-btn">Cancel</CustomButton>
            <CustomButton
              type="primary"
              style={{ width: "185px", height: "45px" }}
              onClick={() => handleUpdateRole()}
            >
              Update role
            </CustomButton>
          </div>
        </Col>
        <Col className="gutter-row" span={12}></Col>
      </Row>
    </div>
  );
};

export default UpdateRole;
