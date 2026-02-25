import type { ReactNode } from "react";

/**
 * ダッシュボード画面の契約エラーコード。
 * - `invalid_data`: 入力や取得データが不正。
 * - `data_source_unavailable`: データソースに到達できない。
 * - `action_not_found`: 設定アクションが未定義。
 */
export type DashboardContractErrorCode =
  | "invalid_data"
  | "data_source_unavailable"
  | "action_not_found";

/** ダッシュボード画面で扱うエラー情報。 */
export interface DashboardContractError {
  /** エラーコード。 */
  code: DashboardContractErrorCode;
  /** 表示・ログ用のメッセージ。 */
  message: string;
}

/** UI 側に渡すエラー型（Dashboard 契約に準拠）。 */
export type UiError = DashboardContractError;

/** ダッシュボード表示の取得条件。 */
export interface DashboardViewRequest {
  /** 画面ルート（例: `/dashboard`）。 */
  route: string;
  /** ロケール（例: `ja-JP`）。 */
  locale: string;
  /** タイムゾーン（例: `Asia/Tokyo`）。 */
  timezone: string;
}

/** アイコンキーから ReactNode を解決する関数。 */
export interface IconResolver {
  /** 指定キーのアイコンを返す。 */
  (iconKey: string): ReactNode;
}

/** ヘッダーの表示情報。 */
export interface DashboardHeaderView {
  /** 画面タイトル。 */
  title: string;
  /** サブタイトル。 */
  subtitle: string;
  /** 検索入力のプレースホルダー。 */
  searchPlaceholder: string;
  /** 現在の検索クエリ。 */
  searchQuery: string;
  /** 表示ユーザー名。 */
  userName: string;
  /** ユーザーアバターURL（任意）。 */
  userAvatarUrl?: string;
}

/** サイドバーのナビ項目。 */
export interface SidebarNavItem {
  /** 項目ID。 */
  id: string;
  /** 表示ラベル。 */
  label: string;
  /** アイコンキー。 */
  iconKey: string;
  /** 現在選択中かどうか。 */
  active: boolean;
}

/** サイドバー全体の表示情報。 */
export interface DashboardSidebarView {
  /** サイドバー見出し。 */
  title: string;
  /** ナビゲーション項目一覧。 */
  items: SidebarNavItem[];
}

/** プロジェクト一覧の行データ。 */
export interface DashboardProjectItem {
  /** プロジェクトID。 */
  id: string;
  /** プロジェクト名。 */
  name: string;
  /** 管理コード/案件コード。 */
  code: string;
  /** ステータス。 */
  status: "見積" | "商談" | "オープン" | "保守" | "クローズ";
  /** 開始日（表示に使う日付文字列）。 */
  startDate: string;
  /** 参加メンバー一覧。 */
  members: Array<{
    /** メンバー表示名。 */
    name: string;
    /** アバターURL（任意）。 */
    avatarUrl?: string;
  }>;
}

/** メンバー一覧の行データ。 */
export interface DashboardMemberItem {
  /** メンバーID。 */
  id: string;
  /** 表示名。 */
  displayName: string;
  /** アバターURL（任意）。 */
  avatarUrl?: string;
  /** 役割/職種。 */
  role: string;
  /** 稼働ステータス。 */
  status: "稼働中" | "待機中" | "休暇中";
  /** 参加中プロジェクト数。 */
  projectCount: number;
}

/** 予算実績のサマリー。 */
export interface BudgetSummary {
  /** 予算合計。 */
  totalBudget: number;
  /** 実績合計。 */
  totalActual: number;
  /** 執行率（表示用の比率/割合値）。 */
  executionRate: number;
}

/** 月次の予算・実績ポイント。 */
export interface BudgetSeriesPoint {
  /** 月ラベル。 */
  month: string;
  /** 月次予算。 */
  budget: number;
  /** 月次実績。 */
  actual: number;
}

