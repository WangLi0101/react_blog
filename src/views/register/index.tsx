import { Button, Form, Input, message, Radio } from "antd";
import { Link } from "react-router";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { CreateUserParams } from "@/api/system/system";
import { createUser } from "@/api/system";

export const Register = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: CreateUserParams) => {
    console.log("Success:", values);
    const res = await createUser(values);
    if (res.code === 0) {
      message.success("注册成功");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00A9FF] p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Auth</h1>
          <p className="mt-2 text-gray-500">Create an account</p>
        </div>

        <Form
          form={form}
          name="register"
          className="space-y-5"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "请输入用户名!" },
              { min: 3, message: "用户名至少3个字符!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="用户名"
              className="h-12 rounded-lg border border-gray-200"
            />
          </Form.Item>

          <Form.Item
            name="name"
            rules={[
              { required: true, message: "姓名!" },
              { min: 3, message: "用户名至少3个字符!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="姓名"
              className="h-12 rounded-lg border border-gray-200"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "请输入邮箱!" },
              { type: "email", message: "请输入有效的邮箱地址!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="邮箱"
              className="h-12 rounded-lg border border-gray-200"
            />
          </Form.Item>

          <Form.Item
            name="gender"
            rules={[{ required: true, message: "请选择性别" }]}
          >
            <Radio.Group className="flex gap-x-4">
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "请输入密码!" },
              { min: 6, message: "密码至少6个字符!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="密码"
              className="h-12 rounded-lg border border-gray-200"
            />
          </Form.Item>

          <Form.Item
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
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="确认密码"
              className="h-12 rounded-lg border border-gray-200"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              variant="solid"
              color="default"
              className="w-full h-12"
            >
              Sign up
            </Button>
          </Form.Item>

          <div className="text-center mt-6">
            <Link to="/login" className="text-gray-500 hover:text-[#000]">
              Already have an account?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
