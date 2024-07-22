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

export interface UserLoggedType {
  email: string;
  passWord: string;
}

export interface UserInfo {
  email: string;
  passWord: string;
  name: string;
  phoneNumber: string;
}

interface UsersState {
  userLogin: UserLoggedType | null;
  userInfo: UserInfo | null;
}

const initialState: UsersState = {
  userLogin: getDataJSONStorage(USER_LOGIN),
  userInfo: {
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  },
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
  },
});

export const { loginAction, signupAction, logoutAction } = userReducer.actions;

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
            TokenCybersoft: TOKEN_CYBERSOFT, // Thay thế 'your_token_here' bằng giá trị thực tế của TokenCybersoft
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
export const signupActionApi = (signupInfo: UserInfo) => {
  return async (dispatch: any) => {
    try {
      console.log(signupInfo);
      const res = await httpClient.post("/api/Users/signup", signupInfo, {
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT, // Thay thế 'your_token_here' bằng giá trị thực tế của TokenCybersoft
        },
      });
      message.success("Sign Up Success!");
      console.log(res);
      const signup = signupAction(res.data.content);
      dispatch(signup);
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
