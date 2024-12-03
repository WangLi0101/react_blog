import { createMenuApi, editMenuApi } from "@/api/system";
import { MenuItem } from "@/api/system/system";
import { Form, Input, InputNumber, message, Modal, Switch } from "antd";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  menuItem: MenuItem | null;
  parentId: number | null;
  getMenuList: () => void;
}
interface FormType {
  title: string;
  path: string;
  icon: string;
  sort: number;
  isHidden: boolean;
}
export const AddMenuDialog: React.FC<Props> = ({
  visible,
  setVisible,
  menuItem,
  parentId,
  getMenuList,
}) => {
  const [formRef] = Form.useForm<FormType>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [icon, setIcon] = useState("");
  const initialValues = {
    title: "",
    path: "",
    icon: "",
    isHidden: false,
    sort: 1,
  };
  useEffect(() => {
    if (menuItem) {
      if (menuItem.icon) {
        setIcon(menuItem.icon);
      }
      formRef.setFieldsValue(menuItem);
    }
  }, [formRef, menuItem]);
  const closed = () => {
    formRef.resetFields();
  };
  const add = async (values: FormType) => {
    const res = await createMenuApi({ ...values, parentId: parentId });
    return res;
  };
  const edit = async (values: FormType) => {
    if (!menuItem) return;
    const res = await editMenuApi(menuItem.id, values);
    return res;
  };
  const onOk = async () => {
    formRef.validateFields().then(async (values) => {
      setConfirmLoading(true);
      const res = await (menuItem ? edit(values) : add(values));
      setConfirmLoading(false);
      if (res?.code === 0) {
        setVisible(false);
        message.success("操作成功");
        getMenuList();
      }
    });
  };

  const onValuesChange = (changedValues: Partial<FormType>) => {
    if (changedValues.icon) {
      setIcon(changedValues.icon);
    }
  };
  return (
    <div className="add-menu-dialog">
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        afterClose={closed}
        confirmLoading={confirmLoading}
        onOk={onOk}
      >
        <div className="dialog-content">
          <Form
            form={formRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onValuesChange={onValuesChange}
            initialValues={initialValues}
          >
            <Form.Item
              label="名称"
              name="title"
              rules={[{ required: true, message: "请输入名称" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="路径"
              name="path"
              rules={[{ required: true, message: "请输入路径" }]}
            >
              <Input />
            </Form.Item>
            {!parentId && (
              <Form.Item label="图标" name="icon">
                <Input prefix={<Icon icon={icon} />} />
              </Form.Item>
            )}
            <Form.Item label="是否隐藏" name="isHidden">
              <Switch />
            </Form.Item>
            <Form.Item label="排序" name="sort">
              <InputNumber min={1} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(AddMenuDialog);
