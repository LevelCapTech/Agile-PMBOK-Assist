"use client";

import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

import { appTheme } from "./appTheme";

type AppProviderProps = {
  children: ReactNode;
  enableAppRouterCache?: boolean;
};

export const AppProvider = ({
  children,
  enableAppRouterCache = true,
}: AppProviderProps) => {
  const content = (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );

  if (!enableAppRouterCache) {
    return content;
  }

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      {content}
    </AppRouterCacheProvider>
  );
};
