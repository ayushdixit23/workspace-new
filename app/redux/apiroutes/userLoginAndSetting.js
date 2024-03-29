import { Api } from "../slice/apiSlice";
export const userLoginAndSettingApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    loginWithQr: builder.mutation({
      query: ({ id }) => ({
        url: `/v1/checkqr`,
        body: { id },
        method: "POST",
      }),
    }),
    idlogin: builder.query({
      query: ({ id }) => `/v1/fetchwithid/${id}`,
    }),
    login: builder.mutation({
      query: ({ phone }) => ({
        url: `/v1/checkid`,
        method: "POST",
        body: { phone },
      }),
    }),
    getRefreshToken: builder.mutation({
      query: ({ refresh_token }) => ({
        url: `/v1/refresh`,
        method: "POST",
        body: { refresh_token },
      }),
    }),
    getFetchOrder: builder.query({
      query: ({ id }) => `/v1/fetchallorders/${id}`,
    }),
    getProfile: builder.query({
      query: ({ id }) => `/v1/getprofileinfo/${id}`,
    }),
    postProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/v1/profileinfo/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    postProfileStore: builder.mutation({
      query: ({ id, data }) => ({
        url: `/v1/profilestore/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    emailLogin: builder.mutation({
      query: (data) => ({
        url: `/v1/checkemail`,
        method: "POST",
        body: data
      })
    })
  }),
});

export const {
  useLoginMutation,
  useGetRefreshTokenMutation,
  useGetFetchOrderQuery,
  useGetProfileQuery,
  usePostProfileMutation,
  useLoginWithQrMutation,
  useEmailLoginMutation,
  usePostProfileStoreMutation,
  useIdloginQuery
} = userLoginAndSettingApi;
