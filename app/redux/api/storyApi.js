import { baseApi } from "../../redux/api/baseurl";

export const storyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Story
    createStory: builder.mutation({
      query: (storyData) => {
        const formData = new FormData();

        formData.append("mediaType", storyData.mediaType);
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

    // Get archived stories (Paginated). Cache-tagged per page so loading
    // page 2 doesn't refetch page 1, but any story mutation (create/delete/
    // archive) still invalidates the whole list via the bare "Story" tag.
    getArchivedStories: builder.query({
      query: (params) => ({
        url: "/api/stories/archived",
        method: "GET",
        params: {
          page: params?.page || 1,
          limit: params?.limit || 20,
        },
      }),
      providesTags: (result, error, params) => [
        { type: "Story", id: `ARCHIVE-${params?.page || 1}` },
        "Story",
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

    
    archiveStory: builder.mutation({
      query: (storyId) => ({
        url: `/api/stories/${storyId}/archive`,
        method: "PATCH",
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

  overrideExisting: true,
});

export const {
  useCreateStoryMutation,
  useGetFeedStoriesQuery,
  useGetUserStoriesQuery,
  useGetArchivedStoriesQuery,
  useViewStoryMutation,
  useArchiveStoryMutation,
  useDeleteStoryMutation,
} = storyApi;