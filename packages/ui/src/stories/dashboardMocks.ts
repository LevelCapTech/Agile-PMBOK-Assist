import type {
  BudgetSeriesPoint,
  BudgetSummary,
  DashboardHeaderView,
  DashboardMemberItem,
  DashboardProjectItem,
  DashboardSidebarView,
  SettingAction,
} from "@contracts/pages/dashboard";

export const mockHeader: DashboardHeaderView = {
  title: "ダッシュボード",
  subtitle: "プロジェクト状況を俯瞰",
  searchPlaceholder: "プロジェクトを検索...",
  searchQuery: "",
  userName: "ユーザー",
  userAvatarUrl: "https://i.pravatar.cc/80?img=12",
};

export const mockSidebar: DashboardSidebarView = {
  title: "メニュー",
  items: [
    { id: "projects", label: "プロジェクト", iconKey: "project", active: true },
    { id: "members", label: "メンバー", iconKey: "members", active: false },
    { id: "stats", label: "統計", iconKey: "stats", active: false },
    { id: "settings", label: "設定", iconKey: "settings", active: false },
  ],
};

export const mockProjects: DashboardProjectItem[] = [
  {
    id: "p1",
    name: "ECサイトリニューアルプロジェクト",
    code: "PRJ-2024-001",
    status: "オープン",
    startDate: "2024年1月15日",
    members: [
      { name: "田中太郎", avatarUrl: "https://i.pravatar.cc/80?img=13" },
      { name: "佐藤花子", avatarUrl: "https://i.pravatar.cc/80?img=14" },
    ],
  },
  {
    id: "p2",
    name: "モバイルアプリ開発プロジェクト",
    code: "PRJ-2024-002",
    status: "オープン",
    startDate: "2024年2月1日",
    members: [{ name: "鈴木一郎", avatarUrl: "https://i.pravatar.cc/80?img=15" }],
  },
];

export const mockMembers: DashboardMemberItem[] = [
  {
    id: "m1",
    displayName: "田中太郎",
    avatarUrl: "https://i.pravatar.cc/100?img=16",
    role: "プロジェクトマネージャー",
    status: "稼働中",
    projectCount: 3,
  },
  {
    id: "m2",
    displayName: "佐藤花子",
    avatarUrl: "https://i.pravatar.cc/100?img=17",
    role: "フロントエンドエンジニア",
    status: "待機中",
    projectCount: 2,
  },
];

export const mockBudgetSummary: BudgetSummary = {
  totalBudget: 103,
  totalActual: 96,
  executionRate: 93.2,
};

export const mockBudgetSeries: BudgetSeriesPoint[] = [
  { month: "1月", budget: 20, actual: 18 },
  { month: "2月", budget: 18, actual: 17 },
  { month: "3月", budget: 15, actual: 14 },
];

export const mockSettings: SettingAction[] = [
  {
    id: "project-settings",
    label: "プロジェクト設定",
    description: "プロジェクトの基本情報を設定",
    iconKey: "project",
  },
  {
    id: "member-management",
    label: "メンバー管理",
    description: "メンバーの追加・編集・削除",
    iconKey: "members",
  },
  {
    id: "notification-settings",
    label: "通知設定",
    description: "通知の受信設定を調整",
    iconKey: "notification",
  },
  {
    id: "security",
    label: "セキュリティ",
    description: "パスワードやアクセス制御",
    iconKey: "security",
  },
  {
    id: "permission",
    label: "権限管理",
    description: "ユーザー権限を設定",
    iconKey: "permission",
  },
  {
    id: "display",
    label: "表示設定",
    description: "テーマとレイアウト",
    iconKey: "display",
  },
  {
    id: "export",
    label: "データエクスポート",
    description: "CSV出力",
    iconKey: "export",
  },
  {
    id: "system",
    label: "システム設定",
    description: "システム全般を調整",
    iconKey: "system",
  },
];
