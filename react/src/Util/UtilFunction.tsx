const TOKEN_AUTHOR = "accessToken";
const USER_LOGIN = "userLogin";
const HOST_DOMAIN = "https://apistore.cybersoft.edu.vn";
//Token của Hiếu
// const TOKEN_CYBERSOFT =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NSIsIkhldEhhblN0cmluZyI6IjI1LzExLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTczMjQ5MjgwMDAwMCIsIm5iZiI6MTcwMjMxNDAwMCwiZXhwIjoxNzMyNjQwNDAwfQ._Cum2zMqV8nsbUfpCOe0ILWE_GvP8V8FQnmOR8PRB44";

//Token của Trí
const TOKEN_CYBERSOFT = "YOUR_TOKEN_KEY"

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
};
