"use client";
import { useState } from "react";

export default function CommentInput({ onAddComment }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddComment(text);
    setText("");
  };

  return (
    <div className="flex items-center gap-2 mt-3">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
      />

      <button
        onClick={handleSubmit}
        className="text-teal-600 font-semibold text-sm"
      >
        Post
      </button>
    </div>
  );
}
