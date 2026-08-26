"use client";
import { useState } from "react";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

export default function PostComments({
  postId,
  comments,
  isLoading,
  onCommentAdded,
}) {
  const [replyingTo, setReplyingTo] = useState(null);

  const handleAddComment = async (text, parentCommentId = null) => {
    if (!text.trim()) return;

    try {
      await onCommentAdded({
        text,
        parentCommentId,
      });

      setReplyingTo(null); // Clear reply state after posting
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-h-[85vh] sm:rounded-xl overflow-y-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Comments</h3>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500 text-center py-4">Loading comments...</p>
      ) : (
        <CommentList
          comments={comments}
          onReply={setReplyingTo}
        />
      )}

      <CommentInput
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
        onAddComment={handleAddComment}
      />
    </div>
  );
}