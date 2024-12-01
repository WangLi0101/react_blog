import { Button, Form, Input, message, Radio } from "antd";
import { useNavigate } from "react-router";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { CreateUserParams } from "@/api/system/system";
import { createUser } from "@/api/system";

export const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: CreateUserParams) => {
    console.log("Success:", values);
    const res = await createUser(values);
    if (res.code === 0) {
      message.success("注册成功");
      // navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 to-emerald-500 p-4">
      <div className="max-w-md w-full space-y-8 bg-white/95 p-8 sm:p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">账号注册</h1>
          <p className="text-gray-600">创建一个新账号</p>
        </div>

        <Form
          form={form}
          name="register"
          className="mt-8 space-y-6"
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
              size="large"
              placeholder="用户名"
              className="rounded-lg hover:border-emerald-500 focus:border-emerald-500 focus:shadow-outline-emerald"
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
              size="large"
              placeholder="邮箱"
              className="rounded-lg hover:border-emerald-500 focus:border-emerald-500 focus:shadow-outline-emerald"
            />
          </Form.Item>

          <Form.Item
            name="gender"
            rules={[{ required: true, message: "请选择性别" }]}
          >
            <Radio.Group>
              <Radio value={1}> 男 </Radio>
              <Radio value={2}> 女 </Radio>
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
              size="large"
              placeholder="密码"
              className="rounded-lg hover:border-emerald-500 focus:border-emerald-500 focus:shadow-outline-emerald"
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
              size="large"
              placeholder="确认密码"
              className="rounded-lg hover:border-emerald-500 focus:border-emerald-500 focus:shadow-outline-emerald"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full h-12 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:opacity-90 
                         rounded-lg border-0 font-medium transition-all duration-300 
                         hover:shadow-lg hover:-translate-y-0.5"
            >
              注册
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-600 mb-4">已有账号？</p>
          <Button
            size="large"
            className="w-full h-12 bg-white hover:bg-gray-50 border-2 border-emerald-500 text-emerald-500
                       rounded-lg font-medium transition-all duration-300
                       hover:shadow-md hover:-translate-y-0.5"
            onClick={() => navigate("/login")}
          >
            返回登录
          </Button>
        </div>
      </div>
    </div>
  );
};
