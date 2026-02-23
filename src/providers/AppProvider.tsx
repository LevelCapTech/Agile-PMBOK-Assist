"use client";

import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

import { IconResolverProvider } from "@ui/contexts/IconResolverContext";

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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <IconResolverProvider
          resolver={(iconKey) => (
            <span aria-hidden data-testid={`app-icon-${iconKey}`}>
              {iconKey.slice(0, 1).toUpperCase()}
            </span>
          )}
        >
          {children}
        </IconResolverProvider>
      </ThemeProvider>
    </StyledEngineProvider>
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
