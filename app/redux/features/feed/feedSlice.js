import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFeed: "home",
  selectedPost: null,
  selectedComment: null,
  commentsOpen: false,

  creatingPost: false,
  createPostSuccess: false,
  createPostError: null,

  // My Posts
  myPosts: [],
  loadingMyPosts: false,
  myPostsError: null,

  // Saved Posts (ADDED)
  savedPosts: [],
  loadingSavedPosts: false,
  savedPostsError: null,

  // Like Post
  likingPost: false,
  likePostSuccess: false,
  likePostError: null,

  // Save Post
  savingPost: false,
  savePostSuccess: false,
  savePostError: null,
};

const feedSlice = createSlice({
  name: "feed",

  initialState,

  reducers: {
    setActiveFeed: (state, action) => {
      state.activeFeed = action.payload;
    },

    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },

    setSelectedComment: (state, action) => {
      state.selectedComment = action.payload;
    },

    openComments: (state) => {
      state.commentsOpen = true;
    },

    closeComments: (state) => {
      state.commentsOpen = false;
    },

    setCreatingPost: (state, action) => {
      state.creatingPost = action.payload;
    },

    setCreatePostSuccess: (state, action) => {
      state.createPostSuccess = action.payload;
    },

    setCreatePostError: (state, action) => {
      state.createPostError = action.payload;
    },

    // ======================
    // My Posts
    // ======================

    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
    },

    setLoadingMyPosts: (state, action) => {
      state.loadingMyPosts = action.payload;
    },

    setMyPostsError: (state, action) => {
      state.myPostsError = action.payload;
    },

    // ======================
    // Saved Posts (ADDED)
    // ======================

    setSavedPosts: (state, action) => {
      state.savedPosts = action.payload;
    },

    setLoadingSavedPosts: (state, action) => {
      state.loadingSavedPosts = action.payload;
    },

    setSavedPostsError: (state, action) => {
      state.savedPostsError = action.payload;
    },

    // ======================
    // Like Post
    // ======================

    setLikingPost: (state, action) => {
      state.likingPost = action.payload;
    },

    setLikePostSuccess: (state, action) => {
      state.likePostSuccess = action.payload;
    },

    setLikePostError: (state, action) => {
      state.likePostError = action.payload;
    },

    // ======================
    // Save Post
    // ======================

    setSavingPost: (state, action) => {
      state.savingPost = action.payload;
    },

    setSavePostSuccess: (state, action) => {
      state.savePostSuccess = action.payload;
    },

    setSavePostError: (state, action) => {
      state.savePostError = action.payload;
    },

    resetFeed: (state) => {
      state.activeFeed = "home";
      state.selectedPost = null;
      state.selectedComment = null;
      state.commentsOpen = false;

      state.creatingPost = false;
      state.createPostSuccess = false;
      state.createPostError = null;

      state.myPosts = [];
      state.loadingMyPosts = false;
      state.myPostsError = null;

      state.savedPosts = [];
      state.loadingSavedPosts = false;
      state.savedPostsError = null;

      state.likingPost = false;
      state.likePostSuccess = false;
      state.likePostError = null;

      state.savingPost = false;
      state.savePostSuccess = false;
      state.savePostError = null;
    },
  },
});

export const {
  setActiveFeed,
  setSelectedPost,
  setSelectedComment,
  openComments,
  closeComments,
  setCreatingPost,
  setCreatePostSuccess,
  setCreatePostError,
  setMyPosts,
  setLoadingMyPosts,
  setMyPostsError,
  setSavedPosts,
  setLoadingSavedPosts,
  setSavedPostsError,
  setLikingPost,
  setLikePostSuccess,
  setLikePostError,
  setSavingPost,
  setSavePostSuccess,
  setSavePostError,

  resetFeed,
} = feedSlice.actions;

export default feedSlice.reducer;