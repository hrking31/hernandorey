import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import passwordReducer from "./Slices/passwordSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    password: passwordReducer,
  },
});
