import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router";
import { UserOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Code, LoginParams } from "@/api/system/system";
import { useUserStore } from "@/store/user";
import { useMenuStore } from "@/store/menu";
import { getCaptchaApi } from "@/api/system";
import { useEffect, useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const menuStore = useMenuStore();
  const [form] = Form.useForm();
  const [codeRes, setCodeRes] = useState<Code>();
  const [messageApi, contextHolder] = message.useMessage();
  const getCode = async () => {
    const res = await getCaptchaApi();
    if (res.code === 0) {
      setCodeRes(res.data);
    }
  };
  useEffect(() => {
    getCode();
  }, []);
  const onFinish = async (values: LoginParams) => {
    if (!codeRes) return;
    const res = await userStore.login({ ...values, codeId: codeRes.codeId });
    await menuStore.getMyMenu();
    if (res) {
      messageApi.success("登录成功");
      navigate("/system/role");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00A9FF] p-4">
      {contextHolder}
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

          <Form.Item
            name="code"
            rules={[{ required: true, message: "请输入验证码!" }]}
          >
            <div className="flex items-center gap-2">
              <Input
                prefix={<UnlockOutlined className="text-gray-400" />}
                placeholder="验证码"
                className="h-10 rounded-lg border border-gray-200 "
              />
              <div
                dangerouslySetInnerHTML={{ __html: codeRes?.code || "" }}
                className="captcha-container cursor-pointer"
                onClick={getCode}
              />
            </div>
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
  );
};
