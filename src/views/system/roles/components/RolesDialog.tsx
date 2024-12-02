import { createRoleApi, editRoleApi } from "@/api/system";
import { Role } from "@/api/system/system";
import { Input, Modal, Form, FormInstance, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
interface Props {
  dialogVisible: boolean;
  setDialogVisible: (visible: boolean) => void;
  currentRole: Role | null;
  isEdit: boolean;
  getList: () => void;
}
type FieldType = Omit<Role, "id">;

export const RolesDialog: React.FC<Props> = React.memo(
  ({ dialogVisible, setDialogVisible, currentRole, isEdit, getList }) => {
    const formRef = useRef<FormInstance>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (isEdit && dialogVisible && currentRole) {
        formRef.current?.setFieldsValue(currentRole);
      }
      if (!dialogVisible) {
        formRef.current?.resetFields();
      }
    }, [isEdit, dialogVisible, currentRole]);

    const addRole = async (values: FieldType) => {
      const res = await createRoleApi(values);
      return res;
    };

    const editRole = async (values: FieldType) => {
      if (!currentRole) return;
      const res = await editRoleApi(currentRole.id, values);
      return res;
    };

    const handleOk = () => {
      formRef.current?.validateFields().then(async (values) => {
        setLoading(true);
        const res = isEdit ? await editRole(values) : await addRole(values);
        setLoading(false);
        if (res?.code === 0) {
          setDialogVisible(false);
          message.success(`${isEdit ? "编辑" : "添加"}成功`);
          getList();
        }
      });
    };
    const handleCancel = () => {
      formRef.current?.resetFields();
      setDialogVisible(false);
    };

    return (
      <Modal
        title={`${isEdit ? "编辑" : "添加"}角色`}
        open={dialogVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <div className="content">
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            ref={formRef}
          >
            <Form.Item<FieldType>
              label="key"
              name="key"
              rules={[{ required: true, message: "Please input your key!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  }
);
