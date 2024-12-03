import { Modal, Form, Input } from "antd";
import React, { useState } from "react";
interface Props {
  visible: boolean;
  onSubmit: (values: { password: string }) => Promise<void>;
  setVisible: (visible: boolean) => void;
}
interface FormType {
  password: string;
  confirmPassword: string;
}
const ResetPasswordDialog: React.FC<Props> = ({
  visible,
  setVisible,
  onSubmit,
}) => {
  const [formRef] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onOk = async () => {
    setConfirmLoading(true);
    try {
      const values = await formRef.validateFields();
      const { confirmPassword: _, ...rest } = values;
      await onSubmit(rest);
    } catch (error) {
      console.error(error);
    } finally {
      setConfirmLoading(false);
    }
  };
  return (
    <div className="reset-password-dialog">
      <Modal
        title="重置密码"
        open={visible}
        onOk={onOk}
        onCancel={() => setVisible(false)}
        confirmLoading={confirmLoading}
        afterClose={() => formRef.resetFields()}
      >
        <div className="dialog-content">
          <Form
            form={formRef}
            name="resetPassword"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, width: "100%" }}
            autoComplete="off"
          >
            <Form.Item<FormType>
              label="新密码"
              name="password"
              rules={[
                { required: true, message: "请输入新密码" },
                { min: 6, message: "密码长度不能小于6位" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirmPassword"
              rules={[
                { required: true, message: "请输入确认密码" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue("password") !== value) {
                      return Promise.reject("两次密码不一致");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(ResetPasswordDialog);
