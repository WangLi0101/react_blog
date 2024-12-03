import { deleteRoleApi, getRolesApi } from "@/api/system";
import { Role } from "@/api/system/system";
import { Button, message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { RolesDialog } from "./components/RolesDialog";
import { ColumnsType } from "antd/es/table";
import { AssignMenuDialog } from "./components/AssignMenuDialog";
const Roles: React.FC = () => {
  const [rolesList, setRolesList] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [assignMenuDialogVisible, setAssignMenuDialogVisible] = useState(false);
  const columns: ColumnsType<Role> = [
    {
      title: "key",
      key: "key",
      dataIndex: "key",
    },

    {
      title: "name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "操作",
      width: 150,
      align: "center",
      render: (record: Role) => {
        return (
          <>
            <div className="flex flex-row">
              <Button
                color="primary"
                variant="text"
                onClick={() => editRole(record)}
              >
                编辑
              </Button>
              <Button
                color="primary"
                variant="text"
                onClick={() => delRole(record)}
              >
                删除
              </Button>
              <Button
                color="primary"
                variant="text"
                onClick={() => editMenu(record)}
              >
                分配菜单
              </Button>
            </div>
          </>
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
    console.log(record);
    Modal.confirm({
      title: "提示",
      content: "确定要删除该角色吗？",
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
    <div className="roles">
      <div className="operator mb-5 flex flex-row-reverse">
        <Button type="primary" onClick={createRole}>
          创建角色
        </Button>
      </div>
      <Table<Role>
        columns={columns}
        dataSource={rolesList}
        loading={loading}
        pagination={false}
      />
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
  );
};

export default Roles;
