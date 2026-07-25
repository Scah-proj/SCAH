import { baseApi } from "../../redux/api/baseurl";

export const recommendationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Scouts recommended for the logged-in athlete
    getRecommendedScouts: builder.query({
      query: (limit) => ({
        url: `/api/recommendations/scouts${limit ? `?limit=${limit}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Recommendations"],
    }),

    // Athletes recommended for the logged-in scout
    getRecommendedAthletes: builder.query({
      query: (limit) => ({
        url: `/api/recommendations/athletes${limit ? `?limit=${limit}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Recommendations"],
    }),

    // Recommended users (athletes + scouts)
    getRecommendedUsers: builder.query({
      query: (limit) => ({
        url: `/api/recommendations/users${limit ? `?limit=${limit}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Recommendations"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetRecommendedScoutsQuery,
  useGetRecommendedAthletesQuery,
  useGetRecommendedUsersQuery,
} = recommendationApi;