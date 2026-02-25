"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import type { SidebarNavigationState, SidebarVariant } from "@contracts/layout/sidebar";
import type { DashboardDataSource } from "@contracts/pages/dashboard";

export type AppBaseDeps = {
  dashboardDataSource: DashboardDataSource;
};

export type AppDeps = AppBaseDeps & {
  sidebarState: SidebarNavigationState;
  toggleSidebarVariant: (variant: SidebarVariant) => void;
};

const AppContext = createContext<AppDeps | null>(null);

type AppContextProviderProps = {
  deps: AppDeps;
  children: ReactNode;
};

export const AppContextProvider = ({
  deps,
  children,
}: AppContextProviderProps) => {
  return <AppContext.Provider value={deps}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContextが設定されていません。");
  }
  return context;
};
