import { BlogResponse } from "@/api/blog/blog";
import { formatDate } from "@/utils";
import { Tag } from "../components/Tag";
import { Clock, ArrowUpRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  blog: BlogResponse;
}

export const BlogItem: React.FC<Props> = ({ blog }) => {
  const goDetail = () => {
    window.open(`/blog/detail?id=${blog.id}`, "_blank");
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={item}
      className="group relative flex flex-col h-full bg-theme-card border border-theme-border/60 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer"
      onClick={goDetail}
      whileHover={{ y: -5 }}
    >
      <div className="thumbnail relative overflow-hidden aspect-[16/9]">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 text-primary" />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
            {blog.tags[0]?.name || "Article"}
          </div>
          <div className="flex items-center gap-1.5 text-theme-text-secondary text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        <h2 className="font-bold text-xl text-theme-text-primary mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {blog.title}
        </h2>

        <p className="text-theme-text-secondary text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
          {blog.description}
        </p>

        <div className="flex items-center text-primary font-medium text-sm group/link pt-4 border-t border-theme-border/40">
          <span>Read more</span>
          <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
        </div>
      </div>
    </motion.div>
  );
};
