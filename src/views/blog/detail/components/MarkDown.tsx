import React, { type ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Icon } from "@iconify/react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface Props {
  content: string;
  askAi?: (content: string) => Promise<void>;
  isAsk?: boolean;
  loading?: boolean;
}
export const MarkDown: React.FC<Props> = ({
  content,
  askAi,
  isAsk = false,
  loading = false,
}) => {
  if (loading) {
    return <div className="animate-pulse">内容加载中...</div>;
  }

  if (!content) {
    return null;
  }

  try {
    const handlerAsk = (content: string) => {
      askAi?.(`中文解释这段代码:<br/> ${content}`);
    };
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          p: ({ children }) => (
            <p className="my-4 leading-7 break-words whitespace-pre-wrap">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc my-4 space-y-2">{children}</ul>
          ),
          li: ({ children }) => <li className="ml-4">{children}</li>,

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic bg-gray-50 py-2">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
          code({
            inline,
            className,
            children,
          }: ComponentPropsWithoutRef<"code"> & { inline?: boolean }) {
            const match = /language-(\w+)/.exec(className || "");
            const languageMap: { [key: string]: string } = {
              ts: "typescript",
              js: "javascript",
              py: "python",
            };

            return !inline ? (
              match ? (
                <div className="relative">
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    className="!m-0 !text-base rounded-md"
                    language={languageMap[match[1]] || match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                  {isAsk && (
                    <div
                      className="askai absolute right-2 top-2 text-sm flex items-center gap-1 cursor-pointer text-primary max-md:hidden"
                      onClick={() =>
                        handlerAsk(String(children).replace(/\n$/, ""))
                      }
                    >
                      <Icon icon="bi:send-fill" />
                      <span>Ask AI</span>
                    </div>
                  )}
                </div>
              ) : (
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {children}
                </code>
              )
            ) : (
              <code className="bg-gray-100 px-1 rounded text-sm">
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <table className="border-collapse border border-gray-300 my-4 w-full">
              {children}
            </table>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-4 py-2">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  } catch (error) {
    console.error("Markdown rendering error:", error);
    return <div className="text-red-500">内容渲染失败</div>;
  }
};
