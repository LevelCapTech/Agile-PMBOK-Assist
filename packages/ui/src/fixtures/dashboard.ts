import type {
  BudgetSeriesPoint,
  BudgetSummary,
  DashboardHeaderView,
  DashboardMemberItem,
  DashboardProjectItem,
  DashboardSidebarView,
  SettingAction,
} from "@contracts/pages/dashboard";

export const sampleHeader: DashboardHeaderView = {
  title: "プロジェクト選択",
  subtitle: "プロジェクトを選択して作業を開始",
  searchPlaceholder: "プロジェクトを検索...",
  searchQuery: "",
  userName: "ユーザー",
  userAvatarUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
};

export const sampleSidebar: DashboardSidebarView = {
  title: "メニュー",
  items: [
    { id: "projects", label: "プロジェクト", iconKey: "folder", active: true },
    { id: "members", label: "メンバー", iconKey: "users", active: false },
    { id: "stats", label: "統計", iconKey: "chart", active: false },
    { id: "settings", label: "設定", iconKey: "settings", active: false },
  ],
};

export const sampleProjects: DashboardProjectItem[] = [
  {
    id: "project-1",
    name: "ECサイトリニューアルプロジェクト",
    code: "PRJ-2024-001",
    status: "オープン",
    startDate: "2024-01-15",
    members: [
      {
        name: "田中太郎",
        avatarUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "佐藤花子",
        avatarUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "鈴木一郎",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "高橋美咲",
        avatarUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "伊藤健太",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
  {
    id: "project-2",
    name: "モバイルアプリ開発プロジェクト",
    code: "PRJ-2024-002",
    status: "商談",
    startDate: "2024-02-01",
    members: [
      {
        name: "山田次郎",
        avatarUrl:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "渡辺麻美",
        avatarUrl:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
      },
    ],
  },
];

export const sampleMembers: DashboardMemberItem[] = [
  {
    id: "member-1",
    displayName: "田中太郎",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    role: "プロジェクトマネージャー",
    status: "稼働中",
    projectCount: 3,
  },
  {
    id: "member-2",
    displayName: "佐藤花子",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face",
    role: "デザイナー",
    status: "待機中",
    projectCount: 1,
  },
  {
    id: "member-3",
    displayName: "鈴木一郎",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    role: "エンジニア",
    status: "休暇中",
    projectCount: 0,
  },
  {
    id: "member-4",
    displayName: "高橋美咲",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    role: "QA",
    status: "稼働中",
    projectCount: 2,
  },
];

export const sampleBudgetSummary: BudgetSummary = {
  totalBudget: 103000000,
  totalActual: 96000000,
  executionRate: 93.2,
};

export const sampleBudgetSeries: BudgetSeriesPoint[] = [
  { month: "1月", budget: 12000000, actual: 11000000 },
  { month: "2月", budget: 15000000, actual: 14000000 },
  { month: "3月", budget: 18000000, actual: 17000000 },
  { month: "4月", budget: 16000000, actual: 15200000 },
  { month: "5月", budget: 20000000, actual: 18500000 },
  { month: "6月", budget: 22000000, actual: 19800000 },
];

export const sampleSettings: SettingAction[] = [
  {
    id: "project-settings",
    label: "プロジェクト設定",
    description: "プロジェクトの基本情報や期限を設定",
    iconKey: "settings",
  },
  {
    id: "member-management",
    label: "メンバー管理",
    description: "チームメンバーの追加・編集・削除",
    iconKey: "users",
  },
  {
    id: "notification-settings",
    label: "通知設定",
    description: "通知の受信設定とタイミングを調整",
    iconKey: "bell",
  },
  {
    id: "security",
    label: "セキュリティ",
    description: "パスワードや二段階認証の設定",
    iconKey: "shield",
  },
  {
    id: "permission",
    label: "権限管理",
    description: "ユーザーの役割と権限を設定",
    iconKey: "lock",
  },
  {
    id: "display",
    label: "表示設定",
    description: "テーマやレイアウトのカスタマイズ",
    iconKey: "eye",
  },
  {
    id: "export",
    label: "データエクスポート",
    description: "プロジェクトデータをCSVで出力",
    iconKey: "download",
  },
  {
    id: "system",
    label: "システム設定",
    description: "全般的なシステム環境を調整",
    iconKey: "sliders",
    disabled: true,
  },
];
