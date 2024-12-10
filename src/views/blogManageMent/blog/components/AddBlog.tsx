import {
  createBlogApi,
  editBlogApi,
  getBlogDetailApi,
  getTagsApi,
} from "@/api/blog";
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
import { useNavigate, useSearchParams } from "react-router";
import { Blog } from "@/api/blog/blog";
import { getPath } from "@/utils";

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
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [blog, setBlog] = useState<Blog | null>(null);
  const navigate = useNavigate();
  // 获取query参数
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  // 获取博客详情
  const getBlogDetail = async () => {
    if (!id) return;
    const res = await getBlogDetailApi(Number(id));
    if (res.code === 0) {
      setBlog(res.data);
      form.setFieldsValue({
        title: res.data.title,
        description: res.data.description,
        thumbnail: res.data.thumbnail,
        tags: res.data.tags.map((el) => el.id),
        content: res.data.content,
      });
      setImageUrl(res.data.thumbnail);
    }
  };
  useEffect(() => {
    getBlogDetail();
    getTags();
  }, []);

  const getTags = async () => {
    const res = await getTagsApi();
    if (res.code === 0) {
      const list = res.data.map((el) => ({ label: el.name, value: el.id }));
      setTagList(list);
    }
  };
  const customRequest: UploadProps["customRequest"] = ({ file, onSuccess }) => {
    const base64 = URL.createObjectURL(file as Blob);
    setImageUrl(base64);
    fileRef.current = file as File;
    onSuccess?.(fileRef.current);
  };

  const uploadFile = async () => {
    const uploadUrl = await upload(fileRef.current!, "blog/thumbnail");
    return uploadUrl;
  };

  const addSubmit = async (values: FieldType) => {
    setLoading(true);
    const { thumbnail: _, ...data } = values;
    const thumbnail = await uploadFile();
    const res = await createBlogApi({
      ...data,
      thumbnail,
    });
    setLoading(false);
    if (res.code === 0) {
      message.success("新增成功");
    }
  };

  const editSubmit = async (values: FieldType) => {
    setLoading(true);
    let thumbnail = "";
    if (fileRef.current) {
      thumbnail = await uploadFile();
    } else {
      thumbnail = getPath(values.thumbnail);
    }
    const res = await editBlogApi(blog!.id, {
      ...values,
      thumbnail,
    });
    setLoading(false);
    if (res.code === 0) {
      message.success("编辑成功");
      getBlogDetail();
    }
  };

  const onFinish = async (values: FieldType) => {
    if (id) {
      editSubmit(values);
    } else {
      addSubmit(values);
    }
  };

  return (
    <div className="h-full overflow-auto">
      <Form
        form={form}
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
          <TextArea placeholder="Please input your description!" autoSize />
        </Form.Item>
        <Form.Item<FieldType>
          label="封面"
          name="thumbnail"
          rules={[{ required: true, message: "Please input you thumbnail!" }]}
        >
          <Upload
            name="thumbnail"
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
          <Select options={tagList} mode="multiple" />
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
            <Button type="primary" htmlType="submit" loading={loading}>
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
