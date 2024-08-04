export interface UserInfo {
    userId: number;
    name: string;
    avatar: string;
    email: string;
    phoneNumber: string;
    passWord: string;

  }
  
  export interface UserLoggedType {
    email: string;
    passWord: string;
  }
  
  export interface UsersState {
    userLogin: UserLoggedType | null;
    userInfo: UserInfo | null;
    userList: UserInfo[];
    userListByProjectId: UserInfo[]
  }

  export interface UserDrawerProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (values: UserInfo) => void;
    initialValues: UserInfo | null;
  }

  //-------Login - Register--------------
  export interface LoginFormValues {
    email: string;
    passWord: string;
    remember?: boolean;
  }

  export interface RegisterFormValues {
    email: string;
    passWord: string;
    name: string;
    phoneNumber: string;
    avatar: string;
  }