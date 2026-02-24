import type { AppDeps } from "@app/providers/AppContext";
import type {
  DashboardContractError,
  DashboardDataSource,
  DashboardViewModel,
} from "@contracts/pages/dashboard";

const dashboardViewModel: DashboardViewModel = {
  header: {
    title: "プロジェクト選択",
    subtitle: "プロジェクトを選択して作業を開始",
    searchPlaceholder: "プロジェクトを検索...",
    searchQuery: "",
    userName: "ユーザー",
    userAvatarUrl:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=48&h=48&fit=crop&crop=face",
  },
  sidebar: {
    title: "メニュー",
    items: [
      { id: "projects", label: "プロジェクト", iconKey: "folder", active: true },
      { id: "members", label: "メンバー", iconKey: "users", active: false },
      { id: "reports", label: "統計", iconKey: "chart", active: false },
      { id: "settings", label: "設定", iconKey: "settings", active: false },
    ],
  },
  projects: [
    {
      id: "prj-1",
      name: "ECサイトリニューアルプロジェクト",
      code: "PRJ-2024-001",
      status: "オープン",
      startDate: "2024年1月15日",
      members: [
        { name: "田中太郎" },
        { name: "佐藤花子" },
        { name: "鈴木一郎" },
        { name: "高橋美咲" },
        { name: "伊藤健太" },
      ],
    },
    {
      id: "prj-2",
      name: "モバイルアプリ開発プロジェクト",
      code: "PRJ-2024-002",
      status: "オープン",
      startDate: "2024年2月1日",
      members: [
        { name: "山田次郎" },
        { name: "渡辺麻美" },
        { name: "中村大輔" },
      ],
    },
    {
      id: "prj-3",
      name: "社内システム統合プロジェクト",
      code: "PRJ-2024-003",
      status: "保守",
      startDate: "2024年3月10日",
      members: [
        { name: "小林優子" },
        { name: "加藤誠" },
        { name: "吉田理恵" },
        { name: "森田健" },
      ],
    },
  ],
  members: [
    {
      id: "member-1",
      displayName: "田中太郎",
      role: "プロジェクトマネージャー",
      status: "稼働中",
      projectCount: 3,
    },
    {
      id: "member-2",
      displayName: "佐藤花子",
      role: "フロントエンドエンジニア",
      status: "稼働中",
      projectCount: 2,
    },
    {
      id: "member-3",
      displayName: "鈴木一郎",
      role: "バックエンドエンジニア",
      status: "待機中",
      projectCount: 1,
    },
    {
      id: "member-4",
      displayName: "高橋美咲",
      role: "UIデザイナー",
      status: "稼働中",
      projectCount: 4,
    },
    {
      id: "member-5",
      displayName: "伊藤健太",
      role: "フルスタックエンジニア",
      status: "休暇中",
      projectCount: 0,
    },
    {
      id: "member-6",
      displayName: "山田次郎",
      role: "データアナリスト",
      status: "稼働中",
      projectCount: 2,
    },
    {
      id: "member-7",
      displayName: "渡辺麻美",
      role: "QAエンジニア",
      status: "待機中",
      projectCount: 1,
    },
    {
      id: "member-8",
      displayName: "中村大輔",
      role: "セキュリティエンジニア",
      status: "稼働中",
      projectCount: 2,
    },
  ],
  budgetSummary: {
    totalBudget: 103000000,
    totalActual: 96000000,
    executionRate: 93.2,
  },
  budgetSeries: [
    { month: "1月", budget: 22000000, actual: 16500000 },
    { month: "2月", budget: 16500000, actual: 15000000 },
    { month: "3月", budget: 11000000, actual: 10000000 },
    { month: "4月", budget: 5500000, actual: 5000000 },
    { month: "5月", budget: 0, actual: 0 },
    { month: "6月", budget: 0, actual: 0 },
  ],
  settings: [
    {
      id: "project-settings",
      label: "プロジェクト設定",
      description: "プロジェクトの基本情報や権限を設定",
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
      description: "パスワードや権限設定の管理",
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
      iconKey: "display",
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
  ],
};

const dashboardDataSource: DashboardDataSource = {
  getDashboardView: async (input) => {
    void input;
    return dashboardViewModel;
  },
  resolveSettingAction: async (actionId) => {
    const target = dashboardViewModel.settings.find(
      (setting) => setting.id === actionId,
    );
    if (!target) {
      const error: DashboardContractError = {
        code: "action_not_found",
        message: "設定アクションが見つかりません。",
      };
      return Promise.reject(error);
    }
    return {
      href: `/settings/${actionId}`,
      label: target.label,
    };
  },
};

const clientDeps: AppDeps = {
  dashboardDataSource,
};

export const createClientDeps = (): AppDeps => {
  return clientDeps;
};
