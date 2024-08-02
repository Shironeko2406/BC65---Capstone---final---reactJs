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
  