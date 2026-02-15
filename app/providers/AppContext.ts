import { createContext } from "react";

import type { GanttDataSource } from "@/contracts/gantt";

export type AppDependencies = {
  ganttDataSource: GanttDataSource;
};

export const AppContext = createContext<AppDependencies | null>(null);
