export interface Task {
  id: number;
  title: string;
  status: Status;
  priority: Priority;
}

export enum Priority {
  High = "high",
  Low = "low",
  Medium = "medium",
  None = "none",
  Urgent = "urgent",
}

export enum Status {
  Completed = "completed",
  InProgress = "in_progress",
  NotStarted = "not_started",
}
