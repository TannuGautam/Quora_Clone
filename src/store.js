import { configureStore } from "@reduxjs/toolkit"
import questionReducer from "../src/redux/questionSlice";

export default configureStore({
  reducer: {
    question: questionReducer,
  },
});

