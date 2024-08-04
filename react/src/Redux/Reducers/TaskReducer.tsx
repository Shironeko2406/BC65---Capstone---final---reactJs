// src/Redux/Reducers/TaskReducer.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  httpClient,
  TOKEN_CYBERSOFT,
  TOKEN_AUTHOR,
} from "../../Util/UtilFunction";
import { DispatchType } from "../store";
import { message } from "antd";
import { GetProjectDetailByIdActionAsync } from "./ProjectReducer";
import {
  TaskType,
  Priority,
  Status,
  User,
  TaskState,
  createTaskForm,
} from "../../Models/TaskModalType";

const initialState: TaskState = {
  priorities: [],
  taskTypes: [],
  statuses: [],
  assignees: [],
};

const TaskReducer = createSlice({
  name: "TaskReducer",
  initialState,
  reducers: {
    setPriorities(state, action: PayloadAction<Priority[]>) {
      state.priorities = action.payload;
    },
    setTaskTypes(state, action: PayloadAction<TaskType[]>) {
      state.taskTypes = action.payload;
    },
    setStatuses(state, action: PayloadAction<Status[]>) {
      state.statuses = action.payload;
    },
    setAssignees(state, action: PayloadAction<User[]>) {
      state.assignees = action.payload;
    },
  },
});

export const { setPriorities, setTaskTypes, setStatuses, setAssignees } =
  TaskReducer.actions;

export default TaskReducer.reducer;

// Action Thunks
export const CreateTaskActionAsync = (data: createTaskForm) => {
  return async (dispatch: DispatchType) => {
    try {
      const token = localStorage.getItem(TOKEN_AUTHOR);
      await httpClient.post("/api/Project/createTask", data, {
        headers: {
          Authorization: token,
          TokenCybersoft: TOKEN_CYBERSOFT,
        },
      });
      message.success("Task created successfully");
      dispatch(GetProjectDetailByIdActionAsync(data.projectId));
    } catch (error: any) {
      console.error("Failed to create task:", error);
      message.error("Failed to create task");
    }
  };
};
