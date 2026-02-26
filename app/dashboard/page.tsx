"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type {
  SidebarNavigationState,
  SidebarVariant,
} from "@contracts/layout/sidebar";
import type {
  DashboardContractError,
  DashboardViewModel,
  DashboardViewRequest,
  SettingActionId,
} from "@contracts/pages/dashboard";
import { DashboardPage } from "@ui/pages/dashboard/DashboardPage";
import type { DashboardPageProps } from "@ui/pages/dashboard/DashboardPage";
import { useAppContext } from "@app/providers/AppContext";

const dashboardRequest: DashboardViewRequest = {
  route: "/dashboard",
  locale: "ja-JP",
  timezone: "Asia/Tokyo",
};

const emptyViewModel: DashboardViewModel = {
  header: {
    title: "",
    subtitle: "",
    searchPlaceholder: "",
    searchQuery: "",
    userName: "",
  },
  sidebar: {
    title: "",
    items: [],
  },
  projects: [],
  members: [],
  budgetSummary: {
    totalBudget: 0,
    totalActual: 0,
    executionRate: 0,
  },
  budgetSeries: [],
  settings: [],
};

type BuildDashboardPageParams = {
  viewModel: DashboardViewModel;
  sidebarState: SidebarNavigationState;
  searchQuery: string;
  isLoading: boolean;
  errorState?: DashboardContractError;
  onToggleSidebarVariant: (variant: SidebarVariant) => void;
  onSearchChange: (query: string) => void;
  onClickSetting: (actionId: SettingActionId) => void;
};

const buildDashboardPageProps = ({
  viewModel,
  sidebarState,
  searchQuery,
  isLoading,
  errorState,
  onToggleSidebarVariant,
  onSearchChange,
  onClickSetting,
}: BuildDashboardPageParams): DashboardPageProps => {
  return {
    header: viewModel.header,
    sidebar: viewModel.sidebar,
    sidebarVariant: sidebarState.variant,
    projects: viewModel.projects,
    members: viewModel.members,
    budgetSummary: viewModel.budgetSummary,
    budgetSeries: viewModel.budgetSeries,
    settings: viewModel.settings,
    searchQuery,
    isLoading,
    errorState,
    onToggleSidebarVariant,
    onSearchChange,
    onClickSetting,
  };
};

export default function DashboardPageBridge() {
  const { dashboardDataSource, sidebarState, toggleSidebarVariant } =
    useAppContext();
  const router = useRouter();
  const [viewModel, setViewModel] = useState<DashboardViewModel>(emptyViewModel);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState<
    DashboardContractError | undefined
  >(undefined);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleClickSetting = useCallback(
    (actionId: SettingActionId) => {
      void dashboardDataSource
        .resolveSettingAction(actionId)
        .then((result) => {
          router.push(result.href);
        })
        .catch(() => {
          setErrorState({
            code: "action_not_found",
            message: "設定アクションの取得に失敗しました。",
          });
        });
    },
    [dashboardDataSource, router],
  );

  useEffect(() => {
    let isActive = true;

    const loadDashboardView = async () => {
      setIsLoading(true);
      setErrorState(undefined);
      try {
        const response = await dashboardDataSource.getDashboardView(
          dashboardRequest,
        );
        if (!isActive) {
          return;
        }
        setViewModel(response);
        setSearchQuery(response.header.searchQuery);
        setErrorState(response.errorState);
      } catch {
        if (!isActive) {
          return;
        }
        setErrorState({
          code: "data_source_unavailable",
          message: "ダッシュボードの読み込みに失敗しました。",
        });
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadDashboardView();

    return () => {
      isActive = false;
    };
  }, [dashboardDataSource]);

  const pageProps = useMemo(
    () =>
      buildDashboardPageProps({
        viewModel,
        sidebarState,
        searchQuery,
        isLoading,
        errorState,
        onToggleSidebarVariant: toggleSidebarVariant,
        onSearchChange: handleSearchChange,
        onClickSetting: handleClickSetting,
      }),
    [
      errorState,
      handleClickSetting,
      handleSearchChange,
      isLoading,
      searchQuery,
      sidebarState,
      toggleSidebarVariant,
      viewModel,
    ],
  );

  return <DashboardPage {...pageProps} />;
}
