import { streamChat } from "@/api/gemini";
import React, { useEffect, useRef, useState, useImperativeHandle } from "react";
import { MarkDown } from "./MarkDown";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Code,
  FileText,
} from "lucide-react";
import { createPortal } from "react-dom";
import clsx from "clsx";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  blogContent?: string;
}
interface Ref {
  submit: (content: string) => Promise<void>;
  setDraft: (content: string) => void;
}
interface Message {
  role: "user" | "model";
  content: string;
  error?: boolean;
}

export const Chat = React.forwardRef<Ref, Props>(
  ({ open, setOpen, blogContent }, ref) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const [reference, setReference] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const hasInitialized = useRef(false);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
      if (open) {
        setTimeout(scrollToBottom, 100);
      }
    }, [open, messages, isStreaming, reference]);

    // Initialize chat with blog content if available
    useEffect(() => {
      if (blogContent && !hasInitialized.current && messages.length === 0) {
        const initialMessages: Message[] = [
          {
            role: "user",
            content: `这是我正在阅读的博客文章内容:\n\n${blogContent}\n\n请基于这个内容回答我的问题。`,
          },
          {
            role: "model",
            content:
              "好的，我已经阅读了这篇文章。请问您有什么关于这篇文章的问题？",
          },
        ];
        setMessages(initialMessages);
        hasInitialized.current = true;
      }
    }, [blogContent]);

    const clearHistory = async () => {
      setMessages([]);
      hasInitialized.current = false;
      // Re-initialize if blog content exists
      if (blogContent) {
        const initialMessages: Message[] = [
          {
            role: "user",
            content: `这是我正在阅读的博客文章内容:\n\n${blogContent}\n\n请基于这个内容回答我的问题。`,
          },
          {
            role: "model",
            content:
              "好的，我已经阅读了这篇文章。请问您有什么关于这篇文章的问题？",
          },
        ];
        setMessages(initialMessages);
        hasInitialized.current = true;
      }
    };

    const submit = async (content?: string) => {
      let textToSend = content || prompt;

      // If there is a reference code, prepend it
      if (reference) {
        textToSend = `我正在查看这段代码:\n${reference}\n\n我的问题是:\n${
          textToSend || "这段代码是什么意思？"
        }`;
      }

      if (!textToSend.trim() || isStreaming) return;

      const newUserMessage: Message = {
        role: "user",
        content: textToSend,
      };

      const currentMessages = [...messages, newUserMessage];
      setMessages(currentMessages);
      setPrompt("");
      setReference(""); // Clear reference after sending
      setIsStreaming(true);

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      try {
        // Add placeholder for AI response
        setMessages((prev) => [...prev, { role: "model", content: "" }]);

        const stream = await streamChat(currentMessages);

        let fullResponse = "";

        for await (const chunk of stream) {
          fullResponse += chunk;

          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMsg = newMessages[newMessages.length - 1];
            if (lastMsg && lastMsg.role === "model") {
              lastMsg.content = fullResponse;
            }
            return newMessages;
          });
        }
      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg && lastMsg.role === "model" && !lastMsg.content) {
            newMessages[newMessages.length - 1] = {
              role: "model",
              content: "Sorry, I encountered an error. Please try again.",
              error: true,
            };
          } else if (lastMsg && lastMsg.role === "model") {
            lastMsg.content += "\n\n**[Connection Error]**";
            lastMsg.error = true;
          } else {
            newMessages.push({
              role: "model",
              content: "Sorry, I encountered an error.",
              error: true,
            });
          }
          return newMessages;
        });
      } finally {
        setIsStreaming(false);
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        submit,
        setDraft: (content: string) => {
          setReference(content);
        },
      }),
      []
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submit();
      }
    };

    const adjustTextareaHeight = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setPrompt(e.target.value);
      e.target.style.height = "auto";
      e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
    };

    return createPortal(
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-theme-bg shadow-2xl z-[9999] flex flex-col border-l border-theme-border"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-theme-border bg-theme-bg/80 backdrop-blur supports-[backdrop-filter]:bg-theme-bg/60">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-theme-text-primary">
                      AI Assistant
                    </h2>
                    <p className="text-xs text-theme-text-secondary">
                      Powered by Qwen
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearHistory}
                    className="p-2 hover:bg-theme-bg-secondary rounded-lg text-theme-text-secondary transition-colors"
                    title="Clear History"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 hover:bg-theme-bg-secondary rounded-lg text-theme-text-secondary transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-theme-text-secondary opacity-60 gap-4">
                    <Bot className="w-16 h-16 stroke-1" />
                    <p>Ask me anything about the article!</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={clsx(
                        "flex gap-3 max-w-full",
                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <div
                        className={clsx(
                          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                          msg.role === "user"
                            ? "bg-primary text-white"
                            : "bg-theme-secondary text-theme-text-primary"
                        )}
                      >
                        {msg.role === "user" ? (
                          <User className="w-5 h-5" />
                        ) : (
                          <Bot className="w-5 h-5" />
                        )}
                      </div>

                      <div
                        className={clsx(
                          "rounded-2xl p-3 max-w-[85%] text-sm leading-relaxed shadow-sm overflow-hidden",
                          msg.role === "user"
                            ? "bg-primary text-white rounded-tr-none"
                            : "bg-theme-card border border-theme-border rounded-tl-none text-theme-text-primary"
                        )}
                      >
                        {msg.role === "user" ? (
                          <div className="whitespace-pre-wrap">
                            {msg.content}
                          </div>
                        ) : (
                          <MarkDown content={msg.content} />
                        )}
                        {msg.error && (
                          <div className="mt-2 text-red-500 text-xs flex items-center gap-1">
                            Error occurred
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
                {isStreaming &&
                  messages[messages.length - 1]?.role === "user" && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-theme-secondary text-theme-text-primary flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div className="bg-theme-card border border-theme-border rounded-2xl rounded-tl-none p-3 flex items-center gap-1">
                        <div
                          className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-theme-border bg-theme-bg">
                {/* Reference/Context Preview */}
                <AnimatePresence>
                  {reference && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: 10, height: 0 }}
                      className="mb-3 bg-theme-bg-secondary rounded-xl border border-theme-border overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-3 py-2 border-b border-theme-border/50 bg-theme-secondary/30">
                        <div className="flex items-center gap-2 text-xs font-medium text-primary">
                          <Code className="w-3.5 h-3.5" />
                          <span>Referenced Code</span>
                        </div>
                        <button
                          onClick={() => setReference("")}
                          className="p-1 hover:bg-theme-border rounded-md text-theme-text-secondary transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="p-3 max-h-[100px] overflow-y-auto custom-scrollbar">
                        <pre className="text-xs font-mono text-theme-text-secondary whitespace-pre-wrap break-all">
                          {reference}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative flex items-end gap-2 bg-theme-bg-secondary rounded-xl p-2 border border-theme-border focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                  <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={adjustTextareaHeight}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      reference
                        ? "Ask about this code..."
                        : "Ask a follow-up question..."
                    }
                    className="flex-1 max-h-[200px] min-h-[24px] bg-transparent border-none resize-none outline-none text-theme-text-primary placeholder:text-theme-text-secondary/50 py-2 px-2 text-sm leading-relaxed custom-scrollbar"
                    rows={1}
                  />
                  <button
                    onClick={() => submit()}
                    disabled={(!prompt.trim() && !reference) || isStreaming}
                    className={clsx(
                      "p-2 rounded-lg transition-all duration-200 shrink-0 mb-0.5",
                      (prompt.trim() || reference) && !isStreaming
                        ? "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95"
                        : "bg-theme-secondary text-theme-text-secondary cursor-not-allowed opacity-50"
                    )}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-2 text-center text-[10px] text-theme-text-secondary/60">
                  AI can make mistakes. Please verify important information.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
    );
  }
);
