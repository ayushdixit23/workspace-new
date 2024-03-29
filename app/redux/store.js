"use client"
import { configureStore } from "@reduxjs/toolkit";
import userData from "./slice/userData";
import { Api } from "./slice/apiSlice";
import reduxSlice from "./slice/reduxSlice";
import dataSlice from "./slice/dataSlice";

export const store = configureStore({
	reducer: {
		userData: userData,
		prosite: reduxSlice,
		data: dataSlice,
		[Api.reducerPath]: Api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(Api.middleware),
})