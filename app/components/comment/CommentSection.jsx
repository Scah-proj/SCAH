"use client";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";

export default function PostComments({ postId, comments, isLoading, onCommentAdded }) {
  
  // Handles the real API mutation call when a user types a comment and presses send
  const handleAddComment = async (text) => {
    if (!text.trim()) return;
    
    try {
      // Executes the useAddCommentMutation passed down from PostCard
      await onCommentAdded(text);
    } catch (err) {
      console.error("Failed to append comment to server:", err);
    }
  };

  return (
    <div className="max-h-[85vh] sm:rounded-xl overflow-y-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Comments</h3>
      </div>

      {/* Main Comment Feed Container */}
      {isLoading ? (
        <p className="text-sm text-gray-500 text-center py-4">Loading comments...</p>
      ) : comments && comments.length > 0 ? (
        <CommentList comments={comments} />
      ) : (
        <p className="text-sm text-gray-400 text-center py-4">No comments yet. Be the first to say something!</p>
      )}

      {/* Sticky Bottom Input Field */}
      <CommentInput onAddComment={handleAddComment} />
    </div>
  );
}