
"use client";
import Image from "next/image";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { useCommentStore } from "../../../lib/commentStore";


// TEMP — mock data
// import { mockComments } from "../../userfeed/data/mockComment";

export default function PostComments({ postId }) {
  // const [comments, setComments] = useState([]);
  const commentsByPost = useCommentStore(state => state.commentsByPost);
  const addComment = useCommentStore(state => state.addComment);
  const comments = commentsByPost[postId] || [];
  const commentCount = comments.length;
//   fetch()
//   .then(data => setComments(data));
// }, [postId]);


  // called when user submits a comment
  const handleAddComment = (text) => {
    // const res = await fetch("", {
    //   method: "POST",
    //   body: JSON.stringify({text}),

    // });

    // const newComment = await response.json();
    const newComment = {
      id: Date.now(),
      postId,
      author: "You",
      text,
      createdAt: new Date().toISOString(),
    };

    // setComments(prev => [newComment, ...prev]);
    addComment(postId, newComment);
  };

  return (
    <div className="
        max-h-[85vh]
       sm:rounded-xl
        overflow-y-auto
        p-4">
      {/* fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center */}
      
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Comments</h3>
          {/* <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button> */}
        </div>
      <CommentList comments={comments} />
      <CommentInput onAddComment={handleAddComment} />
    </div>
  );
}
