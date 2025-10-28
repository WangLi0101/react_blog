import { deleteRoleApi, getRolesApi } from "@/api/system";
import { Role } from "@/api/system/system";
import { Button, message, Modal, Table, Space } from "antd";
import React, { useEffect, useState } from "react";
import { RolesDialog } from "./components/RolesDialog";
import { ColumnsType } from "antd/es/table";
import { AssignMenuDialog } from "./components/AssignMenuDialog";
import { TeamOutlined, EditOutlined, DeleteOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons";

const Roles: React.FC = () => {
  const [rolesList, setRolesList] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [assignMenuDialogVisible, setAssignMenuDialogVisible] = useState(false);

  const columns: ColumnsType<Role> = [
    {
      title: "#",
      key: "index",
      width: 60,
      align: "center",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "角色标识",
      key: "key",
      dataIndex: "key",
      width: 150,
    },
    {
      title: "角色名称",
      key: "name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "操作",
      width: 200,
      align: "center",
      render: (record: Role) => {
        return (
          <Space size="small">
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => editRole(record)}
            >
              编辑
            </Button>
            <Button
              type="link"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => delRole(record)}
            >
              删除
            </Button>
            <Button
              type="link"
              size="small"
              icon={<MenuOutlined />}
              onClick={() => editMenu(record)}
            >
              分配菜单
            </Button>
          </Space>
        );
      },
    },
  ];

  const getRolesList = async () => {
    setLoading(true);
    const res = await getRolesApi();
    setLoading(false);
    if (res.code === 0) {
      setRolesList(res.data);
    }
  };

  const createRole = () => {
    setIsEdit(false);
    setCurrentRole(null);
    setDialogVisible(true);
  };

  const editRole = (record: Role) => {
    setIsEdit(true);
    setCurrentRole(record);
    setDialogVisible(true);
  };

  const editMenu = (record: Role) => {
    setCurrentRole(record);
    setAssignMenuDialogVisible(true);
  };

  const delRole = (record: Role) => {
    Modal.confirm({
      title: "确认删除",
      content: `确定要删除角色 "${record.name}" 吗？`,
      onOk: async () => {
        const res = await deleteRoleApi(record.id);
        if (res.code === 0) {
          message.success("删除成功");
          getRolesList();
        }
      },
    });
  };

  useEffect(() => {
    getRolesList();
  }, []);

  return (
    <div className="p-6 bg-theme-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* 操作区域 */}
        <div className="flex justify-end mb-6">
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={createRole}
          >
            创建角色
          </Button>
        </div>

        {/* 表格区域 */}
        <div className="bg-theme-bg border border-theme-border rounded-xl overflow-hidden">
          <Table<Role>
            columns={columns}
            dataSource={rolesList}
            loading={loading}
            pagination={false}
            rowKey="id"
          />
        </div>

        <RolesDialog
          dialogVisible={dialogVisible}
          setDialogVisible={setDialogVisible}
          isEdit={isEdit}
          currentRole={currentRole}
          getList={getRolesList}
        />
        <AssignMenuDialog
          dialogVisible={assignMenuDialogVisible}
          setDialogVisible={setAssignMenuDialogVisible}
          roleId={currentRole?.id}
        />
      </div>
    </div>
  );
};

export default Roles;
