import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,

    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      return headers;
    },
  }),

  tagTypes: [
    "Feed",
    "Comments",
    "Profile",
    "Tryout",
    "TryoutApplicants",
    "Story",
    "Connection",
    "Notification",
    "NotificationSettings",
    "Recommendations",
    "Onboarding",
    "Settings",
    "Sessions",
    "SavedPosts",
    "Reposts",      
    "RepostedPosts",
    "Application",
    "DeletedPosts",
    "MyReposts",
  ],

  endpoints: () => ({}),
});