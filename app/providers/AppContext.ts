import { createContext } from "react";

import type { GanttDataSource } from "@/contracts/gantt";

export type AppDependencies = {
  ganttDataSource: GanttDataSource;
};

const missingDependencyError = () => {
  throw new Error("AppProvider is required to access dependencies.");
};

const missingDependencies: AppDependencies = {
  ganttDataSource: {
    fetchTasks: missingDependencyError,
    updateTask: missingDependencyError,
  },
};

export const AppContext = createContext<AppDependencies>(missingDependencies);
