import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from "./Reducers/ProjectReducer";
import UsersReducer from "./Reducers/UsersReducer";


  
export const store:any = configureStore({
  reducer: {
    number: (state: number = 1) => state,
    UsersReducer,
    ProjectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export type GetStateMethodType = typeof store.getState;
