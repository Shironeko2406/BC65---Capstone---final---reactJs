import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  TOKEN_AUTHOR,
  TOKEN_CYBERSOFT,
  USER_LOGIN,
  getDataJSONStorage,
  getDataTextStorage,
  httpClient,
  setCookie,
  setDataJSONStorage,
  setDataTextStorage,
} from "../../Util/UtilFunction";
import { DispatchType } from "../store";
import {
  UserInfo,
  UserLoggedType,
  UsersState,
} from "../../Models/UserModalType";

const initialState: UsersState = {
  userLogin: getDataJSONStorage(USER_LOGIN),
  userInfo: {
    userId: 0,
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
    avatar: "",
  },
  userList: [],
  userListByProjectId: [],
};

const UsersReducer = createSlice({
  name: "UsersReducer",
  initialState,
  reducers: {
    loginAction: (state: UsersState, action: PayloadAction<UserLoggedType>) => {
      state.userLogin = action.payload;
    },
    signupAction: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    logoutAction: (state) => {
      state.userLogin = null;
    },
    setUserList: (state, action: PayloadAction<UserInfo[]>) => {
      state.userList = action.payload;
    },
    setUserListByProjectId: (state, action: PayloadAction<UserInfo[]>) => {
      state.userListByProjectId = action.payload;
    },
    removeUserFromList: (state, action: PayloadAction<number>) => {
      state.userList = state.userList.filter(
        (user) => user.userId !== action.payload
      );
    },
    updateUserInList: (state, action: PayloadAction<UserInfo>) => {
      const index = state.userList.findIndex(
        (user) => user.userId === action.payload.userId
      );
      if (index !== -1) {
        state.userList[index] = action.payload;
      }
    },
  },
});

export const {
  loginAction,
  signupAction,
  logoutAction,
  setUserList,
  removeUserFromList,
  updateUserInList,
  setUserListByProjectId,
} = UsersReducer.actions;

export default UsersReducer.reducer;

// Action Thunks

//----------------- Đăng nhập-------------------
export const loginActionApi = (email: string, passWord: string) => {
  return async (dispatch: DispatchType) => {
    console.log(email, passWord);
    try {
      const res = await httpClient.post(
        "/api/Users/signin",
        {
          email,
          passWord,
        },
        {
          headers: {
            TokenCybersoft: TOKEN_CYBERSOFT,
          },
        }
      );
      message.success("Logged in successfully!");
      const loginAct = loginAction(res.data.content);
      dispatch(loginAct);
      setDataJSONStorage(USER_LOGIN, res.data.content);
      setDataTextStorage(TOKEN_AUTHOR, res.data.content.accessToken);
      setCookie(TOKEN_AUTHOR, res.data.content.accessToken);
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.message || "Unknown error";
        message.error("Login failed: " + errorMessage);
        console.error("Error details:", error.response.data);
      } else {
        message.error("Login failed: " + error.message);
        console.error("Error details:", error);
      }
    }
  };
};

//----------------- Đăng kí-------------------
export const signupActionApi = (signupInfo: Omit<UserInfo, "userId">) => {
  return async (dispatch: DispatchType) => {
    try {
      console.log(signupInfo);
      const res = await httpClient.post("/api/Users/signup", signupInfo, {
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
        },
      });
      message.success("Sign Up Success!");
      console.log(res);
      const signup = signupAction(res.data.content);
      dispatch(signup);
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.message || "Unknown error";
        message.error("Sign Up failed: " + errorMessage);
        console.error("Error details:", error.response.data);
      } else {
        message.error("Sign Up failed: " + error.message);
        console.error("Error details:", error);
      }
    }
  };
};

//----------------- Lấy danh sách user-------------------
export const getUserListApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const token = getDataTextStorage(TOKEN_AUTHOR);
      console.log("token", token);
      console.log("token cybersoft", TOKEN_CYBERSOFT);
      const res = await httpClient.get("/api/Users/getUser", {
        headers: {
          Authorization: token,
          TokenCybersoft: TOKEN_CYBERSOFT,
        },
      });
      dispatch(setUserList(res.data.content));
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.message || "Unknown error";
        message.error("Failed to fetch user list: " + errorMessage);
        console.error("Error details:", error.response.data);
      } else {
        message.error("Failed to fetch user list: " + error.message);
        console.error("Error details:", error);
      }
    }
  };
};

//----------- Xóa user-------------
export const deleteUserApi = (userId: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const token = getDataTextStorage(TOKEN_AUTHOR);
      await httpClient.delete(`/api/Users/deleteUser?id=${userId}`, {
        headers: {
          Authorization: token,
          TokenCybersoft: TOKEN_CYBERSOFT,
        },
      });
      dispatch(removeUserFromList(userId));
      message.success("User deletion successful!");
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.message || "Unknown error";
        message.error("Failed to delete user: " + errorMessage);
        console.error("Error details:", error.response.data);
      } else {
        message.error("Failed to delete user: " + error.message);
        console.error("Error details:", error);
      }
    }
  };
};

export const deleteMultipleUsersApi = (userIds: number[]) => {
  return async (dispatch: DispatchType) => {
    const token = getDataTextStorage(TOKEN_AUTHOR);
    try {
      const promises = userIds.map((userId) =>
        httpClient.delete(`/api/Users/deleteUser?id=${userId}`, {
          headers: {
            Authorization: token,
            TokenCybersoft: TOKEN_CYBERSOFT,
          },
        })
      );
      await Promise.all(promises);
      userIds.forEach((userId) => dispatch(removeUserFromList(userId)));
      message.success("Successfully deleted the selected user!");
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.message || "Unknown error";
        message.error("Failed to delete users: " + errorMessage);
        console.error("Error details:", error.response.data);
      } else {
        message.error("Failed to delete users: " + error.message);
        console.error("Error details:", error);
      }
    }
  };
};

//-------- E User-----------------
export const editUserApi = (user: UserInfo) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.put(
        `/api/Users/editUser`,
        {
          id: user.userId,
          passWord: user.passWord,
          email: user.email,
          name: user.name,
          phoneNumber: user.phoneNumber,
        },
        {
          headers: {
            TokenCybersoft: TOKEN_CYBERSOFT,
          },
        }
      );
      console.log("userdata", res.data.content);
      dispatch(updateUserInList(res.data.content));
      message.success("User information updated successfully!");
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data?.message || "Unknown error";
        message.error("Failed to edit user: " + errorMessage);
        console.error("Error details:", error.response.data);
      } else {
        message.error("Failed to edit user: " + error.message);
        console.error("Error details:", error);
      }
    }
  };
};

//-------------Lấy danh sách user theo idProject------
export const getUserListByProjectIdActionAsync = (id: number) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.get(
        `/api/Users/getUserByProjectId?idProject=${id}`
      );
      console.log(res.data.content);
      dispatch(setUserListByProjectId(res.data.content));
    } catch (error: any) {
      console.log(error);
    }
  };
};
