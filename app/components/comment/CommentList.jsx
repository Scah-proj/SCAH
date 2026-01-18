import Comment from "./Comment";

export default function CommentList({ comments = [] }) {
  
    
  if (!comments.length) {
    return (
      <p className="text-sm text-gray-400 py-2">
        No comments yet
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
