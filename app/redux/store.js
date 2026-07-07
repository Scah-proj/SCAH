import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import profileReducer from "./features/profile/profileSlice";
import feedReducer from "./features/feed/feedSlice";
import tryoutReducer from "./features/tryout/tryoutSlice";
import storyReducer from "./features/story/storySlice";
import connectionReducer from "./features/connection/connectionSlice";

import { baseApi } from "./api/baseurl";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    feed: feedReducer,
    tryout: tryoutReducer,
    story: storyReducer,
    connection: connectionReducer,

    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});