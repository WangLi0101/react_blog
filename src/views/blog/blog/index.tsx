import { getBlogsApi, getTagsApi } from "@/api/blog";
import React, { useEffect, useRef, useState } from "react";
import { BlogItem } from "../components/BlogItem";
import { BlogResponse, Tag } from "@/api/blog/blog";
import { Select } from "antd";
import { LazyLoad } from "@/components/LazyLoad";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

export const Blog: React.FC = () => {
  const [blogList, setBlogList] = useState<BlogResponse[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isStop, setIsStop] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryRef = useRef({
    page: 0,
    pageSize: 24,
    title: "",
    tagId: null,
  });

  const getBlogList = async () => {
    setLoading(true);
    const res = await getBlogsApi(queryRef.current);
    setLoading(false);
    if (res.code === 0) {
      setBlogList(res.data.list);
      setIsStop(res.data.list.length < queryRef.current.pageSize);
    }
  };

  const pushBlogList = async () => {
    setLoading(true);
    const res = await getBlogsApi(queryRef.current);
    setLoading(false);
    if (res.code === 0) {
      setIsStop(res.data.list.length < queryRef.current.pageSize);
      setBlogList((prev) => [...prev, ...res.data.list]);
    }
  };

  const getTags = async () => {
    const res = await getTagsApi();
    if (res.code === 0) {
      setTags(res.data);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  const getList = () => {
    queryRef.current.page++;
    pushBlogList();
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="w-[1200px] max-w-full mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <div className="content">
        <div className="top mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-theme-border/40 pb-6 gap-4 md:gap-0">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-theme-text-primary tracking-tight">
              Latest Posts
            </h2>
            <p className="text-theme-text-secondary text-base md:text-lg">
              Explore thoughts, tutorials and insights.
            </p>
          </div>

          <div className="right flex items-center gap-3 w-full md:w-auto">
            <div className="hidden md:flex items-center gap-2 text-theme-text-secondary bg-theme-bg-secondary/50 px-3 py-1.5 rounded-lg border border-theme-border/50">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter by</span>
            </div>
            <Select
              className="w-full md:w-[180px] custom-select"
              placeholder="All Topics"
              allowClear={true}
              variant="outlined"
              popupClassName="!bg-theme-bg !border !border-theme-border !shadow-xl !rounded-xl"
              style={{
                height: "40px",
              }}
              onChange={(value) => {
                queryRef.current.tagId = value;
                queryRef.current.page = 1;
                getBlogList();
              }}
            >
              {tags.map((tag) => (
                <Select.Option
                  value={tag.id}
                  key={tag.id}
                  className="!text-theme-text-primary hover:!bg-theme-bg-secondary"
                >
                  {tag.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>

        <motion.div
          className="list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {blogList.map((blog) => (
            <BlogItem blog={blog} key={blog.id} />
          ))}
        </motion.div>

        <div className="mt-12">
          <LazyLoad isStop={isStop} getList={getList} loading={loading} />
        </div>
      </div>
    </div>
  );
};
export default Blog;
