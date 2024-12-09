import { getBlogsApi } from "@/api/blog";
import { Blog } from "@/api/blog/blog";
import { Button, Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
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
  const columns = [
    { title: "标题", dataIndex: "title" },
    { title: "描述", dataIndex: "description" },
    { title: "创建时间", dataIndex: "createdAt" },
    { title: "更新时间", dataIndex: "updatedAt" },
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
