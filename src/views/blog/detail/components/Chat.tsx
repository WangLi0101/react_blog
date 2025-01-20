import { getChat } from "@/api/gemini";
import { ChatSession } from "@google/generative-ai";
import { Drawer, Input, Skeleton } from "antd";
import React, { useEffect, useRef, useState, useImperativeHandle } from "react";
import { Icon } from "@iconify/react";
import { MarkDown } from "./MarkDown";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}
interface Ref {
  submit: (content: string) => Promise<void>;
}
interface Message {
  role: "user" | "assistant";
  content: string;
}

export const Chat = React.forwardRef<Ref, Props>(({ open, setOpen }, ref) => {
  const chat = useRef<ChatSession | null>(null);
  const genAIRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAskLoading, setIsAskLoading] = useState(false);

  const initChat = async () => {
    chat.current = await getChat(messages);
  };

  useEffect(() => {
    initChat();
  }, []);

  const submit = async (content?: string) => {
    if (!prompt && !content) return;
    const newUserMessage: Message = {
      role: "user",
      content: content || prompt,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsAskLoading(true);
    const res = await chat.current?.sendMessage(content || prompt);
    console.log(res);
    setIsAskLoading(false);
    const newAssistantMessage: Message = {
      role: "assistant",
      content: res?.response.text() || "",
    };
    setMessages((prev) => [...prev, newAssistantMessage]);
    setPrompt("");
  };

  useEffect(() => {
    if (genAIRef.current) {
      genAIRef.current.scrollTop = genAIRef.current.scrollHeight;
    }
  }, [messages, isAskLoading]);

  useImperativeHandle(
    ref,
    () => ({
      submit,
    }),
    []
  );

  return (
    <Drawer
      title="Gemini"
      placement="right"
      open={open}
      onClose={() => setOpen(false)}
      width="35%"
    >
      <div className="h-full flex flex-col">
        <div className="top flex-1 overflow-y-auto" ref={genAIRef}>
          <div className="messages space-y-4">
            {messages.map((message, index) => (
              <div key={index}>
                <div className="user text-theme-primary font-bold mb-2">
                  {message.role === "user" ? "You" : "Gemini"}
                </div>
                <MarkDown content={message.content} />
              </div>
            ))}
            {isAskLoading && <Skeleton active />}
          </div>
        </div>
        <div className="bottom flex-none mt-4 relative">
          <Input.TextArea
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Icon
            icon="bi:send-fill"
            className="text-primary text-2xl absolute right-4 bottom-4 cursor-pointer"
            onClick={() => submit()}
          />
        </div>
      </div>
    </Drawer>
  );
});
