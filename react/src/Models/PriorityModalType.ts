// Define the interface for a single priority
export interface Priority {
    priorityId: number;
    priority: string;
    description: string;
    deleted: boolean;
    alias: string;
  }
  
  // Define the interface for the state
  export interface PriorityState {
    priorityList: Priority[];
  }