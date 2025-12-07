import React, { type ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Icon } from "@iconify/react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { Sparkles } from "lucide-react";

interface Props {
  content: string;
  askAi?: (content: string) => Promise<void>;
  isAsk?: boolean;
  loading?: boolean;
}
export const MarkDown: React.FC<Props> = React.memo(
  ({ content, askAi, isAsk = false, loading = false }) => {
    if (loading) {
      return <div className="animate-pulse">内容加载中...</div>;
    }

    if (!content) {
      return null;
    }

    try {
      const handlerAsk = (code: string, language: string) => {
        const wrappedCode = `\`\`\`${language}\n${code}\n\`\`\``;
        askAi?.(wrappedCode);
      };
      return (
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mt-8 mb-4 border-b border-theme-border pb-2">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold mt-6 mb-3 border-b border-theme-border/50 pb-1">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>
            ),
            p: ({ children }) => (
              <p className="my-3 leading-7 break-words whitespace-pre-wrap text-theme-text-secondary">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc my-3 space-y-1 pl-5 text-theme-text-secondary marker:text-primary">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal my-3 space-y-1 pl-5 text-theme-text-secondary marker:text-primary font-medium">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="pl-1">{children}</li>,

            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary/50 pl-4 my-4 italic bg-theme-bg-secondary/50 py-3 rounded-r-lg text-theme-text-secondary">
                {children}
              </blockquote>
            ),
            hr: () => <hr className="my-6 border-theme-border" />,
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
                tsx: "tsx",
                js: "javascript",
                jsx: "jsx",
                py: "python",
                vue: "html", // vue 通常使用 html 或 javascript 模式高亮
                html: "html",
                css: "css",
              };

              return !inline ? (
                match ? (
                  <div className="relative group">
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      className="!m-0 !text-base rounded-md !pt-[35px]"
                      language={languageMap[match[1]] || match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                    {/* {isAsk && (
                    <button
                      className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-white bg-primary/80 hover:bg-primary rounded-full shadow-lg backdrop-blur-sm max-md:hidden transform hover:scale-105 active:scale-95"
                      onClick={() =>
                        handlerAsk(
                          String(children).replace(/\n$/, ""),
                          languageMap[match[1]] || match[1] || ""
                        )
                      }
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ask AI</span>
                    </button>
                  )}*/}
                    <div className="operator absolute left-[10px] top-[10px] flex items-center gap-2">
                      <div className="bg-red-500 rounded-full w-3 h-3 "></div>
                      <div className="bg-yellow-500 rounded-full w-3 h-3 "></div>
                      <div className="bg-green-500 rounded-full w-3 h-3 "></div>
                    </div>
                  </div>
                ) : (
                  <code className="bg-theme-secondary px-2 py-1 rounded text-sm">
                    {children}
                  </code>
                )
              ) : (
                <code className="bg-theme-secondary px-1 rounded text-sm">
                  {children}
                </code>
              );
            },
            table: ({ children }) => (
              <table className="border-collapse border border-theme-border my-4 w-full">
                {children}
              </table>
            ),
            th: ({ children }) => (
              <th className="border border-theme-border px-4 py-2 bg-theme-secondary">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-theme-border px-4 py-2">
                {children}
              </td>
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
  }
);
