"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send, ShieldCheck, User } from "lucide-react";

export default function LiveChatOverlay({
  comments = [],
  onSendMessage,
  currentUser = null,
  className = "",
}) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (onSendMessage) {
      onSendMessage(inputText.trim());
    }
    setInputText("");
  };

  return (
    <div className={`flex flex-col h-full max-h-72 sm:max-h-80 ${className}`}>
      {/* Scrollable messages container */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2 pr-3 no-scrollbar mask-top">
        {comments.map((msg, index) => {
          const isScout = msg.role?.toLowerCase() === "scout" || msg.isScout;
          return (
            <div
              key={msg.id || index}
              className="flex items-start gap-2 bg-black/45 backdrop-blur-md rounded-2xl p-2 text-white border border-white/10 shadow-sm max-w-[90%]"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-600 flex-shrink-0 flex items-center justify-center">
                {msg.avatar ? (
                  <Image
                    src={msg.avatar}
                    alt={msg.userName || "User"}
                    width={28}
                    height={28}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={14} className="text-gray-300" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-semibold text-gray-200 truncate">
                    {msg.userName || "Fan"}
                  </span>
                  {isScout && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-amber-500/90 text-black">
                      <ShieldCheck size={10} />
                      Scout
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-100 break-words mt-0.5 leading-relaxed">
                  {msg.text}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Say something to the athlete..."
          className="flex-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 rounded-full bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white transition-colors cursor-pointer"
          aria-label="Send comment"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
