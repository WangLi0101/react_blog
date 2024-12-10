import { getBlogDetailApi } from "@/api/blog";
import { BlogResponse } from "@/api/blog/blog";
import React, { useEffect, useState, ComponentPropsWithoutRef } from "react";
import { useSearchParams } from "react-router";
import { Tag } from "../components/Tag";
import { formatDate } from "@/utils";
import { Icon } from "@iconify/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import MarkdownNavbar from "markdown-navbar";
import { Anchor } from "antd";
import { motion } from "framer-motion";
import "markdown-navbar/dist/navbar.css";
import "./detail.scss";
export const Detail: React.FC = () => {
  const [blog, setBlog] = useState<BlogResponse | null>(null);
  const [searchParams] = useSearchParams();
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
  return (
    blog && (
      <div className="mx-auto flex blog_detail">
        <div className="left w-[70%]">
          <div className="tags flex items-center gap-3 mb-7">
            {blog.tags.map((tag) => (
              <Tag key={tag.id}>{tag.name}</Tag>
            ))}
          </div>
          <p className="title font-bold text-4xl leading-10 mb-7">
            {blog.title}
          </p>
          <p className="description font-bold text-xl leading-7 mb-7">
            {blog.description}
          </p>
          <div className="time flex items-center gap-3 mb-7">
            <Icon
              icon="material-symbols:alarm-outline"
              className="text-theme-primary"
            />
            <p className="mb-0">{formatDate(blog.createdAt)}</p>
          </div>
          <div className="thumbnail mb-5">
            <img
              src={blog.thumbnail}
              alt=""
              className="w-full h-auto rounded-xl"
            />
          </div>
          <div className="content prose prose-lg max-w-none dark:prose-invert prose-pre:p-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({
                  inline,
                  className,
                  children,
                  ...props
                }: ComponentPropsWithoutRef<"code"> & { inline?: boolean }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      // @ts-expect-error style type mismatch
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </div>
        <div className="right ml-9 flex-1">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              mass: 0.8,
              duration: 0.3,
            }}
          >
            <Anchor>
              <MarkdownNavbar
                className="text-xl"
                source={blog.content}
                headingTopOffset={50}
              />
            </Anchor>
          </motion.div>
        </div>
      </div>
    )
  );
};
export default Detail;
