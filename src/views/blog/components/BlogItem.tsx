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
      <div className="thumbnail relative overflow-hidden aspect-[16/9] md:aspect-[16/9] h-[160px] md:h-auto">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm p-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 text-primary" />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 md:p-6">
        <div className="flex items-center gap-3 mb-2 md:mb-4">
          <div className="bg-primary/10 text-primary px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium">
            {blog.tags[0]?.name || "Article"}
          </div>
          <div className="flex items-center gap-1.5 text-theme-text-secondary text-[10px] md:text-xs">
            <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        <h2 className="font-bold text-lg md:text-xl text-theme-text-primary mb-2 md:mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {blog.title}
        </h2>

        <p className="text-theme-text-secondary text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-3 md:mb-4 flex-1">
          {blog.description}
        </p>

        <div className="flex items-center text-primary font-medium text-xs md:text-sm group/link pt-3 md:pt-4 border-t border-theme-border">
          <span>Read more</span>
          <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
        </div>
      </div>
    </motion.div>
  );
};
