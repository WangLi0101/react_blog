import { getRolesApi } from "@/api/system";
import { Role } from "@/api/system/system";
import { Form, FormInstance, Select } from "antd";
import React, { useEffect, useState } from "react";
export interface AssingRoleFormType {
  roleIds: number[];
}
interface Props {
  formRef: FormInstance;
}
export const AssignRoleForm: React.FC<Props> = ({ formRef }) => {
  const [roleList, setRoleList] = useState<Role[]>([]);
  useEffect(() => {
    getRoleList();
  }, []);
  const getRoleList = async () => {
    const res = await getRolesApi();
    if (res.code === 0) {
      setRoleList(res.data);
    }
  };
  return (
    <Form<AssingRoleFormType>
      form={formRef}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, width: "100%" }}
      autoComplete="off"
    >
      <Form.Item<AssingRoleFormType>
        label="角色"
        name="roleIds"
        rules={[{ required: true, message: "请选择角色!" }]}
      >
        <Select
          mode="multiple"
          options={roleList.map((role) => ({
            label: role.name,
            value: role.id,
          }))}
        />
      </Form.Item>
    </Form>
  );
};
