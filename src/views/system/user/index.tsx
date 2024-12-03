import {
  addUserApi,
  assignRoleApi,
  deleteUserApi,
  editUserApi,
  getUsersPageApi,
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
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { UserForm, UserFormType } from "./components/UserForm";
import {
  AssignRoleForm,
  AssingRoleFormType,
} from "./components/AssignRoleForm";
import { DownOutlined } from "@ant-design/icons";
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
  // 获取用户列表
  const getUserList = async () => {
    setLoading(true);
    const res = await getUsersPageApi(search);
    setLoading(false);
    if (res.code === 0) {
      setUserList(res.data.list);
      setTotal(res.data.total);
    }
  };

  const pageChange = (page: number, pageSize: number) => {
    setSearch((prev) => {
      return { ...prev, page: pageSize !== prev.pageSize ? 1 : page, pageSize };
    });
  };

  useEffect(() => {
    getUserList();
  }, [search]);

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
      width: 30,
      align: "center",
      render: (_, _record: UserInfo, index: number) => {
        return index + 1;
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
      width: 150,
    },
    {
      title: "性别",
      dataIndex: "gender",
      width: 100,
      render: (_, record: UserInfo) => {
        return Gender[record.profile.gender];
      },
    },
    {
      title: "邮箱",
      dataIndex: "email",
      width: 150,
      render: (_, record: UserInfo) => {
        return record.profile?.email;
      },
    },
    {
      title: "操作",
      width: 130,
      align: "center",
      render: (_, record: UserInfo) => {
        const items = [
          {
            label: "分配角色",
            key: "edit",
            onClick: () => assignRoleHandler(record),
          },
        ];
        return (
          <>
            <Button type="link" onClick={() => editUserHandler(record)}>
              编辑
            </Button>
            <Button type="link" onClick={() => delUser(record)}>
              删除
            </Button>
            <Dropdown menu={{ items }}>
              <Button type="link">
                更多
                <DownOutlined />
              </Button>
            </Dropdown>
          </>
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
    <div className="user">
      <div className="operator flex justify-between mb-5">
        <Input.Search
          placeholder="input username"
          allowClear
          className="w-[200px]"
          onSearch={onSearch}
        />
        <div className="operator">
          <Button type="primary" onClick={addUserHandler}>
            新增用户
          </Button>
        </div>
      </div>

      <Table<UserInfo>
        columns={columns}
        dataSource={userList}
        loading={loading}
        pagination={false}
        rowKey="id"
        className="h-[calc(100vh-320px)]"
      />

      <div className="pagination flex flex-row-reverse mt-5">
        <Pagination
          total={total}
          pageSize={search.pageSize}
          current={search.page}
          onChange={pageChange}
          showSizeChanger
          pageSizeOptions={[50, 100, 300, 500]}
        />
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
      >
        <div className="dialog-content">{getForm()}</div>
      </Modal>
    </div>
  );
};

export default User;
