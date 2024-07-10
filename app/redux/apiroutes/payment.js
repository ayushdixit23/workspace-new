import { Api } from "../slice/apiSlice";
export const paymentApi = Api.injectEndpoints({
	endpoints: (builder) => ({
		getEarningStats: builder.query({
			query: ({ id }) => `/v1/earnings/${id}`
		}),
		addBank: builder.mutation({
			query: ({ id, data }) => ({
				url: `/v1/addbank/${id}`,
				body: data,
				method: "POST"
			}
			)
		}),
		memfinalize: builder.mutation({
			query: ({ id, orderid, data }) => ({
				// url: `/v1/memfinalize/${id}/${res.data?.order}`,
				url: `/v1/memfinalize/${id}/${orderid}`,
				method: "POST",
				body: data
			})
		}),
		changeMontent: builder.mutation({
			query: ({ comid, ismonetized }) => ({
				// url: `/v1/memfinalize/${id}/${res.data?.order}`,
				url: `/v1/changemont/${comid}`,
				method: "POST",
				body: { ismonetized }
			})
		}),
		createWithDrawRequest: builder.mutation({
			query: ({ id, amount }) => ({
				url: `/v1/createwithdrawRequest/${id}`,
				method: "POST",
				body: { amount }
			})
		})
		// bankRequest: builder.mutation({
		// 	query: ({ id }) => ({
		// 		url: `/v1/approvalrequestbank/${id}`,
		// 		method: "POST",
		// 	})
		// })
	}),
});

export const {
	useGetEarningStatsQuery,
	useAddBankMutation,
	useMemfinalizeMutation,
	// useBankRequestMutation
	useChangeMontentMutation,
	useCreateWithDrawRequestMutation
} = paymentApi;
