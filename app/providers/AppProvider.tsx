"use client";

import type { ReactNode } from "react";

import { AppContext } from "./AppContext";
import { createPublicGanttDataSource } from "./public/createPublicDeps";

export function AppProvider({ children }: { children: ReactNode }) {
  const deps = {
    ganttDataSource: createPublicGanttDataSource(),
  };

  return <AppContext.Provider value={deps}>{children}</AppContext.Provider>;
}
