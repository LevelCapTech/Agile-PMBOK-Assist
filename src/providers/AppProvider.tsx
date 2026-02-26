"use client";

import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";

import { createClientDeps } from "@app/lib/createClientDeps";
import type {
  SidebarNavigationState,
  SidebarPreferenceError,
  SidebarPreferenceResult,
  SidebarPreferencesStore,
  SidebarVariant,
} from "@contracts/layout/sidebar";

import type { AppDeps } from "./AppContext";
import { AppContextProvider } from "./AppContext";
import { appTheme } from "./appTheme";

type AppProviderProps = {
  children: ReactNode;
  enableAppRouterCache?: boolean;
};

const sidebarStorageKey = "lc.sidebar.variant";

const isSidebarVariant = (value: string | null): value is SidebarVariant => {
  return value === "expanded" || value === "rail";
};

const buildPreferenceError = (
  code: SidebarPreferenceError["code"],
  message: string,
): SidebarPreferenceError => {
  return { code, message };
};

const buildSidebarState = (
  result: SidebarPreferenceResult,
): SidebarNavigationState => {
  return { variant: result.variant };
};

const createSidebarPreferencesStore = (
  storageKey: string,
): SidebarPreferencesStore => {
  return {
    loadSidebarVariant: () => {
      try {
        const storedVariant = localStorage.getItem(storageKey);
        if (!storedVariant) {
          return { variant: "expanded", source: "default" };
        }
        if (!isSidebarVariant(storedVariant)) {
          return {
            variant: "expanded",
            source: "default",
            error: buildPreferenceError(
              "invalid_variant",
              "サイドバー状態の値が不正です。",
            ),
          };
        }
        return { variant: storedVariant, source: "storage" };
      } catch {
        return {
          variant: "expanded",
          source: "default",
          error: buildPreferenceError(
            "storage_unavailable",
            "サイドバー状態の取得に失敗しました。",
          ),
        };
      }
    },
    saveSidebarVariant: (variant) => {
      if (!isSidebarVariant(variant)) {
        return buildPreferenceError(
          "invalid_variant",
          "サイドバー状態の値が不正です。",
        );
      }
      try {
        localStorage.setItem(storageKey, variant);
        return null;
      } catch {
        return buildPreferenceError(
          "storage_unavailable",
          "サイドバー状態の保存に失敗しました。",
        );
      }
    },
  };
};

export const AppProvider = ({
  children,
  enableAppRouterCache = true,
}: AppProviderProps) => {
  const sidebarPreferencesStore = useMemo(
    () => createSidebarPreferencesStore(sidebarStorageKey),
    [],
  );
  const [sidebarState, setSidebarState] = useState<SidebarNavigationState>(() => {
    const result = sidebarPreferencesStore.loadSidebarVariant();
    if (result.error?.code === "storage_unavailable") {
      console.warn("SidebarPreferenceErrorCode", result.error.code);
    }
    return buildSidebarState(result);
  });
  const toggleSidebarVariant = useCallback(
    (variant: SidebarVariant) => {
      setSidebarState((currentState) => {
        const saveError = sidebarPreferencesStore.saveSidebarVariant(variant);
        if (!saveError) {
          return { variant };
        }
        if (saveError.code === "storage_unavailable") {
          console.warn("SidebarPreferenceErrorCode", saveError.code);
        }
        return currentState;
      });
    },
    [sidebarPreferencesStore],
  );
  const baseDeps = createClientDeps();
  const deps: AppDeps = {
    ...baseDeps,
    sidebarState,
    toggleSidebarVariant,
  };
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
