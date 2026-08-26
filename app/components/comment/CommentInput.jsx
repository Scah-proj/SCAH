"use client";

import { useState } from "react";

export default function CommentInput({
  onAddComment,
  replyingTo,
  onCancelReply,
}) {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      await onAddComment(text, replyingTo?.id || null);

      setText("");
      onCancelReply?.();
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };

  return (
    <div className="mt-3">
      {replyingTo && (
        <div className="flex items-center justify-between mb-2 px-2">
          <p className="text-xs text-gray-500">
            Replying to{" "}
            <span className="font-semibold text-gray-700">
              {replyingTo.author}
            </span>
          </p>

          <button
            type="button"
            onClick={onCancelReply}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={
            replyingTo
              ? `Reply to ${replyingTo.author}...`
              : "Add a comment..."
          }
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="text-teal-600 font-semibold text-sm"
        >
          Post
        </button>
      </div>
    </div>
  );
}