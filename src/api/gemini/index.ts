import OpenAI from "openai";
import { gemini_key } from "../config";

const openai = new OpenAI({
  apiKey: gemini_key,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  dangerouslyAllowBrowser: true, // 允许在浏览器端运行
});

export const streamChat = async (
  messages: Array<{ role: "user" | "model" | "assistant"; content: string }>
) => {
  const apiMessages = messages.map((msg) => ({
    role: (msg.role === "model" ? "assistant" : msg.role) as
      | "user"
      | "assistant"
      | "system",
    content: msg.content,
  }));

  const stream = await openai.chat.completions.create({
    model: "qwen3-235b-a22b",
    messages: apiMessages,
    stream: true,
  });

  return {
    async *[Symbol.asyncIterator]() {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          yield content;
        }
      }
    },
  };
};
