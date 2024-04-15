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
  }),
});

export const {
  useDefaultPrositeMutation
} = prositeApi;
