import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ProjectCategory,
  ProjectCategoryState,
} from "../../Models/ProjectCategoryModalType";
import { DispatchType } from "../store";
import { httpClient } from "../../Util/UtilFunction";

const initialState: ProjectCategoryState = {
  projectCategory: [],
};

const ProjectCategoryReducer = createSlice({
  name: "ProjectCategoryReducer",
  initialState,
  reducers: {
    setProjectCategory: (
      state: ProjectCategoryState,
      action: PayloadAction<ProjectCategory[]>
    ) => {
      state.projectCategory = action.payload;
    },
  },
});

export const {setProjectCategory} = ProjectCategoryReducer.actions;

export default ProjectCategoryReducer.reducer;
//----------API CALL--------------
export const GetProjectCategoryActionAsync = () => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.get("/api/ProjectCategory");
      console.log(res.data.content);
      const actionAsync = setProjectCategory(res.data.content);
      dispatch(actionAsync);
    } catch (error: any) {
      console.log(error);
    }
  };
};
