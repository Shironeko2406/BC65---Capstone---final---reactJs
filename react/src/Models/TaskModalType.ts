// TaskModalType.ts

export type Assignee = {
    id: number;
    avatar: string;
    name: string;
    alias: string;
  };
  
  export type Task = {
    id: string;
    taskName: string;
    priority: string;
    assignees: Assignee[];
  };
  
  export type Stage = {
    title: string;
    tasks: Task[];
  };

// TaskModalTypes dành cho Create Task
export interface Priority {
  priorityId: number;
  priority: string;
}

export interface TaskType {
  id: number;
  taskType: string;
}

export interface Status {
  statusId: number;
  statusName: string;
}

export interface User {
  userId: number;
  name: string;
  avatar: string;
}

export interface TaskState {
  priorities: Priority[];
  taskTypes: TaskType[];
  statuses: Status[];
  assignees: User[];
}

export interface createTaskForm {
  listUserAsign: number[];
  taskName: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  priorityId: number;
}