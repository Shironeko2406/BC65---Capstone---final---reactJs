import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status, StatusState } from "../../Models/StatusModalType";
import { DispatchType } from "../store";
import { httpClient } from "../../Util/UtilFunction";

const initialState: StatusState = {
  statusList: [
    {
      statusId: "1",
      statusName: "BACKLOG",
      alias: "tồn đọng",
      deleted: "False",
    },
  ],
};

const StatusReducer = createSlice({
  name: "StatusReducer",
  initialState,
  reducers: {
    setStatusList: (state: StatusState, action: PayloadAction<Status[]>) => {
      state.statusList = action.payload;
    },
  },
});

export const { setStatusList } = StatusReducer.actions;

export default StatusReducer.reducer;
//----------API CALL--------------
export const GetStatusActionAsync = () => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.get("/api/Status/getAll");
      console.log(res.data.content);
      const actionAsync = setStatusList(res.data.content);
      dispatch(actionAsync);
    } catch (error: any) {
      console.log(error);
    }
  };
};