/**
 * 設定画面のアクションID。
 * - `project-settings`: プロジェクト設定
 * - `member-management`: メンバー管理
 * - `notification-settings`: 通知設定
 * - `security`: セキュリティ
 * - `permission`: 権限
 * - `display`: 表示
 * - `export`: エクスポート
 * - `system`: システム
 */
export type SettingActionId =
  | "project-settings"
  | "member-management"
  | "notification-settings"
  | "security"
  | "permission"
  | "display"
  | "export"
  | "system";

/** 設定アクションの表示情報。 */
export interface SettingAction {
  /** アクションID。 */
  id: SettingActionId;
  /** 表示ラベル。 */
  label: string;
  /** 説明文。 */
  description: string;
  /** アイコンキー。 */
  iconKey: string;
  /** 無効化されているか。 */
  disabled?: boolean;
}

/** 設定アクションの遷移先情報。 */
export interface SettingActionResult {
  /** 遷移先URL。 */
  href: string;
  /** 遷移先の表示ラベル。 */
  label: string;
}

/** ダッシュボード画面の表示モデル。 */
export interface DashboardViewModel {
  /** ヘッダー表示情報。 */
  header: DashboardHeaderView;
  /** サイドバー表示情報。 */
  sidebar: DashboardSidebarView;
  /** プロジェクト一覧。 */
  projects: DashboardProjectItem[];
  /** メンバー一覧。 */
  members: DashboardMemberItem[];
  /** 予算サマリー。 */
  budgetSummary: BudgetSummary;
  /** 予算/実績の推移。 */
  budgetSeries: BudgetSeriesPoint[];
  /** 設定アクション一覧。 */
  settings: SettingAction[];
  /** 画面全体のエラー状態（任意）。 */
  errorState?: DashboardContractError;
}

/** ダッシュボード画面のデータ取得契約。 */
export interface DashboardDataSource {
  /** 表示に必要なデータを取得する。 */
  getDashboardView(input: DashboardViewRequest): Promise<DashboardViewModel>;
  /** 設定アクションの遷移先を解決する。 */
  resolveSettingAction(actionId: SettingActionId): Promise<SettingActionResult>;
}

/** アイコンコンポーネントのプロパティ。 */
export interface LcIconProps {
  /** アイコンキー。 */
  iconKey: string;
  /** サイズ。 */
  size?: "sm" | "md" | "lg";
}

/** アイコン付きボタンのプロパティ。 */
export interface LcIconButtonProps {
  /** アイコンキー。 */
  iconKey: string;
  /** ボタンラベル。 */
  label: string;
  /** 表示トーン。 */
  tone?: "primary" | "success" | "warning" | "error" | "neutral";
  /** 無効化されているか。 */
  disabled?: boolean;
  /** クリック時コールバック。 */
  onClick?: () => void;
}

/** プロジェクトコード表示のプロパティ。 */
export interface LcProjectCodeProps {
  /** 表示するプロジェクトコード。 */
  code: string;
}

/** アバター表示のプロパティ。 */
export interface LcAvatarProps {
  /** 画像URL（任意）。 */
  src?: string;
  /** 代替テキスト。 */
  alt: string;
  /** サイズ。 */
  size?: "sm" | "md" | "lg";
}

/** ステータスチップのプロパティ。 */
export interface LcStatusChipProps {
  /** 表示ステータス文字列。 */
  status: string;
  /** 表示トーン。 */
  tone?: "primary" | "success" | "warning" | "error" | "neutral";
}

/** セクション見出しのプロパティ。 */
export interface LcSectionTitleProps {
  /** タイトル。 */
  title: string;
  /** 補足説明（任意）。 */
  description?: string;
}

/** 指標値表示のプロパティ。 */
export interface LcMetricValueProps {
  /** 数値。 */
  value: number;
  /** 単位（任意）。 */
  unit?: string;
  /** 表示トーン。 */
  tone?: "primary" | "success" | "warning" | "error" | "neutral";
}

