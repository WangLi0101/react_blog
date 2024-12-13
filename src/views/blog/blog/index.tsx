import { getBlogsApi, getTagsApi } from "@/api/blog";
import React, { useEffect, useRef, useState } from "react";
import { BlogItem } from "../components/BlogItem";
import { BlogResponse, Tag } from "@/api/blog/blog";
import { Select } from "antd";
import { LazyLoad } from "@/components/LazyLoad";

export const Blog: React.FC = () => {
  const [blogList, setBlogList] = useState<BlogResponse[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isStop, setIsStop] = useState(false);
  const queryRef = useRef({
    page: 0,
    pageSize: 24,
    title: "",
    tagId: null,
  });
  const getBlogList = async () => {
    const res = await getBlogsApi(queryRef.current);
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
    getBlogList();
  };
  return (
    <div>
      <div className="content mt-20 max-md:mt-10">
        <div className="top mb-10 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Blog</h2>
          <div className="right">
            <Select
              className="w-[150px]"
              placeholder="Please select type"
              allowClear={true}
              onChange={(value) => {
                queryRef.current.tagId = value;
                queryRef.current.page = 1;
                getBlogList();
              }}
            >
              {tags.map((tag) => (
                <Select.Option value={tag.id} key={tag.id}>
                  {tag.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="list grid grid-cols-4 gap-5 max-md:grid-cols-1">
          {blogList.map((blog) => (
            <BlogItem blog={blog} key={blog.id} />
          ))}
        </div>
        <LazyLoad isStop={isStop} getList={getList} />
      </div>
    </div>
  );
};
export default Blog;
