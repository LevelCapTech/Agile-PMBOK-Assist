import type { ReactNode } from "react";

export interface UiError {
  code: string;
  message: string;
}

export interface IconResolver {
  (iconKey: string): ReactNode;
}

export interface DashboardHeaderView {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  searchQuery: string;
  userName: string;
  userAvatarUrl?: string;
}

export interface SidebarNavItem {
  id: string;
  label: string;
  iconKey: string;
  active: boolean;
}

export interface DashboardSidebarView {
  title: string;
  items: SidebarNavItem[];
}

export interface DashboardProjectItem {
  id: string;
  name: string;
  code: string;
  status: "見積" | "商談" | "オープン" | "保守" | "クローズ";
  startDate: string;
  members: Array<{ name: string; avatarUrl?: string }>;
}

export interface DashboardMemberItem {
  id: string;
  displayName: string;
  avatarUrl?: string;
  role: string;
  status: "稼働中" | "待機中" | "休暇中";
  projectCount: number;
}

export interface BudgetSummary {
  totalBudget: number;
  totalActual: number;
  executionRate: number;
}

export interface BudgetSeriesPoint {
  month: string;
  budget: number;
  actual: number;
}

export type SettingActionId =
  | "project-settings"
  | "member-management"
  | "notification-settings"
  | "security"
  | "permission"
  | "display"
  | "export"
  | "system";

export interface SettingAction {
  id: SettingActionId;
  label: string;
  description: string;
  iconKey: string;
  disabled?: boolean;
}

// 参考情報（ページ統合用）
export interface DashboardViewModel {
  header: DashboardHeaderView;
  sidebar: DashboardSidebarView;
  projects: DashboardProjectItem[];
  members: DashboardMemberItem[];
  budgetSummary: BudgetSummary;
  budgetSeries: BudgetSeriesPoint[];
  settings: SettingAction[];
  errorState?: UiError;
}

export interface LcIconProps {
  iconKey: string;
  size?: "sm" | "md" | "lg";
}

export interface LcIconButtonProps {
  iconKey: string;
  label: string;
  tone?: "primary" | "success" | "warning" | "error" | "neutral";
  disabled?: boolean;
  onClick?: () => void;
}

export interface LcAvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
}

export interface LcStatusChipProps {
  status: string;
  tone?: "primary" | "success" | "warning" | "error" | "neutral";
}

export interface LcSectionTitleProps {
  title: string;
  description?: string;
}

export interface LcMetricValueProps {
  value: number;
  unit?: string;
  tone?: "primary" | "success" | "warning" | "error" | "neutral";
}

export interface ProjectListItemProps {
  item: DashboardProjectItem;
  onSelect?: (projectId: string) => void;
}

export interface MemberListItemProps {
  item: DashboardMemberItem;
}

export interface BudgetSummaryCardProps {
  label: string;
  value: number;
  tone: "primary" | "success" | "warning";
}

export interface SettingActionButtonProps {
  action: SettingAction;
  disabled?: boolean;
  onClick?: (actionId: SettingActionId) => void;
}

export interface DashboardHeaderProps {
  header: DashboardHeaderView;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export interface SidebarNavigationProps {
  sidebar: DashboardSidebarView;
}

export interface ProjectListPanelProps {
  title: string;
  projects: DashboardProjectItem[];
  isLoading?: boolean;
  error?: UiError;
  onSelectProject?: (projectId: string) => void;
}

export interface MemberListPanelProps {
  title: string;
  members: DashboardMemberItem[];
  isLoading?: boolean;
  error?: UiError;
}

export interface BudgetExecutionPanelProps {
  title: string;
  summary: BudgetSummary;
  series: BudgetSeriesPoint[];
  isLoading?: boolean;
  error?: UiError;
}

export interface SettingsActionPanelProps {
  title: string;
  settings: SettingAction[];
  isLoading?: boolean;
  error?: UiError;
  onClickSetting?: (actionId: SettingActionId) => void;
}

export interface DashboardLayoutTemplateProps {
  header: ReactNode;
  sidebar: ReactNode;
  main: ReactNode;
}
