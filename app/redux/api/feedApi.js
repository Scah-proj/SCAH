import { baseApi } from "../../redux/api/baseurl";

export const feedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (postData) => {
        const formData = new FormData();

        formData.append("caption", postData.caption);
        formData.append("type", postData.type);
        formData.append("sport", postData.sport);

        if (postData.tags) {
          formData.append("tags", postData.tags);
        }

        if (postData.location) {
          formData.append(
            "location",
            JSON.stringify(postData.location)
          );
        }

        postData.media?.forEach((file) => {
          formData.append("media", file);
        });

        return {
          url: "/api/feed",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Feed"],
    }),

    getHomeFeed: builder.query({
      query: () => ({
        url: "/api/feed/home",
        method: "GET",
      }),
      providesTags: ["Feed"],
    }),

    getDiscoverFeed: builder.query({
      query: () => ({
        url: "/api/feed/discover",
        method: "GET",
      }),
      providesTags: ["Feed"],
    }),

    getTrendingPosts: builder.query({
      query: () => ({
        url: "/api/feed/trending",
        method: "GET",
      }),
      providesTags: ["Feed"],
    }),

    getMyPosts: builder.query({
      query: () => ({
        url: "/api/feed/my-posts",
        method: "GET",
      }),
      providesTags: ["Feed"],
    }),

    getProfileFeed: builder.query({
      query: (userId) => ({
        url: `/api/feed/profile/${userId}`,
        method: "GET",
      }),
      providesTags: ["Feed"],
    }),

    getSavedPosts: builder.query({
      query: (params) => ({
        url: "/api/feed/saved",
        method: "GET",
        params,
      }),
      providesTags: ["SavedPosts"],
    }),

    getPostById: builder.query({
      query: (postId) => ({
        url: `/api/feed/${postId}`,
        method: "GET",
      }),
      providesTags: (result, error, postId) => [
        { type: "Feed", id: postId },
      ],
    }),

    getComments: builder.query({
      query: (postId) => ({
        url: `/api/feed/${postId}/comments`,
        method: "GET",
      }),
      providesTags: (result, error, postId) => [
        { type: "Comments", id: postId },
      ],
    }),

    addComment: builder.mutation({
      query: ({ postId, content }) => ({
        url: `/api/feed/${postId}/comments`,
        method: "POST",
        body: {
          content,
        },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
        { type: "Feed", id: postId },
      ],
    }),

    toggleLikePost: builder.mutation({
      query: (postId) => ({
        url: `/api/feed/${postId}/like`,
        method: "POST",
      }),
      invalidatesTags: (result, error, postId) => [
        { type: "Feed", id: postId },
        "Feed",
      ],
    }),

    toggleSavePost: builder.mutation({
      query: (postId) => ({
        url: `/api/feed/${postId}/save`,
        method: "POST",
      }),
      invalidatesTags: (result, error, postId) => [
        { type: "Feed", id: postId },
        "Feed",
        "SavedPosts",
      ],
    }),

    updatePost: builder.mutation({
      query: ({ postId, formData }) => ({
        url: `/api/feed/${postId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Feed"],
    }),
  }),

  // Allows fast-refresh during dev without throwing duplicate-endpoint errors
  overrideExisting: process.env.NODE_ENV !== "production",
});

export const {
  useCreatePostMutation,
  useGetHomeFeedQuery,
  useGetDiscoverFeedQuery,
  useGetTrendingPostsQuery,
  useGetMyPostsQuery,
  useGetProfileFeedQuery,
  useGetSavedPostsQuery, 
  useGetPostByIdQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useToggleLikePostMutation,
  useToggleSavePostMutation,
  useUpdatePostMutation,
} = feedApi;