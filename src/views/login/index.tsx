import { Button, ConfigProvider, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginParams } from "@/api/system/system";
import { useUserStore } from "@/store/user";
import { useMenuStore } from "@/store/menu";

export const Login = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const menuStore = useMenuStore();
  const [form] = Form.useForm();

  const onFinish = async (values: LoginParams) => {
    const res = await userStore.login(values);
    await menuStore.getMyMenu();
    if (res) {
      message.success("登录成功");
      navigate("/");
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000000",
          colorBorder: "#000000",
          // 移除输入框阴影
          controlOutline: "none",
        },
      }}
    >
      <div className="min-h-screen flex items-center justify-center bg-[#00A9FF] p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Auth</h1>
            <p className="mt-2 text-gray-500">Welcome Back!</p>
          </div>

          <Form
            form={form}
            name="login"
            className="space-y-5"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名!" }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="用户名"
                className="h-10 rounded-lg border border-gray-200 "
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="密码"
                className="h-10 rounded-lg border border-gray-200"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                color="default"
                variant="solid"
                className="w-full h-12"
              >
                Login
              </Button>
            </Form.Item>

            <div className="text-center mt-6">
              <Link to="/register" className="text-gray-500 hover:text-[#000]">
                Don't have an account?
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};
