"use client";

import Comment from "./Comment";

export default function CommentList({ comments = [], onReply }) {
  if (!comments.length) {
    return (
      <p className="text-sm text-gray-400 py-2">
        No comments yet
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={onReply}
        />
      ))}
    </div>
  );
}