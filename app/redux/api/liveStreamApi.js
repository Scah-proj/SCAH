import { baseApi } from "./baseurl.js";

const unwrap = (response) => response?.data ?? response;

export const liveStreamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLiveStreams: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams(params).toString();
        return {
          url: `/api/live${search ? `?${search}` : ""}`,
          method: "GET",
        };
      },
      transformResponse: unwrap,
      providesTags: ["Feed"],
    }),

    getLiveStreamById: builder.query({
      query: (id) => ({
        url: `/api/live/${id}`,
        method: "GET",
      }),
      transformResponse: unwrap,
      providesTags: (result, error, id) => [{ type: "Feed", id }],
    }),

    startLiveStream: builder.mutation({
      query: (streamData) => ({
        url: "/api/live/start",
        method: "POST",
        body: streamData,
      }),
      transformResponse: unwrap,
      invalidatesTags: ["Feed"],
    }),

    endLiveStream: builder.mutation({
      query: (streamId) => ({
        url: `/api/live/${streamId}/end`,
        method: "POST",
      }),
      transformResponse: unwrap,
      invalidatesTags: ["Feed"],
    }),

    sendStreamReaction: builder.mutation({
      query: ({ streamId, reaction }) => ({
        url: `/api/live/${streamId}/react`,
        method: "POST",
        body: { reaction },
      }),
      transformResponse: unwrap,
    }),

    getLiveReplays: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams(params).toString();
        return {
          url: `/api/live/replays${search ? `?${search}` : ""}`,
          method: "GET",
        };
      },
      transformResponse: unwrap,
      providesTags: ["Feed"],
    }),

    getLiveReplayById: builder.query({
      query: (id) => ({
        url: `/api/live/replays/${id}`,
        method: "GET",
      }),
      transformResponse: unwrap,
      providesTags: (result, error, id) => [{ type: "Feed", id }],
    }),
  }),
});

export const {
  useGetLiveStreamsQuery,
  useGetLiveStreamByIdQuery,
  useStartLiveStreamMutation,
  useEndLiveStreamMutation,
  useSendStreamReactionMutation,
  useGetLiveReplaysQuery,
  useGetLiveReplayByIdQuery,
} = liveStreamApi;
