import { Api } from "../slice/apiSlice";
export const productApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => `/v1/fetchProducts/${id}`,
    }),
    createCollection: builder.mutation({
      query: ({ id, data }) => ({
        url: `/v1/createCollection/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    removeCollection: builder.mutation({
      query: ({ id, colid }) => ({
        url: `/v1/collectiondelete/${id}/${colid}`,
        method: "DELETE",
      }),
    }),
    createStore: builder.mutation({
      query: ({ id, data }) => ({
        url: `/v1/registerstore/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    checkStoreExists: builder.query({
      query: ({ id }) => `/v1/checkstore/${id}`,
    }),
    addProduct: builder.mutation({
      query: ({ id, collecid, data }) => ({
        url: `/v1/createproduct/${id}/${collecid}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ id, collecid, pid }) => ({
        url: `/v1/deleteproduct/${id}/${collecid}/${pid}`,
        method: "DELETE",
      }),
    }),
    getSingleProduct: builder.query({
      query: ({ userid, pid }) => `/v1/getaproduct/${userid}/${pid}`,
      keepUnusedDataFor: 400,
    }),
    updateProduct: builder.mutation({
      query: ({ userid, collectionid, product, formDataToSend }) => ({
        url: `/v1/updateaproduct/${userid}/${collectionid}/${product}`,
        method: "POST",
        body: formDataToSend,
      }),
    }),
    updateProductvariant: builder.mutation({
      query: ({ userid, collectionid, product, formDataToSend }) => ({
        url: `/v1/updateaproductvariant/${userid}/${collectionid}/${product}`,
        method: "POST",
        body: formDataToSend,
      }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useCreateCollectionMutation,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useRemoveCollectionMutation,
  useUpdateProductvariantMutation,
  useCreateStoreMutation,
  useCheckStoreExistsQuery,
} = productApi;
