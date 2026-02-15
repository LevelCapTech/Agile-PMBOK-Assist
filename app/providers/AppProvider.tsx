"use client";

import { useMemo, type ReactNode } from "react";

import { AppContext } from "./AppContext";
import { createPublicGanttDataSource } from "./public/createPublicDeps";

export function AppProvider({ children }: { children: ReactNode }) {
  const deps = useMemo(
    () => ({
      ganttDataSource: createPublicGanttDataSource(),
    }),
    [],
  );

  return <AppContext.Provider value={deps}>{children}</AppContext.Provider>;
}
