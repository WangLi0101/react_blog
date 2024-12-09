import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router";

const Blog: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="operator">
        <Button type="primary" onClick={() => navigate("/back/blog/blog/add")}>
          新增
        </Button>
      </div>
    </div>
  );
};
export default Blog;
