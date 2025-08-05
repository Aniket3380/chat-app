import React, { useState } from "react";
import { getAIResponse } from "./chatApi";
import ReactMarkdown from "react-markdown";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiReply = await getAIResponse([...messages, userMessage]);
    setMessages((prev) => [...prev, { role: "assistant", content: aiReply }]);
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto mb-4 p-2 bg-white rounded shadow">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 my-1 rounded ${
              msg.role === "user" ? "bg-blue-100" : "bg-green-100"
            }`}
          >
            <div className="font-bold">{msg.role}</div>
            <div className="prose max-w-none">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}
