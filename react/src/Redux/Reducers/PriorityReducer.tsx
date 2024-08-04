import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Priority, PriorityState } from "../../Models/PriorityModalType";
import { DispatchType } from "../store";
import { httpClient } from "../../Util/UtilFunction";

const initialState: PriorityState = {
  priorityList: [
    {
      priorityId: 1,
      priority: "High",
      description: "High",
      deleted: false,
      alias: "High",
    },
  ],
};

const PriorityReducer = createSlice({
  name: "PriorityReducer",
  initialState,
  reducers: {
    setPriorityList: (
      state: PriorityState,
      action: PayloadAction<Priority[]>
    ) => {
      state.priorityList = action.payload;
    },
  },
});

export const { setPriorityList } = PriorityReducer.actions;

export default PriorityReducer.reducer;
//----------API CALL--------------
export const GetPriorityActionAsync = () => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.get("/api/Priority/getAll");
      console.log(res.data.content);
      const actionAsync = setPriorityList(res.data.content);
      dispatch(actionAsync);
    } catch (error: any) {
      console.log(error);
    }
  };
};
