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
  component: string;
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
        title={menuItem ? "编辑菜单" : "添加菜单"}
        open={visible}
        onCancel={() => setVisible(false)}
        afterClose={closed}
        confirmLoading={confirmLoading}
        onOk={onOk}
        className="modern-modal"
        width={600}
        centered
      >
        <div className="dialog-content">
          <Form
            form={formRef}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onValuesChange={onValuesChange}
            initialValues={initialValues}
            layout="horizontal"
          >
            <Form.Item
              label="菜单名称"
              name="title"
              rules={[{ required: true, message: "请输入菜单名称" }]}
            >
              <Input placeholder="请输入菜单名称" />
            </Form.Item>
            <Form.Item
              label="组件路径"
              name="component"
              rules={[{ required: !!parentId, message: "请输入组件路径" }]}
            >
              <Input placeholder="请输入组件路径，如：/views/Home" />
            </Form.Item>
            <Form.Item
              label="路由路径"
              name="path"
              rules={[{ required: true, message: "请输入路由路径" }]}
            >
              <Input placeholder="请输入路由路径，如：/home" />
            </Form.Item>
            {!parentId && (
              <Form.Item label="菜单图标" name="icon">
                <Input 
                  prefix={icon && <Icon icon={icon} />} 
                  placeholder="请输入图标名称，如：mdi:home"
                />
              </Form.Item>
            )}
            <Form.Item label="是否隐藏" name="isHidden" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="排序权重" name="sort">
              <InputNumber 
                min={1} 
                placeholder="数字越小排序越靠前"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default React.memo(AddMenuDialog);
