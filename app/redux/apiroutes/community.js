import { Api } from "../slice/apiSlice";
export const communityApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: ({ id }) => `/v1/analyticsuser/${id}`,
      keepUnusedDataFor: 400,
    }),
    getAnalyticsThirtyDays: builder.query({
      query: ({ id }) => `/v1/analyticsuserThirtyDays/${id}`,
      keepUnusedDataFor: 400,
    }),
    getCommunity: builder.query({
      query: ({ id }) => `/v1/allcoms/${id}`,
    }),
    getPost: builder.query({
      query: ({ id, comid }) => `/v1/getposts/${id}/${comid}`,
    }),
    getAllPost: builder.query({
      query: ({ comid }) => `/v1/getallposts/${comid}`,
    }),
    editPosts: builder.mutation({
      query: ({ id, postid, data }) => ({
        url: `/v1/editpost/${id}/${postid}`,
        method: "POST",
        body: data,
      }),
    }),
    createTopic: builder.mutation({
      query: ({ id, comid, data }) => ({
        url: `/v1/createtopic/${id}/${comid}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteTopic: builder.mutation({
      query: ({ id, topicId, data }) => ({
        url: `/v1/deletetopic/${id}/${topicId}`,
        method: "POST",
        body: data,
      }),
    }),
    updateTopic: builder.mutation({
      query: ({ id, topicid, data }) => ({
        url: `/v1/edittopic/${id}/${topicid}`,
        method: "POST",
        body: data,
      }),
    }),
    fetchTopic: builder.query({
      query: ({ id, comid }) => `/v1/fetchtopic/${id}/${comid}`,
    }),
    createCom: builder.mutation({
      query: ({ id, data }) => ({
        url: `/v1/createcom/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    updateCom: builder.mutation({
      query: ({ id, comid, data }) => ({
        url: `/v1/updatecommunity/${id}/${comid}`,
        method: "POST",
        body: data,
      }),
    }),
    // deleteCommunity: builder.mutation({
    //   query: ({ comid }) => ({
    //     url: `/v1/delete/${comid}`,
    //     method: "POST",
    //   }),
    // }),
    deleteCommunity: builder.mutation({
      query: ({ id, comid }) => ({
        url: `/v1/removecomwithposts/${id}/${comid}`,
        method: "POST",
      }),
    }),
    createPost: builder.mutation({
      query: ({ id, comid, data }) => ({
        url: `/postanything/${id}/${comid}`,
        method: "POST",
        body: data
      })
    }),
    fetchPosts: builder.query({
      query: ({ id, comid }) => `/getallposts/${comid}/${id}`
    }),
    deletePosts: builder.mutation({
      query: ({ id, postid }) => ({
        url: `/v1/deletepost/${id}/${postid}`,
        method: "DELETE",
      })
    }),
    // deletePosts: builder.mutation({
    //   query: ({ id, comid, postid }) => ({
    //     url: `/deletepost/${id}/${comid}/${postid}`,
    //     method: "DELETE",
    //   })
    // }),
    fetchCommunity: builder.query({
      query: ({ id }) => `/v1/fetchCommunityStats/${id}`
    }),
    monetization: builder.mutation({
      query: ({ id, comid }) => ({
        url: `/v1/monetization/${id}/${comid}`,
        method: "POST",
      })
    }),

  }),
});

export const {
  useGetAnalyticsQuery,
  useGetCommunityQuery,
  useGetPostQuery,
  useCreateTopicMutation,
  useDeleteTopicMutation,
  useUpdateTopicMutation,
  useFetchTopicQuery,
  useCreateComMutation,
  useUpdateComMutation,
  useCreatePostMutation,
  useDeleteCommunityMutation,
  useGetAllPostQuery,
  useFetchPostsQuery,
  useFetchCommunityQuery,
  useMonetizationMutation,
  useDeletePostsMutation,
  useEditPostsMutation,
  useGetAnalyticsThirtyDaysQuery
} = communityApi;
