import { getBlogDetailApi } from "@/api/blog";
import { BlogResponse } from "@/api/blog/blog";
import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router";
import { Tag } from "../components/Tag";
import { formatDate } from "@/utils";
import { Icon } from "@iconify/react";

import Loading from "@/assets/images/loading.svg?react";
import "./detail.scss";
import { MarkDown } from "./components/MarkDown";
import { Chat } from "./components/Chat";
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
  const [open, setOpen] = useState(false);
  const chatRef = useRef<{ submit: (content: string) => Promise<void> }>(null);
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
    return index * 15;
  };

  const askAi = async (content: string) => {
    setOpen(true);
    await chatRef.current?.submit(content);
  };
  return (
    <>
      {blog ? (
        <div className="mx-auto blog_detail py-[50px]">
          <div
            className="left w-[75%] h-full overflow-auto max-md:w-full"
            data-aos="fade-up"
          >
            <div className="tags flex items-center gap-3 mb-7">
              {blog.tags.map((tag) => (
                <Tag key={tag.id}>{tag.name}</Tag>
              ))}
            </div>
            <p className="title font-bold text-4xl leading-10 mb-7 max-md:text-2xl">
              {blog.title}
            </p>
            <p className="description font-bold text-xl leading-7 mb-7 max-md:text-[18px]">
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
              <MarkDown content={blog.content} askAi={askAi} isAsk={true} />
            </div>
          </div>
          <div className="right border-l border-gray-200 pl-5 max-md:hidden">
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
      ) : (
        <div className="w-full flex items-center justify-center h-screen">
          <Loading />
        </div>
      )}
      <Chat open={open} setOpen={setOpen} ref={chatRef} />
      <div className="fixed bottom-5 right-5 z-50">
        <Icon
          icon="ri:message-3-fill"
          className="text-primary text-3xl cursor-pointer"
          onClick={() => setOpen(true)}
        />
      </div>
    </>
  );
};
export default Detail;
