import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    buttonDetails: {
      text: "",
      link: "",
    },
    template: [],
  },
  reducers: {
    buttonData: (state, action) => {
      state.buttonDetails = action.payload;
    },
    templateData: (state, action) => {
      state.template = action.payload;
    },
  },
});

export const { buttonData, templateData } = dataSlice.actions;
export default dataSlice.reducer;
