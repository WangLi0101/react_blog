import { BlogResponse } from "@/api/blog/blog";
import { formatDate } from "@/utils";
import { Tag } from "../components/Tag";
import { Icon } from "@iconify/react";
import React from "react";

interface Props {
  blog: BlogResponse;
}

export const BlogItem: React.FC<Props> = ({ blog }) => {
  const goDetail = () => {
    window.open(`/front/blog/detail?id=${blog.id}`, "_blank");
  };
  return (
    <div
      className="border border-gray-300 rounded-xl space-y-4 p-4 cursor-pointer max-md:space-y-2"
      onClick={goDetail}
      data-aos="zoom-in"
    >
      <div className="thumbnail">
        <img
          src={blog.thumbnail}
          alt=""
          className="w-full aspect-[5/2] object-cover rounded-xl"
        />
      </div>
      <div className="flex">
        <Tag>{blog.tags[0].name}</Tag>
      </div>
      <h2 className="titel font-bold text-xl line-clamp-2 max-md:text-[18px]">
        {blog.title}
      </h2>
      <p className="text-base line-clamp-2">{blog.description}</p>
      <div className="time flex items-center gap-3 mb-7">
        <Icon
          icon="material-symbols:alarm-outline"
          className="text-theme-primary"
        />
        <p className="mb-0">{formatDate(blog.createdAt)}</p>
      </div>
    </div>
  );
};
