import { deleteBlogApi, getBlogsApi } from "@/api/blog";
import { Blog } from "@/api/blog/blog";
import { formatDate } from "@/utils";
import { Button, message, Modal, Pagination, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";

const BlogPage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState({
    page: 1,
    pageSize: 10,
    title: "",
  });
  const getBlogs = async () => {
    const res = await getBlogsApi(query);
    if (res.code === 0) {
      setBlogs(res.data.list);
      setTotal(res.data.total);
    }
  };
  const del = async (blog: Blog) => {
    Modal.confirm({
      title: "确定要删除吗？",
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
    { title: "标题", dataIndex: "title", ellipsis: true },
    { title: "描述", dataIndex: "description", ellipsis: true },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      width: 180,
      render: (text: string) => formatDate(text),
    },
    {
      title: "更新时间",
      width: 180,
      dataIndex: "updatedAt",
      render: (text: string) => formatDate(text),
    },
    {
      title: "操作",
      width: 170,
      align: "center",
      render: (_, blog: Blog) => (
        <>
          <Button type="link" onClick={() => edit(blog)}>
            编辑
          </Button>
          <Button type="link" onClick={() => del(blog)}>
            删除
          </Button>
        </>
      ),
    },
  ];
  useEffect(() => {
    getBlogs();
  }, [query]);

  return (
    <div>
      <div className="operator flex flex-row-reverse mb-5">
        <Button type="primary" onClick={() => navigate("/back/blog/blog/add")}>
          新增
        </Button>
      </div>
      <div className="mb-5">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={blogs}
          pagination={false}
          className="h-[calc(100vh-320px)]"
        />
      </div>
      <div className="pagination flex flex-row-reverse">
        <Pagination
          total={total}
          current={query.page}
          pageSize={query.pageSize}
          showSizeChanger
          onChange={(page, pageSize) => setQuery({ ...query, page, pageSize })}
        />
      </div>
    </div>
  );
};
export default BlogPage;
