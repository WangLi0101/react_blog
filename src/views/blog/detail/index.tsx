import "./detail.scss";
import { getBlogDetailApi } from "@/api/blog";
import { BlogResponse } from "@/api/blog/blog";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router";
import { Tag } from "../components/Tag";
import { formatDate } from "@/utils";
import { Clock, MessageSquareText, ChevronRight, Hash } from "lucide-react";

import Loading from "@/assets/images/loading.svg?react";

import { MarkDown } from "./components/MarkDown";
import { Chat } from "./components/Chat";
import { motion } from "framer-motion";
import clsx from "clsx";

interface Title {
  title: string;
  node: Element;
  level: number;
  id: string;
}

export const Detail: React.FC = () => {
  const [blog, setBlog] = useState<BlogResponse | null>(null);
  const [searchParams] = useSearchParams();
  const contentRef = useRef<HTMLDivElement>(null);
  const [titles, setTitles] = useState<Title[]>([]);
  const [levelList, setLevelList] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const chatRef = useRef<{
    submit: (content: string) => Promise<void>;
    setDraft: (content: string) => void;
  }>(null);
  const id = searchParams.get("id");

  const getBlogDetail = async () => {
    if (!id) return;
    const res = await getBlogDetailApi(Number(id));
    if (res.code === 0) {
      setBlog(res.data);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      const titles = contentRef.current.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
      const set = new Set<number>();
      const titlesArray = Array.from(titles).map((node, index) => {
        const level = parseInt(node.tagName.slice(1), 10);
        set.add(level);
        // 给每个标题添加id以便跳转和监听
        if (!node.id) {
          node.id = `heading-${index}`;
        }
        return {
          title: node.textContent || "",
          node,
          level,
          id: node.id,
        };
      });
      setTitles(titlesArray);
      setLevelList(Array.from(set).sort((a, b) => a - b));

      // 添加滚动监听以高亮当前标题
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "-20% 0px -80% 0px" }
      );

      titles.forEach((title) => observer.observe(title));
      return () => observer.disconnect();
    }
  }, [blog]);

  const getPaddingLeft = (level: number) => {
    const index = levelList.indexOf(level);
    return index * 12 + 10;
  };

  const askAi = async (content: string) => {
    setOpen(true);
    setTimeout(() => {
      chatRef.current?.setDraft(content);
    }, 100);
  };

  return (
    <>
      {blog ? (
        <div className="w-[1200px] max-w-full mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12 relative">
            {/* Left Content Area */}
            <motion.div
              className="min-w-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header Section */}
              <header className="mb-10 pb-8 border-b border-theme-border">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {blog.tags.map((tag) => (
                    <Tag key={tag.id}>{tag.name}</Tag>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-theme-text-primary mb-6 leading-tight tracking-tight">
                  {blog.title}
                </h1>

                <p className="text-xl text-theme-text-secondary leading-relaxed mb-6">
                  {blog.description}
                </p>

                <div className="flex items-center gap-6 text-sm text-theme-text-secondary">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    <span>{0} reads</span>
                  </div>
                </div>
              </header>

              {/* Thumbnail */}
              <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full aspect-[21/9] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Markdown Content */}
              <div
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl"
                ref={contentRef}
              >
                <MarkDown content={blog.content} askAi={askAi} isAsk={true} />
              </div>
            </motion.div>

            {/* Right Sidebar - Table of Contents */}
            <aside className="hidden lg:block relative">
              <div className="sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-hide p-6 bg-theme-bg-secondary/30 backdrop-blur-sm rounded-2xl border border-theme-border">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-theme-border">
                  <div className="p-1.5 bg-primary/10 rounded-md">
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-bold text-theme-text-primary">
                    Table of Contents
                  </span>
                </div>

                <nav className="space-y-1">
                  {titles.map((title, index) => (
                    <a
                      key={index}
                      href={`#${title.id}`}
                      className={clsx(
                        "block text-sm py-1.5 pr-4 rounded-lg transition-all duration-200 border-l-2",
                        activeId === title.id
                          ? "border-primary text-primary bg-primary/5 font-medium"
                          : "border-transparent text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg-secondary"
                      )}
                      style={{
                        paddingLeft: getPaddingLeft(title.level),
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        title.node.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                    >
                      {title.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-[calc(100vh-80px)]">
          <Loading className="w-12 h-12 text-primary" />
        </div>
      )}

      <Chat
        open={open}
        setOpen={setOpen}
        ref={chatRef}
        blogContent={blog?.content}
      />

      <motion.button
        className="fixed bottom-8 right-8 z-50 p-4 bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-110 transition-all duration-300 max-md:bottom-20"
        onClick={() => setOpen(true)}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <MessageSquareText className="w-6 h-6" />
      </motion.button>
    </>
  );
};
export default Detail;
