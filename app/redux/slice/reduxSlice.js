import { createSlice } from "@reduxjs/toolkit";

const reduxSlice = createSlice({
  name: "prosite",
  initialState: {
    // image: [],
    image: "",
    font1: {
      size: "",
      family: "",
      shadow: "",
      weight: "",
    },
    font2: {
      size: "",
      family: "",
      shadow: "",
      weight: "",
    },
    font3: {
      size: "",
      family: "",
      shadow: "",
      weight: "",
    },
    button: {
      bg: "",
      color: "",
      pad: "",
      boxShadow: "",
      weight: "",
      borderRadius: "",
      borderBottom: "",
    },
    background: "",
    lottie: "",
    data: [],
    done1: false,
    done2: false,
    done3: false,
    msg: "",
    backcolor: "",
    textcolor: "",
  },
  reducers: {
    imageReducer: (state, action) => {
      //   if (state.image.length < 2) {
      //   	if (state.image.includes(action.payload)) {
      //   		return
      //   	} else {
      //   		state.image.push(action.payload)
      //   	}
      //   }
      state.image = action.payload;
      state.msg = "";
    },
    buttonReducer: (state, action) => {
      state.button = action.payload;
    },
    font1Reducer: (state, action) => {
      if (state.done1) {
        state.font1 = action.payload;
      }
      state.done1 = false;
    },
    font2Reducer: (state, action) => {
      if (state.done2) {
        state.font2 = action.payload;
      }
      state.done2 = false;
    },
    font3Reducer: (state, action) => {
      if (state.done3) {
        state.font3 = action.payload;
      }
      state.done3 = false;
    },
    backgroundReducer: (state, action) => {
      state.background = action.payload;
      state.backcolor = "";
    },
    lottieReducer: (state, action) => {
      state.lottie = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    donewala1: (state, action) => {
      state.done1 = action.payload;
    },
    donewala2: (state, action) => {
      state.done2 = action.payload;
    },
    donewala3: (state, action) => {
      state.done3 = action.payload;
    },
    msg: (state, action) => {
      state.msg = action.payload;
    },
    backColor: (state, action) => {
      const { bgcolor, textcolor, buttonColor } = action.payload;
      (state.backcolor = bgcolor),
        (state.textcolor = textcolor),
        (state.button.bg = buttonColor);
      state.background = "";
    },
  },
});

export const {
  imageReducer,
  backColor,
  buttonReducer,
  font1Reducer,
  msg,
  font2Reducer,
  font3Reducer,
  backgroundReducer,
  donewala1,
  donewala2,
  donewala3,
  lottieReducer,
  setData,
} = reduxSlice.actions;
export default reduxSlice.reducer;
