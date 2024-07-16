import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery:
    // fetchBaseQuery({
    //   baseUrl: "http://192.168.1.16:7190/api",
    // }),
    fetchBaseQuery({ baseUrl: "https://work.grovyo.xyz/api" }),
  endpoints: () => ({}),
});

// fetchBaseQuery({
//   baseUrl: "http://192.168.1.3:7190/api"
// }),

// fetchBaseQuery({
//   baseUrl: "http://192.168.63.195:7190/api",
// }),

// fetchBaseQuery({
// 	baseUrl: "http://192.168.84.86:7190/api"
// }),

// fetchBaseQuery({
// 	baseUrl: "http://192.168.29.225:7190/api"
// }),

// fetchBaseQuery({ baseUrl: "http://192.168.1.4:7190/api" }),