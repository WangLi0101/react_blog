import { Input, Modal, Form, FormInstance, message } from "antd";
import React, { useRef, useState } from "react";
interface Props {
  dialogVisible: boolean;
  setDialogVisible: (visible: boolean) => void;
  roleId: number;
}
type FieldType = {
  menuIds: number[];
};

export const RolesDialog: React.FC<Props> = React.memo(
  ({ dialogVisible, setDialogVisible, roleId }) => {
    const [formRef] = Form.useForm<FieldType>();
    const [loading, setLoading] = useState(false);

    const handleOk = () => {
      formRef.validateFields().then(async (values) => {
        console.log(values);
      });
    };
    const handleCancel = () => {
      formRef.resetFields();
      setDialogVisible(false);
    };

    return (
      <Modal
        title="分配菜单"
        open={dialogVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <div className="content">11</div>
      </Modal>
    );
  }
);
