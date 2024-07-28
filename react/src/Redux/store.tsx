import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/UserReducer";
import ProjectReducer from "./Reducers/ProjectReducer";


  
export const store:any = configureStore({
  reducer: {
    number: (state: number = 1) => state,
    userReducer,
    ProjectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export type GetStateMethodType = typeof store.getState;
