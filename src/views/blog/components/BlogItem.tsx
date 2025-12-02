import { BlogResponse } from "@/api/blog/blog";
import { formatDate } from "@/utils";
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
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        filter: {
          type: "tween",
          ease: "easeOut",
        },
      },
    },
  };

  return (
    <motion.div
      variants={item}
      className="group relative flex flex-col h-full bg-gradient-to-br from-white to-slate-50 dark:from-theme-card dark:to-theme-card border border-theme-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500 cursor-pointer"
      onClick={goDetail}
      whileHover={{ y: -5 }}
    >
      <div className="thumbnail relative overflow-hidden aspect-[16/9] md:aspect-[16/9]">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm p-1.5 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-medium">
            {blog.tags[0]?.name || "Article"}
          </div>
          <div className="flex items-center gap-1 text-theme-text-secondary text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        <h2 className="font-bold text-base text-theme-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
          {blog.title}
        </h2>

        <p className="text-theme-text-secondary text-xs leading-relaxed truncate mb-3 flex-1">
          {blog.description}
        </p>

        <div className="flex items-center text-primary font-medium text-xs group/link pt-3 border-t border-theme-border">
          <span>Read more</span>
          <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
        </div>
      </div>
    </motion.div>
  );
};
