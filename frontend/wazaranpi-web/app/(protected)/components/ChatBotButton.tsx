"use client";

import { useEffect, useState } from "react";
import { Bot, X, Send } from "lucide-react";

import { User } from "@/app/(protected)/types/auth";
import { Message } from "@/app/(protected)/types/chat";
import { getSavedUser } from "@/app/(protected)/utils/authStorage";
import { answers } from "@/app/(protected)/constants/chat";

export default function ChatBotButton() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi! How can I help you?" },
  ]);

  useEffect(() => {
    const loadUser = () => {
      const u = getSavedUser();
      setUser(u);
    };

    loadUser();
    window.addEventListener("auth-change", loadUser);

    return () => {
      window.removeEventListener("auth-change", loadUser);
    };
  }, []);

  if (!user) return null;

  const askQuestion = (question: string) => {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: question },
      { from: "bot", text: answers[question] },
    ]);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-8 z-50 w-80 overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-teal-600 px-5 py-4 text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <p className="font-bold">WazaranBI Assistant</p>
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setMessages([{ from: "bot", text: "Hi! How can I help you?" }]);
              }}
              className="cursor-pointer rounded-full p-1 hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                  msg.from === "bot"
                    ? "bg-white text-slate-800"
                    : "ml-auto bg-teal-600 text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t bg-white p-4">
            {Object.keys(answers).map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => askQuestion(question)}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
              >
                {question}
                <Send size={14} />
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          if (open) {
            setMessages([{ from: "bot", text: "Hi! How can I help you?" }]);
          }
          setOpen(!open);
        }}
        className="fixed bottom-8 right-8 z-50 grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-teal-600 text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-teal-700"
      >
        {open ? <X size={24} /> : <Bot size={26} />}
      </button>
    </>
  );
}
