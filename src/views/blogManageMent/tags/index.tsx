import { createTagApi, deleteTagApi, editTagApi, getTagsApi } from "@/api/blog";
import { Tag } from "@/api/blog/blog";
import { Button, Form, Input, message, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";

const Tags: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [currentTag, setCurrentTag] = useState<Tag | null>(null);
  const [formRef] = Form.useForm();
  const getTags = async () => {
    setLoading(true);
    const res = await getTagsApi();
    setLoading(false);
    if (res.code === 0) {
      setTags(res.data);
    }
  };
  const Columns: ColumnsType<Tag> = [
    {
      title: "#",
      dataIndex: "username",
      width: 30,
      align: "center",
      render: (_, _record: Tag, index: number) => {
        return index + 1;
      },
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "操作",
      dataIndex: "action",
      align: "center",
      width: 250,
      render: (_: string, record: Tag) => (
        <>
          <Button type="link" onClick={() => edit(record)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => del(record)}>
            删除
          </Button>
        </>
      ),
    },
  ];
  // 删除
  const del = async (record: Tag) => {
    Modal.confirm({
      title: "确定要删除吗？",
      onOk: async () => {
        const res = await deleteTagApi(record.id);
        if (res.code === 0) {
          message.success("删除成功");
          getTags();
        }
      },
    });
  };
  // 新增
  const add = () => {
    setCurrentTag(null);
    setAddDialogVisible(true);
  };
  // 编辑
  const edit = (record: Tag) => {
    setCurrentTag(record);
    formRef.setFieldsValue(record);
    setAddDialogVisible(true);
  };
  // 新增确定
  const addConfirm = async () => {
    const res = await createTagApi(formRef.getFieldsValue());
    if (res.code === 0) {
      message.success("新增成功");
      getTags();
    }
  };
  // 编辑确定
  const editConfirm = async () => {
    if (!currentTag) return;
    const res = await editTagApi(currentTag.id, formRef.getFieldsValue());
    if (res.code === 0) {
      message.success("编辑成功");
      getTags();
    }
  };
  const onOk = async () => {
    if (currentTag) {
      await editConfirm();
    } else {
      await addConfirm();
    }
    setAddDialogVisible(false);
  };
  const closed = () => {
    formRef.resetFields();
  };
  useEffect(() => {
    getTags();
  }, []);

  return (
    <div>
      <div className="operator mb-5 flex flex-row-reverse">
        <Button type="primary" onClick={add}>
          新增
        </Button>
      </div>
      <Table
        rowKey={(record) => record.id}
        columns={Columns}
        dataSource={tags}
        loading={loading}
        pagination={false}
      />
      <Modal
        title={currentTag ? "编辑标签" : "新增标签"}
        open={addDialogVisible}
        onCancel={() => setAddDialogVisible(false)}
        onOk={onOk}
        afterClose={closed}
        className="modern-modal"
        width={480}
        centered
      >
        <Form form={formRef} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} layout="horizontal">
          <Form.Item 
            label="标签名称" 
            name="name" 
            rules={[{ required: true, message: "请输入标签名称" }]}
          >
            <Input placeholder="请输入标签名称" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Tags;
