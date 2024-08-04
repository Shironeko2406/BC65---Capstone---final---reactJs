import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType, TaskTypeState } from "../../Models/TaskTypeModalType";
import { DispatchType } from "../store";
import { httpClient } from "../../Util/UtilFunction";

const initialState: TaskTypeState = {
  taskTypeList: [
    {
      id: 1,
      taskType: "bug",
    },
    {
      id: 2,
      taskType: "new task",
    },
  ],
};

const TaskTypeReducer = createSlice({
  name: "TaskTypeReducer",
  initialState,
  reducers: {
    setTaskTypeList: (
      state: TaskTypeState,
      action: PayloadAction<TaskType[]>
    ) => {
      state.taskTypeList = action.payload;
    },
  },
});

export const { setTaskTypeList } = TaskTypeReducer.actions;

export default TaskTypeReducer.reducer;
//----------API CALL--------------
export const GetTaskTypeActionAsync = () => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.get("/api/TaskType/getAll");
      console.log(res.data.content);
      const actionAsync = setTaskTypeList(res.data.content);
      dispatch(actionAsync);
    } catch (error: any) {
      console.log(error);
    }
  };
};
