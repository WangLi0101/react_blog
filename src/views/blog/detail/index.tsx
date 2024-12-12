import { getBlogDetailApi } from "@/api/blog";
import { BlogResponse } from "@/api/blog/blog";
import React, {
  useEffect,
  useState,
  ComponentPropsWithoutRef,
  useRef,
} from "react";
import { useSearchParams } from "react-router";
import { Tag } from "../components/Tag";
import { formatDate } from "@/utils";
import { Icon } from "@iconify/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import "./detail.scss";
interface Title {
  title: string;
  node: Element;
  level: number;
}

export const Detail: React.FC = () => {
  const [blog, setBlog] = useState<BlogResponse | null>(null);
  const [searchParams] = useSearchParams();
  const contentRef = useRef<HTMLDivElement>(null);
  const [titles, setTitles] = useState<Title[]>([]);
  const [levelList, setLevelList] = useState<number[]>([]);
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
      const titlesArray = Array.from(titles).map((node) => {
        const level = parseInt(node.tagName.slice(1), 10);
        set.add(level);
        return {
          title: node.textContent || "",
          node,
          level,
        };
      });
      setTitles(titlesArray);
      setLevelList(Array.from(set).sort((a, b) => a - b));
    }
  }, [blog]);

  const getPaddingLeft = (level: number) => {
    const index = levelList.indexOf(level);
    return index * 5;
  };
  return (
    blog && (
      <div className="mx-auto blog_detail py-[50px]">
        <div className="left w-[75%] h-full overflow-auto" data-aos="fade-up">
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
              data-aos="fade-up"
              src={blog.thumbnail}
              alt=""
              className="w-full h-auto rounded-xl aspect-[5/2] object-cover"
            />
          </div>
          <div
            className="content prose prose-lg max-w-none dark:prose-invert prose-pre:p-0"
            ref={contentRef}
          >
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
                      style={{ ...vscDarkPlus, fontSize: "30px" }}
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
        <div className="right border-l border-gray-200 pl-5">
          <h2 className="text-2xl font-bold mb-4">Anchor</h2>
          <ul className="space-y-2" data-aos="fade-up">
            {titles.map((title, index) => (
              <li
                key={index}
                className="list-none leading-7 text-base cursor-pointer hover:bg-theme-secondary px-2 py-1 rounded-md"
                style={{
                  marginLeft: getPaddingLeft(title.level),
                }}
                onClick={() => {
                  title.node.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                {title.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};
export default Detail;
