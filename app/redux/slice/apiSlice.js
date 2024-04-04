import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
	reducerPath: "Api",
	baseQuery:
		// fetchBaseQuery({
		// 	baseUrl: "http://192.168.1.8:7190/api"
		// }),
		// fetchBaseQuery({
		// 	baseUrl: "http://192.168.29.230:7190/api"
		// }),
		// fetchBaseQuery({
		// 	baseUrl: "http://192.168.84.86:7190/api"
		// }),
		// fetchBaseQuery({
		// 	baseUrl: "http://192.168.29.225:7190/api"
		// }),
		fetchBaseQuery({ baseUrl: "https://work.grovyo.xyz/api" }),
	// fetchBaseQuery({ baseUrl: "http://68.183.95.44:7190/api" }),
	endpoints: () => ({}),
});
