import { getBlogsApi, getTagsApi } from "@/api/blog";
import React, { useEffect, useState } from "react";
import { BlogItem } from "../components/BlogItem";
import { BlogResponse, Tag } from "@/api/blog/blog";
import { Select } from "antd";
import { useImmer } from "use-immer";
import { LazyLoad } from "@/components/LazyLoad";

export const Blog: React.FC = () => {
  const [blogList, setBlogList] = useState<BlogResponse[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isStop, setIsStop] = useState(false);
  const [query, setQuery] = useImmer({
    page: 1,
    pageSize: 8,
    title: "",
    tagId: null,
  });
  const getBlogList = async () => {
    const res = await getBlogsApi(query);
    if (res.code === 0) {
      setIsStop(res.data.list.length < query.pageSize);
      setBlogList(res.data.list);
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
    setQuery((draft) => {
      draft.page++;
    });
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
                setQuery((draft) => {
                  draft.tagId = value;
                });
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
