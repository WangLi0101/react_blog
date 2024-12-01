import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginParams } from "@/api/system/system";
import { useUserStore } from "@/store/user";
import { useMenuStore } from "@/store/menu";

export const Login = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const menuStore = useMenuStore();
  const onFinish = async (values: LoginParams) => {
    const res = await userStore.login(values);
    if (res) {
      message.success("登录成功");
      const path = menuStore.flattenMenuList.filter(
        (item) => item.path !== "/login" && item.Component
      )[0].path;
      if (!path) return;
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 to-emerald-500 p-4">
      <div className="max-w-md w-full space-y-8 bg-white/95 p-8 sm:p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">系统登录</h1>
          <p className="text-gray-600">欢迎回来，请登录您的账号</p>
        </div>

        <Form
          name="login"
          className="mt-8 space-y-6"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              size="large"
              placeholder="用户名"
              className="rounded-lg hover:border-emerald-500 focus:border-emerald-500 focus:shadow-outline-emerald"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              size="large"
              placeholder="密码"
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
              登录
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-600 mb-4">还没有账号？</p>
          <Button
            size="large"
            className="w-full h-12 bg-white hover:bg-gray-50 border-2 border-emerald-500 text-emerald-500
                       rounded-lg font-medium transition-all duration-300
                       hover:shadow-md hover:-translate-y-0.5"
            onClick={() => navigate("/register")}
          >
            注册新账户
          </Button>
        </div>
      </div>
    </div>
  );
};
