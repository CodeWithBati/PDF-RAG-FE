
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Doc {
  pageContent?: string;
  metadata?: {
    loc?: {
      pageNumber?: number;
    };
    source?: string;
  };
}

interface IMessages {
  role: "user" | "assistant";
  content?: string;
  documents?: Doc[];
}

export default function Chat() {
  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<IMessages[]>([]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleSendChatMessage = async () => {
    if (!message.trim()) return;

    const userMessage: IMessages = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:8000/api/chat?message=${encodeURIComponent(message)}`
      );
      const data = await response.json();

      const assistantMessage: IMessages = {
        role: "assistant",
        content: data?.message,
        documents: data?.docs,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Auto scroll to bottom when messages update
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendChatMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 pb-28 overflow-hidden">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto pr-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.content}
            </div>

            {/* Assistant message documents (context) */}
            {msg.role === "assistant" && (msg.documents ?? []).length > 0 && (
              <div className="mt-2 ml-2 text-xs text-gray-600">
                <div>
                  <strong>Sources:</strong>
                </div>
                {(msg.documents ?? []).map((doc, idx) => (
                  <div key={idx} className="mt-1">
                    📄 {doc.metadata?.source} (Page{" "}
                    {doc.metadata?.loc?.pageNumber})
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[30vw] flex gap-3">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message here..."
          className="flex-1"
        />
        <Button onClick={handleSendChatMessage} disabled={!message.trim()}>
          Send
        </Button>
      </div>
    </div>
  );
}