/** プロジェクト一覧の行コンポーネントのプロパティ。 */
export interface ProjectListItemProps {
  /** 表示対象のプロジェクト。 */
  item: DashboardProjectItem;
  /** 行選択時のコールバック（任意）。 */
  onSelect?: (projectId: string) => void;
}

/** メンバー一覧の行コンポーネントのプロパティ。 */
export interface MemberListItemProps {
  /** 表示対象のメンバー。 */
  item: DashboardMemberItem;
}

/** 予算サマリーカードのプロパティ。 */
export interface BudgetSummaryCardProps {
  /** ラベル。 */
  label: string;
  /** 表示値。 */
  value: number;
  /** 表示トーン。 */
  tone: "primary" | "success" | "warning";
}

/** 設定アクションボタンのプロパティ。 */
export interface SettingActionButtonProps {
  /** 設定アクション。 */
  action: SettingAction;
  /** ボタンの無効化。 */
  disabled?: boolean;
  /** クリック時コールバック。 */
  onClick?: (actionId: SettingActionId) => void;
}

/** ダッシュボードヘッダーのプロパティ。 */
export interface DashboardHeaderProps {
  /** 表示するヘッダー情報。 */
  header: DashboardHeaderView;
  /** 検索クエリ（表示用）。 */
  searchQuery: string;
  /** 検索クエリ変更時のコールバック。 */
  onSearchChange: (query: string) => void;
}

/** サイドバーのナビゲーションコンポーネントのプロパティ。 */
export interface SidebarNavigationProps {
  /** 表示するサイドバー情報。 */
  sidebar: DashboardSidebarView;
  /** 項目選択時のコールバック（任意）。 */
  onNavigate?: (targetId: string) => void;
}

/** プロジェクト一覧パネルのプロパティ。 */
export interface ProjectListPanelProps {
  /** パネルタイトル。 */
  title: string;
  /** 表示するプロジェクト一覧。 */
  projects: DashboardProjectItem[];
  /** ローディング中か。 */
  isLoading?: boolean;
  /** エラー状態（任意）。 */
  error?: UiError;
  /** 行選択時のコールバック（任意）。 */
  onSelectProject?: (projectId: string) => void;
}

/** メンバー一覧パネルのプロパティ。 */
export interface MemberListPanelProps {
  /** パネルタイトル。 */
  title: string;
  /** 表示するメンバー一覧。 */
  members: DashboardMemberItem[];
  /** ローディング中か。 */
  isLoading?: boolean;
  /** エラー状態（任意）。 */
  error?: UiError;
}

/** 予算執行パネルのプロパティ。 */
export interface BudgetExecutionPanelProps {
  /** パネルタイトル。 */
  title: string;
  /** 予算サマリー。 */
  summary: BudgetSummary;
  /** 予算/実績の推移。 */
  series: BudgetSeriesPoint[];
  /** ローディング中か。 */
  isLoading?: boolean;
  /** エラー状態（任意）。 */
  error?: UiError;
}

/** 設定アクションパネルのプロパティ。 */
export interface SettingsActionPanelProps {
  /** パネルタイトル。 */
  title: string;
  /** 表示する設定アクション。 */
  settings: SettingAction[];
  /** ローディング中か。 */
  isLoading?: boolean;
  /** エラー状態（任意）。 */
  error?: UiError;
  /** アクション選択時のコールバック（任意）。 */
  onClickSetting?: (actionId: SettingActionId) => void;
}

/** ダッシュボードレイアウトテンプレートのプロパティ。 */
export interface DashboardLayoutTemplateProps {
  /** ヘッダー領域。 */
  header: ReactNode;
  /** サイドバー領域。 */
  sidebar: ReactNode;
  /** メインコンテンツ領域。 */
  main: ReactNode;
}
