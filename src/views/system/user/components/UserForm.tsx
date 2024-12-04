import React from "react";
import { Form, FormInstance, Input, Radio } from "antd";
import { Gender } from "@/api/system/system.enum";

export interface UserFormType {
  username: string;
  password: string;
  name: string;
  email: string;
  gender: Gender;
  confirmPassword: string;
}
interface Props {
  formRef: FormInstance;
  isEdit: boolean;
}
export const UserForm: React.FC<Props> = ({ formRef, isEdit }) => {
  return (
    <div>
      <Form<UserFormType>
        form={formRef}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, width: "100%" }}
        autoComplete="off"
      >
        {!isEdit && (
          <Form.Item<UserFormType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item<UserFormType>
          label="姓名"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<UserFormType>
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Email is invalid!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<UserFormType>
          label="性别"
          name="gender"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Radio.Group>
            <Radio value={Gender["男"]}>男</Radio>
            <Radio value={Gender["女"]}>女</Radio>
          </Radio.Group>
        </Form.Item>

        {!isEdit && (
          <>
            <Form.Item<UserFormType>
              label="密码"
              name="password"
              rules={[
                { required: true, message: "请输入密码!" },
                { min: 6, message: "密码至少6个字符!" },
              ]}
            >
              <Input.Password placeholder="密码" />
            </Form.Item>

            <Form.Item<UserFormType>
              label="确认密码"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "请确认密码!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次输入的密码不一致!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="确认密码" />
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
};
