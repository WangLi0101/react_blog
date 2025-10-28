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
        className="modern-modal"
        width={480}
        centered
      >
        <div className="dialog-content">
          <Form
            form={formRef}
            name="resetPassword"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
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
              <Input.Password placeholder="请输入新密码" />
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
              <Input.Password placeholder="请再次输入密码" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(ResetPasswordDialog);
