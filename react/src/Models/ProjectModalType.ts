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
    taskDetail: TaskDetail
    projectName: string;
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
  
  export interface FormTaskUpdate {
    taskName: string;
    description: string;
    typeId: number;
    statusId: string;
    listUserAsign: number[]; // Assuming it's an array of user IDs
    priorityId: number;
    originalEstimate: number;
    timeTrackingSpent: number;
    timeTrackingRemaining: number;
    projectId: number;
    taskId: string;
  }
  

  export interface EditProjectProps {
    visible: boolean;
    onClose: () => void;
    project: Project | null;
  }


  export interface TaskDetail {
    priorityTask: PriorityTask;
    taskTypeDetail: TaskTypeDetail;
    assigness: Assignee[];
    lstComment: Comment[];  // Assuming this is an array of any type, adjust if you have a specific type
    taskId: number;
    taskName: string;
    alias: string;
    description: string;
    statusId: string;
    originalEstimate: number;
    timeTrackingSpent: number;
    timeTrackingRemaining: number;
    typeId: number;
    priorityId: number;
    projectId: number;
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
  }

  export interface TaskStatus {
    lstTaskDeTail: TaskDetail[];
    statusId: string;
    statusName: string;
    alias: string;
  }

  // Định nghĩa kiểu cho TaskDetail
  export interface TaskDetail {
    priorityTask: PriorityTask;
    taskTypeDetail: TaskTypeDetail;
    assigness: Assignee[];
    lstComment: Comment[];
    taskId: number;
    taskName: string;
    alias: string;
    description: string;
    statusId: string;
    originalEstimate: number;
    timeTrackingSpent: number;
    timeTrackingRemaining: number;
    typeId: number;
    priorityId: number;
    projectId: number;
  }

  export interface PriorityTask {
    priorityId: number;
    priority: string;
  }

  export interface TaskTypeDetail {
    id: number;
    taskType: string;
  }

  export interface Assignee {
    id: number;
    avatar: string;
    name: string;
    alias: string;
  }

  export interface Comment {
    id: number;
    idUser: number;
    name: string;
    avatar: string;
    commentContent: string;
}

  // Định nghĩa kiểu cho ProjectCategory
  export interface ProjectCategory {
    id: number;
    name: string;
  }
