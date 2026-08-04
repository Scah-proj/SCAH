import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice"; // adjust path if your authSlice lives elsewhere

const rawBaseQuery = fetchBaseQuery({
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
});

const PUBLIC_AUTH_PATHS = [
  "api/auth/login",
  "api/auth/register",
  "api/auth/login/verify-2fa",
  "api/auth/google",
  "api/auth/forgot-password",
  "api/auth/reset-password",
  "api/auth/verify-email",
  "api/auth/resend-verification",
];

const isPublicAuthRequest = (args) => {
  const url = typeof args === "string" ? args : args?.url;
  if (!url) return false;
  return PUBLIC_AUTH_PATHS.some((path) => url.includes(path));
};

const baseQueryWithAuthHandling = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && !isPublicAuthRequest(args)) {
    api.dispatch(logout());
    api.dispatch(baseApi.util.resetApiState());

    if (
      typeof window !== "undefined" &&
      !window.location.pathname.startsWith("/auth/")
    ) {
      window.location.href = "/auth/login?sessionExpired=1";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithAuthHandling,

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