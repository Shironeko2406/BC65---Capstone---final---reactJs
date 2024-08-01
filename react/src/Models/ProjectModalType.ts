// Định nghĩa kiểu cho member
export interface Member {
    userId: number;
    name: string;
    avatar: string;
  }
  
  // Định nghĩa kiểu cho creator
  export interface Creator {
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
  export interface ProjectState {
    projectList: Project[];
    projectDetailById: ProjectDetailTask;
  }
  
  // Định nghĩa kiểu cho thông tin chi tiết của một dự án (dành cho modal)
  export interface ProjectDetail {
    project: Project;
    isVisible: boolean;
  }
  
  // Định nghĩa kiểu cho thông tin để tạo mới hoặc cập nhật dự án
  export interface ProjectFormValues {
    projectName: string;
    description: string;
    categoryId: number;
    categoryName: string;
    alias: string;
    deleted: boolean;
    members: Member[];
    creator: Creator;
  }
  
  export interface FormCreateProject {
    projectName: string;
    description: string;
    categoryId: number;
    alias: string;
  }
  

  export interface EditProjectProps {
    visible: boolean;
    onClose: () => void;
    project: Project | null;
  }



  //--------------Phần Project detail cho trang project detail task

  export interface ProjectDetailTask {
    lstTask: TaskStatus[];
    members: Member[];
    creator: Creator;
    id: number;
    projectName: string;
    description: string;
    projectCategory: ProjectCategory;
    alias: string;
    dateTime: string;
  }

  export interface TaskStatus {
    lstTaskDeTail: TaskDetail[];
    statusId: string;
    statusName: string;
    alias: string;
  }

  // Định nghĩa kiểu cho TaskDetail
  export interface TaskDetail {
    // Define properties for task details here
  } 

  // Định nghĩa kiểu cho ProjectCategory
  export interface ProjectCategory {
    id: number;
    name: string;
  }
