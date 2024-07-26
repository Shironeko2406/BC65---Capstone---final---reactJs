import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  HOST_DOMAIN,
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
import axios from "axios";

export interface UserLoggedType {
  email: string;
  passWord: string;
}

export interface UserInfo {
  userId: number;
  email: string;
  passWord: string;
  name: string;
  phoneNumber: string;
}

export interface UsersState {
  userLogin: UserLoggedType | null;
  userInfo: UserInfo | null;
  userList: UserInfo[];
}

const initialState: UsersState = {
  userLogin: getDataJSONStorage(USER_LOGIN),
  userInfo: {
    userId: 0, // Thêm giá trị khởi tạo cho id
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  },
  userList: [],
};

const userReducer = createSlice({
  name: "userReducer",
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
  },
});

export const { loginAction, signupAction, logoutAction, setUserList } =
  userReducer.actions;

export default userReducer.reducer;

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
        // API đã trả về phản hồi, ghi lại chi tiết lỗi
        const errorMessage = error.response.data?.message || "Unknown error";
        message.error("Login failed: " + errorMessage);
        console.error("Error details:", error.response.data);
      } else {
        // Không nhận được phản hồi từ API
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

//----------------- Lấy danh sách người dùng-------------------
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
