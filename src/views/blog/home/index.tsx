import React, { useEffect, useState } from "react";
import banner from "@/assets/images/banner.png";
import { BlogResponse } from "@/api/blog/blog";
import { getBlogsApi } from "@/api/blog";
import { BlogItem } from "../components/BlogItem";
export const Home: React.FC = () => {
  const [blogList, setBlogList] = useState<BlogResponse[]>([]);
  const getBlogList = async () => {
    const res = await getBlogsApi({ page: 1, pageSize: 12, title: "" });
    if (res.code === 0) {
      setBlogList(res.data.list);
    }
  };
  useEffect(() => {
    getBlogList();
  }, []);
  return (
    <div>
      <div className="baaner" data-aos="fade-up">
        <img src={banner} alt="" className="w-full h-auto" />
      </div>
      <div className="content mt-20">
        <h2 className="text-2xl font-bold mb-10">Latest Posts</h2>
        <div className="list grid grid-cols-4 gap-5">
          {blogList.map((blog) => (
            <BlogItem blog={blog} key={blog.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
