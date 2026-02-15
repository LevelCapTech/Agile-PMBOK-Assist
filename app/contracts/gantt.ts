export interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
}

export interface GanttDataSource {
  fetchTasks(): Promise<Task[]>;
  updateTask(task: Task): Promise<void>;
}
