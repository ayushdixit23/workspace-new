import { createSlice } from "@reduxjs/toolkit";

const userData = createSlice({
	name: "userData",
	initialState: {
		loading: false,
		path: "",
		data: null,
		isLoading: false
	},
	reducers: {
		changelaoding: (state, action) => {
			const { loading, path } = action.payload;
			state.loading = loading
			state.path = path
		},
		sendData: (state, action) => {
			state.data = action.payload
		},
		LoadThis: (state, action) => {
			state.isLoading = action.payload
		},
	},
});

export const {
	// getData,
	changelaoding, sendData, LoadThis } = userData.actions;
export default userData.reducer;