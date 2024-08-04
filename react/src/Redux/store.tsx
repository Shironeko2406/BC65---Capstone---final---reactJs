import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from "./Reducers/ProjectReducer";
import UsersReducer from "./Reducers/UsersReducer";
import ProjectCategoryReducer from "./Reducers/ProjectCategoryReducer";
import TaskTypeReducer from "./Reducers/TaskTypeReducer";
import StatusReducer from "./Reducers/StatusReducer";
import PriorityReducer from "./Reducers/PriorityReducer";

export const store:any = configureStore({
  reducer: {
    number: (state: number = 1) => state,
    UsersReducer,
    ProjectReducer,
    ProjectCategoryReducer,
    TaskTypeReducer,
    StatusReducer,
    PriorityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
export type GetStateMethodType = typeof store.getState;
