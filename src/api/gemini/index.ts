import { GoogleGenerativeAI } from "@google/generative-ai";

import { gemini_key } from "../config";

const genAI = new GoogleGenerativeAI(gemini_key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getResult = async (prompt: string) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};

// 添加新的对话函数
export const getChat = async (
  messages: Array<{ role: "user" | "assistant"; content: string }>
) => {
  const chat = model.startChat();

  for (const message of messages) {
    if (message.role === "user") {
      await chat.sendMessage(message.content);
    }
  }

  return chat;
};
