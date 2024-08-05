import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const navigateTo = (path: string) => {
  window.location.href = path;
};
const TOKEN_AUTHOR: string = "accessToken";
const USER_LOGIN: string = "userLogin";
const HOST_DOMAIN: string = "https://jiranew.cybersoft.edu.vn";
//Token của Hiếu
// const TOKEN_CYBERSOFT =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NSIsIkhldEhhblN0cmluZyI6IjI1LzExLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTczMjQ5MjgwMDAwMCIsIm5iZiI6MTcwMjMxNDAwMCwiZXhwIjoxNzMyNjQwNDAwfQ._Cum2zMqV8nsbUfpCOe0ILWE_GvP8V8FQnmOR8PRB44";

//Token của Trí
const TOKEN_CYBERSOFT: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NSIsIkhldEhhblN0cmluZyI6IjI1LzExLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTczMjQ5MjgwMDAwMCIsIm5iZiI6MTcwMjMxNDAwMCwiZXhwIjoxNzMyNjQwNDAwfQ._Cum2zMqV8nsbUfpCOe0ILWE_GvP8V8FQnmOR8PRB44";

// Cấu hình interceptors
const httpClient: AxiosInstance = axios.create({
  baseURL: HOST_DOMAIN,
  timeout: 30000,
});

httpClient.interceptors.request.use(
  (req: InternalAxiosRequestConfig<any>) => {
    const accessToken = localStorage.getItem(TOKEN_AUTHOR);
    if (req.headers) {
      req.headers.set(
        "Authorization",
        accessToken ? `Bearer ${accessToken}` : ""
      );
      req.headers.set("tokenCybesoft", TOKEN_CYBERSOFT);
    }
    return req;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

httpClient.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // Xử lý response thành công
    return response;
  },
  (error: AxiosError) => {
    // Xử lý lỗi response
    if (error.response) {
      // Server đã trả về một response nhưng với mã trạng thái lỗi
      switch (error.response.status) {
        case 401:
          // Xử lý lỗi 401 Unauthorized, ví dụ: chuyển hướng đến trang đăng nhập
          console.error(
            "Unauthorized access - perhaps the user is not logged in or token expired."
          );

          navigateTo("/");

          break;
        case 403:
          // Xử lý lỗi 403 Forbidden
          console.error(
            "Forbidden - you don't have permission to access this resource."
          );

          navigateTo("/");

          break;
        case 404:
          // Xử lý lỗi 404 Not Found
          console.error("Resource not found.");
          break;
        case 500:
          // Xử lý lỗi 500 Internal Server Error
          console.error("Internal server error.");
          break;
        default:
          // Xử lý các mã lỗi khác
          console.error(
            `Error ${error.response.status}: ${error.response.statusText}`
          );
      }
    } else if (error.request) {
      // Request đã được gửi nhưng không nhận được phản hồi từ server
      console.error("No response received from server.");
    } else {
      // Một số lỗi khác xảy ra trong quá trình thiết lập request
      console.error("Error setting up request: ", error.message);
    }

    return Promise.reject(error);
  }
);

// Cookie and local storage interaction functions

const getDataTextStorage = (storeName: string): string | null => {
  if (localStorage.getItem(storeName)) {
    return localStorage.getItem(storeName);
  }
  return null;
};

const getDataJSONStorage = (storeName: string): any | null => {
  if (localStorage.getItem(storeName)) {
    return JSON.parse(localStorage.getItem(storeName) as string);
  }
  return null;
};

const setDataTextStorage = (storeName: string, data: string): void => {
  localStorage.setItem(storeName, data);
};

const setDataJSONStorage = (storeName: string, data: any): void => {
  localStorage.setItem(storeName, JSON.stringify(data));
};

const removeDataTextStorage = (storeName: string): void => {
  localStorage.removeItem(storeName);
};

function setCookie(name: string, value: string, days?: number): void {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function deleteCookie(name: string): void {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export {
  getDataTextStorage,
  getDataJSONStorage,
  setDataTextStorage,
  setDataJSONStorage,
  removeDataTextStorage,
  setCookie,
  getCookie,
  deleteCookie,
  TOKEN_AUTHOR,
  USER_LOGIN,
  HOST_DOMAIN,
  TOKEN_CYBERSOFT,
  httpClient,
};
