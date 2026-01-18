import { create } from "zustand";

export const useCommentStore = create((set) => ({
  // Each postId maps to its comments array
  commentsByPost: {},

  // Add a new comment to a post
  addComment: (postId, comment) =>
    set((state) => ({
      commentsByPost: {
        ...state.commentsByPost,
        [postId]: [comment, ...(state.commentsByPost[postId] || [])],
      },
    })),
}));
