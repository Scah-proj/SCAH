
import { baseApi } from "../../redux/api/baseurl";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = authApi;