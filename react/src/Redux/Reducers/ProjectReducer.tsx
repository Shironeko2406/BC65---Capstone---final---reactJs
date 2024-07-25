// src/features/project/ProjectReducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../store";
import { httpClient, TOKEN_CYBERSOFT } from "../../Util/UtilFunction";

// Định nghĩa kiểu cho member
interface Member {
  userId: number;
  name: string;
  avatar: string;
}

// Định nghĩa kiểu cho creator
interface Creator {
  id: number;
  name: string;
}

// Định nghĩa kiểu cho một dự án
export interface Project {
  members: Member[];
  creator: Creator;
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
}

// Định nghĩa kiểu cho trạng thái của slice
interface ProjectState {
  projectList: Project[];
}

// Khởi tạo trạng thái mặc định
const initialState: ProjectState = {
  projectList: [
    {
      members: [
        {
          userId: 5826,
          name: "hieu",
          avatar: "https://ui-avatars.com/api/?name=hieu",
        },
        {
          userId: 6513,
          name: "quan123",
          avatar: "https://ui-avatars.com/api/?name=quan123",
        },
        {
          userId: 5987,
          name: "Vo Minh Tu",
          avatar: "https://ui-avatars.com/api/?name=Vo Minh Tu",
        },
      ],
      creator: {
        id: 6553,
        name: "name6",
      },
      id: 15154,
      projectName: "mahattan 2",
      description: "<p>pussion</p>",
      categoryId: 2,
      categoryName: "Dự án phần mềm",
      alias: "mahattan-2",
      deleted: false,
    },
  ],
};

// Tạo slice với tên, trạng thái khởi tạo và các reducer
const ProjectReducer = createSlice({
  name: "ProjectReducer",
  initialState,
  reducers: {
    setProjectList: (state: ProjectState, action: PayloadAction<Project[]>) => {
      state.projectList = action.payload;
    },
  },
});

// Xuất các actions để sử dụng trong các component hoặc nơi khác
export const { setProjectList } = ProjectReducer.actions;

// Xuất reducer để thêm vào store
export default ProjectReducer.reducer;
//--------------API CALL-------------

export const GetProjectAllActionAsync = () => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.get("/api/Project/getAllProject", {
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT, // Thay thế 'your_token_here' bằng giá trị thực tế của TokenCybersoft
        },
      });
      console.log(res.data.content);
      const actionAsync = setProjectList(res.data.content);
      dispatch(actionAsync);
    } catch (error: any) {
      console.log(error);
    }
  };
};
