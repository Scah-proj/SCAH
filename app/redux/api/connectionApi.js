import { baseApi } from "../../redux/api/baseurl";

export const connectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Follow User
    followUser: builder.mutation({
      query: (userId) => ({
        url: `/api/connections/${userId}/follow`,
        method: "POST",
      }),
      invalidatesTags: ["Connection", "Notification"],
    }),

    // Get Connection Status
    getConnectionStatus: builder.query({
      query: (userId) => ({
        url: `/api/connections/${userId}/connection-status`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [
        { type: "Connection", id: `status-${userId}` },
      ],
    }),

    // Get Connection Counts
    getConnectionCounts: builder.query({
      query: (userId) => ({
        url: `/api/connections/${userId}/counts`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [
        { type: "Connection", id: `counts-${userId}` },
      ],
    }),

    // Get Suggestions
    getSuggestions: builder.query({
      query: () => ({
        url: "/api/connections/suggestions",
        method: "GET",
      }),
      providesTags: ["Connection"],
    }),

    // Get Mutual Followers
    getMutualFollowers: builder.query({
      query: (userId) => ({
        url: `/api/connections/${userId}/mutual`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [
        { type: "Connection", id: `mutual-${userId}` },
      ],
    }),

    // Get Followers
    getFollowers: builder.query({
      query: (userId) => ({
        url: `/api/connections/${userId}/followers`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [
        { type: "Connection", id: `followers-${userId}` },
      ],
    }),

    // Get Following
    getFollowing: builder.query({
      query: (userId) => ({
        url: `/api/connections/${userId}/following`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [
        { type: "Connection", id: `following-${userId}` },
      ],
    }),

    // Get Notifications
    getNotifications: builder.query({
      query: () => ({
        url: "/api/connections/notifications",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    // Get Unread Notification Count
    getUnreadNotificationCount: builder.query({
      query: () => ({
        url: "/api/connections/notifications/unread/count",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    // Mark All Notifications as Read
    readAllNotifications: builder.mutation({
      query: () => ({
        url: "/api/connections/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),

    // Delete All Notifications
    deleteAllNotifications: builder.mutation({
      query: () => ({
        url: "/api/connections/notifications",
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useFollowUserMutation,
  useGetConnectionStatusQuery,
  useGetConnectionCountsQuery,
  useGetSuggestionsQuery,
  useGetMutualFollowersQuery,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useReadAllNotificationsMutation,
  useDeleteAllNotificationsMutation,
} = connectionApi;