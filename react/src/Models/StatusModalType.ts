// Define the interface for a single status
export interface Status {
    statusId: string;
    statusName: string;
    alias: string;
    deleted: string;
  }
  
  // Define the interface for the state
  export interface StatusState {
    statusList: Status[];
  }