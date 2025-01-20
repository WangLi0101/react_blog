import { getChat } from "@/api/gemini";
import { ChatSession } from "@google/generative-ai";
import { Button, Drawer, Input, Skeleton } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { MarkDown } from "./MarkDown";
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}
interface Message {
  role: "user" | "assistant";
  content: string;
}
export const Chat: React.FC<Props> = ({ open, setOpen }) => {
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
  const submit = async () => {
    if (!prompt) return;
    const newUserMessage: Message = { role: "user", content: prompt };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsAskLoading(true);
    const res = await chat.current?.sendMessage(prompt);
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
                <div className="user text-theme-primary font-bold">
                  {message.role === "user" ? "You" : "Gemini"}
                </div>
                <MarkDown content={message.content} />
              </div>
            ))}
            {isAskLoading && <Skeleton active />}
          </div>
        </div>
        <div className="bottom flex-none mt-4">
          <Input.TextArea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <Button type="primary" onClick={submit}>
              Ask
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
