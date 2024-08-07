import { createSlice } from "@reduxjs/toolkit";
import { DispatchType } from "../store";
import { httpClient } from "../../Util/UtilFunction";
import { GetTaskDetailByIdActionAsync } from "./ProjectReducer";
import { message } from "antd";

const initialState = {};

const CommentReducer = createSlice({
  name: "CommentReducer",
  initialState,
  reducers: {},
});

export const {} = CommentReducer.actions;

export default CommentReducer.reducer;
//-----------API CAll---------
export const DeleteCommentActionAsync = (taskId: number, commentId: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.delete(
        `/api/Comment/deleteComment?idComment=${commentId}`
      );
      dispatch(GetTaskDetailByIdActionAsync(taskId));
      message.success(`${res.data.content}`);
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const EditCommentActionAsync = (
  taskId: number,
  commentId: number,
  contentComment: string
) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.put(
        `/api/Comment/updateComment?id=${commentId}&contentComment=${encodeURIComponent(
          contentComment
        )}`
      );
      console.log(res.data.content)
      dispatch(GetTaskDetailByIdActionAsync(taskId));
      message.success("Update success!");
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const AddCommentActionAsync = (
  taskId: number,
  contentComment: string
) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.post(`/api/Comment/insertComment`, {
        taskId,
        contentComment,
      });
      console.log(res.data.content)
      dispatch(GetTaskDetailByIdActionAsync(taskId));
      message.success("Create success!");
    } catch (error: any) {
      console.log(error);
    }
  };
};
