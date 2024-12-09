import { createBlogApi, getTagsApi } from "@/api/blog";
import {
  Button,
  Form,
  Input,
  message,
  Select,
  Upload,
  UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import Editor from "for-editor";
import { PlusOutlined } from "@ant-design/icons";
import { upload } from "@/utils/oss";
import { useNavigate } from "react-router";

interface FieldType {
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  tags: number[];
}
const uploadButton = (
  <button style={{ border: 0, background: "none" }} type="button">
    {<PlusOutlined />}
    <div style={{ marginTop: 8 }}>Upload</div>
  </button>
);
const AddBlog: React.FC = () => {
  const [tagList, setTagList] = useState<{ label: string; value: number }[]>(
    []
  );
  const [imageUrl, setImageUrl] = useState<string>();
  const fileRef = useRef<File | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
    const res = await getTagsApi();
    if (res.code === 0) {
      const list = res.data.map((el) => ({ label: el.name, value: el.id }));
      setTagList(list);
    }
  };
  const customRequest: UploadProps["customRequest"] = ({ file }) => {
    const base64 = URL.createObjectURL(file as Blob);
    setImageUrl(base64);
    fileRef.current = file as File;
  };
  const onFinish = async (values: FieldType) => {
    console.log(values);
    const { thumbnail: _, ...data } = values;
    const uploadUrl = await upload(fileRef.current!, "blog/thumbnail");
    const res = await createBlogApi({
      ...data,
      thumbnail: uploadUrl,
    });
    if (res.code === 0) {
      message.success("新增成功");
    }
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 3 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="标题"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="描述"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <TextArea
            placeholder="Autosize height based on content lines"
            autoSize
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="封面"
          name="thumbnail"
          rules={[{ required: true, message: "Please input your thumbnail!" }]}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="#"
            customRequest={customRequest}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item<FieldType>
          label="标签"
          name="tags"
          rules={[{ required: true, message: "Please input your tags!" }]}
        >
          <Select style={{ width: 120 }} options={tagList} mode="multiple" />
        </Form.Item>
        <Form.Item<FieldType>
          label="内容"
          name="content"
          rules={[{ required: true, message: "Please input your content!" }]}
        >
          <Editor subfield={true} preview={true} />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-center">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button className="ml-5" onClick={() => navigate(-1)}>
              返回
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBlog;
