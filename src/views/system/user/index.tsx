import {
  addUserApi,
  assignRoleApi,
  deleteUserApi,
  editUserApi,
  getUsersPageApi,
  resetPasswordApi,
} from "@/api/system";
import { PageParams, UserInfo } from "@/api/system/system";
import { Gender } from "@/api/system/system.enum";
import {
  Pagination,
  Table,
  Input,
  Button,
  Modal,
  Form,
  message,
  Dropdown,
  Space,
  Tag,
  Avatar,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useCallback, useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { UserForm, UserFormType } from "./components/UserForm";
import {
  AssignRoleForm,
  AssingRoleFormType,
} from "./components/AssignRoleForm";
import {
  DownOutlined,
  SearchOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  MailOutlined,
  TeamOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import ResetPasswordDialog from "./components/ResetPasswordDialog";
interface ModelConfig {
  visible: boolean;
  title: string;
  componentType: "USER_FORM" | "ASSIGN_ROLE_FORM";
}
const User: React.FC = () => {
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [modelConfig, setModelConfig] = useImmer<ModelConfig>({
    visible: false,
    title: "",
    componentType: "USER_FORM",
  });
  const [formRef] = Form.useForm();
  const [search, setSearch] = useState<PageParams>({
    page: 1,
    pageSize: 10,
    username: "",
  });
  const [currentUser, setCurrentUser] = useState<UserInfo | undefined>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
  // 获取用户列表
  const getUserList = useCallback(async () => {
    setLoading(true);
    const res = await getUsersPageApi(search);
    setLoading(false);
    if (res.code === 0) {
      setUserList(res.data.list);
      setTotal(res.data.total);
    }
  }, [search]);

  const pageChange = (page: number, pageSize: number) => {
    setSearch((prev) => {
      return { ...prev, page: pageSize !== prev.pageSize ? 1 : page, pageSize };
    });
  };

  useEffect(() => {
    getUserList();
  }, [getUserList, search]);

  useEffect(() => {
    if (modelConfig.visible && currentUser) {
      if (modelConfig.componentType === "USER_FORM") {
        formRef.setFieldsValue(currentUser.profile);
      }
      if (modelConfig.componentType === "ASSIGN_ROLE_FORM") {
        formRef.setFieldsValue({
          roleIds: currentUser.roles.map((role) => role.id),
        });
      }
    }
  }, [modelConfig.visible, currentUser, modelConfig.componentType, formRef]);

  const columns: ColumnsType<UserInfo> = [
    {
      title: "#",
      dataIndex: "username",
      width: 60,
      align: "center",
      render: (_, _record: UserInfo, index: number) => {
        return (search.page - 1) * search.pageSize + index + 1;
      },
    },
    {
      title: "用户信息",
      dataIndex: "username",
      width: 200,
      render: (_, record: UserInfo) => {
        return (
          <div className="flex items-center gap-3">
            <Avatar
              size={32}
              icon={<UserOutlined />}
              style={{ backgroundColor: "var(--primary-color)" }}
            />
            <div>
              <div className="font-medium">{record.username}</div>
              <div className="text-sm text-gray-500">
                {record.profile?.name || "未设置"}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "性别",
      dataIndex: "gender",
      width: 80,
      align: "center",
      render: (_, record: UserInfo) => {
        const genderText = Gender[record.profile.gender];
        const color =
          record.profile.gender === 1
            ? "blue"
            : record.profile.gender === 2
            ? "pink"
            : "default";
        return <Tag color={color}>{genderText}</Tag>;
      },
    },
    {
      title: "邮箱",
      dataIndex: "email",
      width: 200,
      render: (_, record: UserInfo) => {
        return (
          <div className="flex items-center gap-2 text-gray-600">
            <MailOutlined />
            <span>{record.profile?.email || "未设置"}</span>
          </div>
        );
      },
    },
    {
      title: "角色",
      dataIndex: "roles",
      width: 150,
      render: (_, record: UserInfo) => {
        return (
          <div className="flex flex-wrap gap-1">
            {record.roles?.length > 0 ? (
              record.roles.map((role) => (
                <Tag key={role.id} color="processing">
                  {role.name}
                </Tag>
              ))
            ) : (
              <Tag color="default">未分配角色</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: "操作",
      width: 200,
      align: "center",
      render: (_, record: UserInfo) => {
        const items = [
          {
            label: "分配角色",
            key: "assign",
            onClick: () => assignRoleHandler(record),
          },
          {
            label: "重置密码",
            key: "reset",
            onClick: () => resetPasswordHandler(record),
          },
        ];
        return (
          <Space size="small">
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => editUserHandler(record)}
            >
              编辑
            </Button>
            <Button
              type="link"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => delUser(record)}
            >
              删除
            </Button>
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button type="link" size="small">
                更多 <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  const onSearch = (value: string) => {
    setSearch((prev) => {
      return { ...prev, username: value, page: 1 };
    });
  };

  const getForm = () => {
    switch (modelConfig.componentType) {
      case "USER_FORM":
        return <UserForm formRef={formRef} isEdit={!!currentUser} />;
      case "ASSIGN_ROLE_FORM":
        return <AssignRoleForm formRef={formRef} />;
    }
  };

  const addUserHandler = () => {
    setCurrentUser(void 0);
    setModelConfig((draft) => {
      draft.visible = true;
      draft.title = "新增用户";
      draft.componentType = "USER_FORM";
    });
  };

  const editUserHandler = (record: UserInfo) => {
    setCurrentUser(record);
    formRef.setFieldsValue(record.profile);
    setModelConfig((draft) => {
      draft.visible = true;
      draft.title = "编辑用户";
      draft.componentType = "USER_FORM";
    });
  };

  const assignRoleHandler = (record: UserInfo) => {
    setCurrentUser(record);
    setModelConfig((draft) => {
      draft.visible = true;
      draft.title = "分配角色";
      draft.componentType = "ASSIGN_ROLE_FORM";
    });
  };

  const afterOpenChange = (open: boolean) => {
    if (!open) {
      formRef.resetFields();
    }
  };

  const addUser = async (values: UserFormType) => {
    setConfirmLoading(true);
    const { confirmPassword: _, ...rest } = values;
    const res = await addUserApi(rest);
    setConfirmLoading(false);
    if (res.code === 0) {
      message.success("添加成功");
      setModelConfig((draft) => {
        draft.visible = false;
      });
    }
    getUserList();
  };

  const editUser = async (values: UserFormType) => {
    setConfirmLoading(true);
    const {
      confirmPassword: _confirmPassword,
      username: _username,
      password: _password,
      ...rest
    } = values;
    const res = await editUserApi(currentUser!.id, rest);
    setConfirmLoading(false);
    if (res.code === 0) {
      message.success("编辑成功");
      setModelConfig((draft) => {
        draft.visible = false;
      });
      getUserList();
    }
  };

  const assignRole = async (values: AssingRoleFormType) => {
    setConfirmLoading(true);
    const res = await assignRoleApi({
      userId: currentUser!.id,
      roleIds: values.roleIds,
    });
    setConfirmLoading(false);
    if (res.code === 0) {
      message.success("分配角色成功");
      setModelConfig((draft) => {
        draft.visible = false;
      });
      getUserList();
    }
  };

  const delUser = (record: UserInfo) => {
    Modal.confirm({
      title: "提示",
      content: "确定要删除该用户吗？",
      onOk: async () => {
        const res = await deleteUserApi(record.id);
        if (res.code === 0) {
          message.success("删除成功");
          getUserList();
        }
      },
    });
  };

  const resetPasswordHandler = (record: UserInfo) => {
    setCurrentUser(record);
    setResetPasswordVisible(true);
  };

  const resetPassword = useCallback(
    async (values: { password: string }) => {
      if (!currentUser) return;
      const res = await resetPasswordApi({
        id: currentUser?.id,
        password: values.password,
      });
      if (res.code === 0) {
        message.success("重置密码成功");
        setResetPasswordVisible(false);
        getUserList();
      }
    },
    [currentUser, getUserList]
  );
  // 提交
  const submit = () => {
    formRef
      .validateFields()
      .then((values: UserFormType | AssingRoleFormType) => {
        switch (modelConfig.componentType) {
          case "USER_FORM":
            return currentUser
              ? editUser(values as UserFormType)
              : addUser(values as UserFormType);
          case "ASSIGN_ROLE_FORM":
            return assignRole(values as AssingRoleFormType);
        }
      });
  };

  return (
    <div className="p-6 bg-theme-bg min-h-full transition-colors duration-300">
      <div className="max-w-full mx-auto space-y-6">
        {/* 搜索和操作区域 */}
        <div className="flex justify-between items-center p-6 bg-theme-card border border-theme-border rounded-2xl shadow-sm transition-all hover:shadow-md">
          <Input.Search
            placeholder="搜索用户名..."
            allowClear
            className="w-80"
            size="large"
            onSearch={onSearch}
          />
          <Button
            type="primary"
            size="large"
            icon={<UserAddOutlined />}
            onClick={addUserHandler}
            className="shadow-lg shadow-primary/30"
          >
            新增用户
          </Button>
        </div>

        {/* 表格区域 */}
        <div className="bg-theme-card border border-theme-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all p-6">
          <Table<UserInfo>
            columns={columns}
            dataSource={userList}
            loading={loading}
            pagination={false}
            tableLayout="auto"
            rowKey="id"
            scroll={{ y: "calc(100vh - 400px)" }}
          />

          {/* 分页区域 */}
          <div className="flex justify-end mt-6 pt-4 border-t border-theme-border/50">
            <Pagination
              total={total}
              pageSize={search.pageSize}
              current={search.page}
              onChange={pageChange}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) =>
                `第 ${range[0]}-${range[1]} 条，共 ${total} 条数据`
              }
              pageSizeOptions={[10, 20, 50, 100]}
            />
          </div>
        </div>

        <Modal
          confirmLoading={confirmLoading}
          title={modelConfig.title}
          open={modelConfig.visible}
          onOk={submit}
          onCancel={() => {
            setModelConfig((draft) => {
              draft.visible = false;
            });
          }}
          afterOpenChange={afterOpenChange}
          width={600}
        >
          <div className="dialog-content">{getForm()}</div>
        </Modal>

        <ResetPasswordDialog
          visible={resetPasswordVisible}
          setVisible={setResetPasswordVisible}
          onSubmit={resetPassword}
        />
      </div>
    </div>
  );
};

export default User;
