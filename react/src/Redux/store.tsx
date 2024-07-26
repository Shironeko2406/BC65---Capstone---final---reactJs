import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/userReducer";
const store = configureStore({
  reducer: {
    userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export type GetStateMethodType = typeof store.getState;

export default store;
