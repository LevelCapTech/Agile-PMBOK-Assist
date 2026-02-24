"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

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
  searchQuery: string;
  isLoading: boolean;
  errorState?: DashboardContractError;
  onSearchChange: (query: string) => void;
  onClickSetting: (actionId: SettingActionId) => void;
};

const buildDashboardPageProps = ({
  viewModel,
  searchQuery,
  isLoading,
  errorState,
  onSearchChange,
  onClickSetting,
}: BuildDashboardPageParams): DashboardPageProps => {
  return {
    header: viewModel.header,
    sidebar: viewModel.sidebar,
    projects: viewModel.projects,
    members: viewModel.members,
    budgetSummary: viewModel.budgetSummary,
    budgetSeries: viewModel.budgetSeries,
    settings: viewModel.settings,
    searchQuery,
    isLoading,
    errorState,
    onSearchChange,
    onClickSetting,
  };
};

export default function DashboardPageBridge() {
  const { dashboardDataSource } = useAppContext();
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
      void dashboardDataSource.resolveSettingAction(actionId).catch(() => {
        setErrorState({
          code: "action_not_found",
          message: "設定アクションの取得に失敗しました。",
        });
      });
    },
    [dashboardDataSource],
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
        searchQuery,
        isLoading,
        errorState,
        onSearchChange: handleSearchChange,
        onClickSetting: handleClickSetting,
      }),
    [
      errorState,
      handleClickSetting,
      handleSearchChange,
      isLoading,
      searchQuery,
      viewModel,
    ],
  );

  return <DashboardPage {...pageProps} />;
}
