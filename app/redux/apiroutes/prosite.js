import { Api } from "../slice/apiSlice";
export const prositeApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    defaultProsite: builder.mutation({
      query: ({ id, checked }) => ({
        url: `/v1/defaultprositeselector/${id}`,
        method: "POST",
        body: { checked },
      }),
    }),
    fetchValue: builder.query({
      query: ({ id }) => `/v1/checkfordefault/${id}`
    })
  }),
});

export const {
  useDefaultPrositeMutation,
  useFetchValueQuery
} = prositeApi;
