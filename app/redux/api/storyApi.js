import { baseApi } from "../../redux/api/baseurl";

export const storyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Story
    createStory: builder.mutation({
      query: (storyData) => {
        const formData = new FormData();

        formData.append("media[type]", storyData.mediaType);
        formData.append("caption", storyData.caption);

        if (storyData.media) {
          formData.append("media", storyData.media);
        }

        return {
          url: "/api/stories",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Story"],
    }),

    // Get all stories (Story feed)
    getFeedStories: builder.query({
      query: () => ({
        url: "/api/stories",
        method: "GET",
      }),
      providesTags: ["Story"],
    }),

    // Get stories for one user
    getUserStories: builder.query({
      query: (userId) => ({
        url: `/api/stories/user/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, userId) => [
        { type: "Story", id: userId },
      ],
    }),

    // View Story
    viewStory: builder.mutation({
      query: (storyId) => ({
        url: `/api/stories/${storyId}/view`,
        method: "POST",
      }),
      invalidatesTags: ["Story"],
    }),

    // Delete Story
    deleteStory: builder.mutation({
      query: (storyId) => ({
        url: `/api/stories/${storyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Story"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateStoryMutation,
  useGetFeedStoriesQuery,
  useGetUserStoriesQuery,
  useViewStoryMutation,
  useDeleteStoryMutation,
} = storyApi;