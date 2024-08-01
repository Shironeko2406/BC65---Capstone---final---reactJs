import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../store";
import { httpClient, TOKEN_CYBERSOFT } from "../../Util/UtilFunction";
import {
  FormCreateProject,
  Project,
  ProjectDetailTask,
  ProjectState,
} from "../../Models/ProjectModalType";
import { message } from "antd";

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
  projectDetailById: {
    lstTask: [
      {
        lstTaskDeTail: [],
        statusId: "1",
        statusName: "BACKLOG",
        alias: "tồn đọng"
      },
      {
        lstTaskDeTail: [],
        statusId: "2",
        statusName: "SELECTED FOR DEVELOPMENT",
        alias: "được chọn để phát triển"
      },
      {
        lstTaskDeTail: [],
        statusId: "3",
        statusName: "IN PROGRESS",
        alias: "trong tiến trình"
      },
      {
        lstTaskDeTail: [],
        statusId: "4",
        statusName: "DONE",
        alias: "hoàn thành"
      }
    ],
    members: [
      {
        userId: 6327,
        name: "Hiếu",
        avatar: "https://ui-avatars.com/api/?name=Hiếu",
      },
      {
        userId: 3962,
        name: "Đây là tên Ron",
        avatar: "https://ui-avatars.com/api/?name=Đây là tên Ron",
      },
      {
        userId: 2909,
        name: "wewewerrr",
        avatar: "https://ui-avatars.com/api/?name=wewewerrr",
      },
      {
        userId: 5693,
        name: "Iman Khaki Arvand",
        avatar: "https://ui-avatars.com/api/?name=Iman Khaki Arvand",
      },
      {
        userId: 5720,
        name: "trinhluong",
        avatar: "https://ui-avatars.com/api/?name=trinhluong",
      },
      {
        userId: 5707,
        name: "Banh my",
        avatar: "https://ui-avatars.com/api/?name=Banh my",
      },
      {
        userId: 5706,
        name: "Hoho neeeee",
        avatar: "https://ui-avatars.com/api/?name=Hoho neeeee",
      }
    ],
    creator: {
      id: 6915,
      name: "Hiếu"
    },
    id: 15794,
    projectName: "test híu up",
    description: "<p>2 3<strong> con m&egrave;o <em>đi lạc n&egrave;</em></strong></p>",
    projectCategory: {
      id: 2,
      name: "Dự án phần mềm"
    },
    alias: "test-hiu-up",
    dateTime: "2024-08-01T22:15:06.3233796+07:00"
  }
};

const ProjectReducer = createSlice({
  name: "ProjectReducer",
  initialState,
  reducers: {
    setProjectList: (state: ProjectState, action: PayloadAction<Project[]>) => {
      state.projectList = action.payload;
    },
    setProjectDetailById: (state: ProjectState, action: PayloadAction<ProjectDetailTask>) => {
      state.projectDetailById = action.payload;
    },
  },
});

export const { setProjectList, setProjectDetailById } = ProjectReducer.actions;

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

export const CreateProjectActionAsync = (projectData: FormCreateProject) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.post(
        `/api/Project/createProjectAuthorize`,
        projectData
      );
      console.log(res.data.content);
      dispatch(GetProjectAllActionAsync());
      message.success("Create success!");
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const UpdateProjectActionAsync = (
  id: number,
  dataUpdate: FormCreateProject
) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.put(
        `/api/Project/updateProject?projectId=${id}`,
        dataUpdate
      );
      console.log(res.data.content);
      dispatch(GetProjectAllActionAsync());
      message.success("Update success!");
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const DeleteProjectActionAsync = (id: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.delete(
        `/api/Project/deleteProject?projectId=${id}`
      );
      console.log(res.data.content);
      dispatch(GetProjectAllActionAsync());
      message.success("Delete success!");
    } catch (error: any) {
      console.log(error);
    }
  };
};

export const AssignUsersToProjectActionAsync = (
  projectId: number,
  userIds: number[]
) => {
  return async (dispatch: DispatchType) => {
    try {
      const promises = userIds.map((userId) =>
        httpClient.post("/api/Project/assignUserProject", { projectId, userId })
      );
      await Promise.all(promises);
      dispatch(GetProjectAllActionAsync());
      message.success("Users assigned successfully!");
    } catch (error: any) {
      message.error("Failed to assign users!");
      console.error(error);
    }
  };
};

export const RemoveUserFromProjectActionAsync = (projectId: number, userId: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.post("/api/Project/removeUserFromProject",{projectId, userId});
      dispatch(GetProjectAllActionAsync());
      message.success(`${res.data.content}`);
    } catch (error: any) {
      message.error("Failed delete users!");
      console.error(error);
    }
  };
};

export const GetProjectDetailByIdActionAsync = (id:number) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.get(`/api/Project/getProjectDetail?id=${id}`);
      console.log(res.data.content);
      const actionAsync = setProjectDetailById(res.data.content);
      dispatch(actionAsync);
    } catch (error: any) {
      console.log(error);
    }
  };
};