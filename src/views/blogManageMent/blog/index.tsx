import { deleteBlogApi, getBlogsApi } from "@/api/blog";
import { Blog } from "@/api/blog/blog";
import { formatDate } from "@/utils";
import {
  Button,
  message,
  Modal,
  Pagination,
  Table,
  Input,
  Space,
  Tag,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";

const BlogPage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
    pageSize: 15, // 增加每页显示数量
    title: "",
  });

  const getBlogs = async () => {
    setLoading(true);
    try {
      const res = await getBlogsApi(query);
      if (res.code === 0) {
        setBlogs(res.data.list);
        setTotal(res.data.total);
      }
    } finally {
      setLoading(false);
    }
  };

  const del = async (blog: Blog) => {
    Modal.confirm({
      title: "确认删除",
      content: `确定要删除博客 "${blog.title}" 吗？此操作不可恢复。`,
      okText: "确定删除",
      cancelText: "取消",
      okType: "danger",
      className: "modern-modal",
      centered: true,
      onOk: async () => {
        const res = await deleteBlogApi(blog.id);
        if (res.code === 0) {
          message.success("删除成功");
          getBlogs();
        }
      },
    });
  };

  const edit = (blog: Blog) => {
    navigate(`/back/blog/blog/edit?id=${blog.id}`);
  };

  const columns: ColumnsType<Blog> = [
    {
      title: "#",
      key: "index",
      width: 60,
      align: "center",
      fixed: "left",
      render: (_, _record, index) => (
        <span className="index-number">
          {(query.page - 1) * query.pageSize + index + 1}
        </span>
      ),
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 250,
      fixed: "left",
      render: (text: string) => (
        <div className="blog-title" title={text}>
          <div className="title-text">{text}</div>
        </div>
      ),
    },
    {
      title: "描述",
      dataIndex: "description",
      width: 300,
      render: (text: string) => (
        <div className="blog-description" title={text}>
          <div className="description-text">{text || "暂无描述"}</div>
        </div>
      ),
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 100,
      align: "center",
      render: () => <Tag color="success">已发布</Tag>,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      width: 160,
      render: (text: string) => (
        <span className="date-text">{formatDate(text)}</span>
      ),
    },
    {
      title: "更新时间",
      width: 160,
      dataIndex: "updatedAt",
      render: (text: string) => (
        <span className="date-text">{formatDate(text)}</span>
      ),
    },
    {
      title: "操作",
      width: 180,
      align: "center",
      fixed: "right",
      render: (_, blog: Blog) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => edit(blog)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => del(blog)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getBlogs();
  }, [query]);

  const handleSearch = (value: string) => {
    setQuery({ ...query, title: value, page: 1 });
  };

  return (
    <div className="bg-theme-bg ">
      <div className="max-w-full mx-auto">
        {/* 搜索和操作区域 */}
        <div className="flex justify-between items-center mb-4">
          <Input.Search
            className="w-80"
            placeholder="搜索博客标题..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (!e.target.value) {
                handleSearch("");
              }
            }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/back/blog/blog/add")}
          >
            新增博客
          </Button>
        </div>

        {/* 表格区域 */}
        <div className="bg-theme-bg border border-theme-border rounded-xl overflow-hidden">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={blogs}
            pagination={false}
            loading={loading}
            scroll={{
              y: "calc(100vh - 350px)", // 增加表格高度
              x: 1200, // 增加横向滚动宽度
            }}
            size="middle"
            className="blog-table"
          />
        </div>

        {/* 分页区域 */}
        <div className="flex justify-end mt-5">
          <Pagination
            total={total}
            current={query.page}
            pageSize={query.pageSize}
            showSizeChanger
            showQuickJumper
            showTotal={(total: number, range: [number, number]) =>
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
            }
            onChange={(page: number, pageSize: number) =>
              setQuery({ ...query, page, pageSize })
            }
            pageSizeOptions={["10", "15", "20", "30", "50"]}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
