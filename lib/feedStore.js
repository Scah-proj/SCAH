import { create } from "zustand";

export const useFeedStore = create((set) => ({
  posts: [],

  setPosts: (posts) => set({ posts }),

  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
}));