"use client";

import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import type { ReactNode } from "react";

import { createClientDeps } from "@app/lib/createClientDeps";

import { AppContextProvider } from "./AppContext";
import { appTheme } from "./appTheme";

type AppProviderProps = {
  children: ReactNode;
  enableAppRouterCache?: boolean;
};

export const AppProvider = ({
  children,
  enableAppRouterCache = true,
}: AppProviderProps) => {
  const deps = useMemo(() => createClientDeps(), []);
  const content = (
    <AppContextProvider deps={deps}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContextProvider>
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
