import type {
  BudgetSeriesPoint,
  BudgetSummary,
  DashboardHeaderView,
  DashboardMemberItem,
  DashboardProjectItem,
  DashboardSidebarView,
  SettingAction,
} from "../types/dashboard";

export const sampleHeader: DashboardHeaderView = {
  title: "プロジェクト選択",
  subtitle: "プロジェクトを選択して作業を開始",
  searchPlaceholder: "プロジェクトを検索...",
  searchQuery: "",
  userName: "田中太郎",
  userAvatarUrl: "https://placehold.co/64x64",
};

export const sampleSidebar: DashboardSidebarView = {
  title: "メニュー",
  items: [
    { id: "projects", label: "プロジェクト", iconKey: "projects", active: true },
    { id: "members", label: "メンバー", iconKey: "members", active: false },
    { id: "reports", label: "集計", iconKey: "reports", active: false },
    { id: "settings", label: "設定", iconKey: "settings", active: false },
  ],
};

export const sampleProjects: DashboardProjectItem[] = [
  {
    id: "project-1",
    name: "ECサイトリニューアルプロジェクト",
    code: "PRJ-2024-001",
    status: "オープン",
    startDate: "2024年1月15日",
    members: [
      { name: "田中太郎", avatarUrl: "https://placehold.co/40x40" },
      { name: "佐藤花子", avatarUrl: "https://placehold.co/40x40" },
      { name: "鈴木一郎", avatarUrl: "https://placehold.co/40x40" },
      { name: "高橋美咲", avatarUrl: "https://placehold.co/40x40" },
    ],
  },
  {
    id: "project-2",
    name: "モバイルアプリ開発プロジェクト",
    code: "PRJ-2024-002",
    status: "オープン",
    startDate: "2024年2月1日",
    members: [
      { name: "山田次郎", avatarUrl: "https://placehold.co/40x40" },
      { name: "渡辺麻美", avatarUrl: "https://placehold.co/40x40" },
    ],
  },
  {
    id: "project-3",
    name: "社内システム統合プロジェクト",
    code: "PRJ-2024-003",
    status: "保守",
    startDate: "2024年3月10日",
    members: [
      { name: "小林優子", avatarUrl: "https://placehold.co/40x40" },
      { name: "加藤誠", avatarUrl: "https://placehold.co/40x40" },
      { name: "吉田理恵", avatarUrl: "https://placehold.co/40x40" },
    ],
  },
];

export const sampleMembers: DashboardMemberItem[] = [
  {
    id: "member-1",
    displayName: "田中太郎",
    avatarUrl: "https://placehold.co/80x80",
    role: "プロジェクトマネージャー",
    status: "稼働中",
    projectCount: 3,
  },
  {
    id: "member-2",
    displayName: "佐藤花子",
    avatarUrl: "https://placehold.co/80x80",
    role: "フロントエンドエンジニア",
    status: "稼働中",
    projectCount: 2,
  },
  {
    id: "member-3",
    displayName: "鈴木一郎",
    avatarUrl: "https://placehold.co/80x80",
    role: "バックエンドエンジニア",
    status: "待機中",
    projectCount: 1,
  },
  {
    id: "member-4",
    displayName: "高橋美咲",
    avatarUrl: "https://placehold.co/80x80",
    role: "UIデザイナー",
    status: "休暇中",
    projectCount: 4,
  },
];

export const sampleBudgetSummary: BudgetSummary = {
  totalBudget: 103_000_000,
  totalActual: 96_000_000,
  executionRate: 93.2,
};

export const sampleBudgetSeries: BudgetSeriesPoint[] = [
  { month: "1月", budget: 22000000, actual: 16000000 },
  { month: "2月", budget: 16500000, actual: 14000000 },
  { month: "3月", budget: 11000000, actual: 9000000 },
  { month: "4月", budget: 8000000, actual: 7200000 },
  { month: "5月", budget: 5000000, actual: 4600000 },
  { month: "6月", budget: 4200000, actual: 3800000 },
];

export const sampleSettings: SettingAction[] = [
  {
    id: "project-settings",
    label: "プロジェクト設定",
    description: "基本情報や期限を設定",
    iconKey: "project-settings",
  },
  {
    id: "member-management",
    label: "メンバー管理",
    description: "チームメンバーの追加・編集",
    iconKey: "member-management",
  },
  {
    id: "notification-settings",
    label: "通知設定",
    description: "通知の受信設定を調整",
    iconKey: "notification-settings",
  },
  {
    id: "security",
    label: "セキュリティ",
    description: "アクセス権限と監査ログ",
    iconKey: "security",
  },
  {
    id: "permission",
    label: "権限管理",
    description: "ロールと権限の管理",
    iconKey: "permission",
  },
  {
    id: "display",
    label: "表示設定",
    description: "テーマやレイアウトを調整",
    iconKey: "display",
  },
  {
    id: "export",
    label: "データエクスポート",
    description: "CSVやレポートを出力",
    iconKey: "export",
  },
  {
    id: "system",
    label: "システム設定",
    description: "全体設定の確認",
    iconKey: "system",
  },
];
