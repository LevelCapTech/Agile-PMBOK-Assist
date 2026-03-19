import type {
  OverallProgress,
  ProjectDetailsDataSource,
  ProjectDetailsError,
  ProjectDetailsErrorCode,
  ProjectDetailsPageData,
  ProjectPhase,
} from "@contracts/pages/project-details";

const buildError = (
  code: ProjectDetailsErrorCode,
  message: string,
): ProjectDetailsError => {
  return { code, message };
};

const errorMessages: Record<ProjectDetailsErrorCode, string> = {
  NOT_FOUND: "プロジェクトが見つかりません。",
  NETWORK: "通信に失敗しました。",
  UNAUTHORIZED: "権限がありません。ログインしてください。",
  UNKNOWN: "予期せぬエラーが発生しました。",
};

export const calculateOverallProgress = (
  phases: ProjectPhase[],
): OverallProgress => {
  const completedCount = phases.filter((phase) => phase.status === "DONE").length;
  const inProgressCount = phases.filter(
    (phase) => phase.status === "IN_PROGRESS",
  ).length;
  const notStartedCount = phases.filter(
    (phase) => phase.status === "NOT_STARTED",
  ).length;
  const percentage =
    phases.length === 0
      ? 0
      : Math.round(
          phases.reduce((sum, phase) => sum + phase.progress, 0) / phases.length,
        );
  return {
    percentage,
    completedCount,
    inProgressCount,
    notStartedCount,
  };
};

const buildProjectDetailsData = (
  data: Omit<ProjectDetailsPageData, "overallProgress">,
): ProjectDetailsPageData => {
  return {
    ...data,
    overallProgress: calculateOverallProgress(data.phases),
  };
};

const projectDetailsSeeds: Record<
  string,
  Omit<ProjectDetailsPageData, "overallProgress">
> = {
  "1": {
    header: {
      id: "1",
      name: "ECサイトリニューアルプロジェクト",
      code: "PRJ-2024-001",
      startDate: "2024年1月15日",
    },
    phases: [
      { id: "phase-1", name: "商談", status: "DONE", progress: 100 },
      { id: "phase-2", name: "見積", status: "DONE", progress: 100 },
      { id: "phase-3", name: "要件定義", status: "DONE", progress: 100 },
      { id: "phase-4", name: "基本設計", status: "IN_PROGRESS", progress: 60 },
      { id: "phase-5", name: "詳細設計", status: "NOT_STARTED", progress: 0 },
      { id: "phase-6", name: "実装", status: "NOT_STARTED", progress: 0 },
      { id: "phase-7", name: "テスト", status: "NOT_STARTED", progress: 0 },
      { id: "phase-8", name: "リリース", status: "NOT_STARTED", progress: 0 },
      { id: "phase-9", name: "不具合対応", status: "NOT_STARTED", progress: 0 },
      { id: "phase-10", name: "保守", status: "NOT_STARTED", progress: 0 },
    ],
    members: [
      {
        id: "member-1",
        name: "田中太郎",
        role: "プロジェクトマネージャー",
        avatarUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face",
      },
      {
        id: "member-2",
        name: "佐藤花子",
        role: "フロントエンドエンジニア",
        avatarUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&crop=face",
      },
      {
        id: "member-3",
        name: "鈴木一郎",
        role: "バックエンドエンジニア",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop&crop=face",
      },
      {
        id: "member-4",
        name: "高橋美咲",
        role: "UIデザイナー",
        avatarUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face",
      },
      {
        id: "member-5",
        name: "伊藤健太",
        role: "QAエンジニア",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face",
      },
    ],
    meetings: [
      {
        id: "meeting-1",
        name: "週次定例ミーティング",
        dayOfWeek: "MON",
        timeRange: "14:00-15:00",
      },
      {
        id: "meeting-2",
        name: "技術レビュー会議",
        dayOfWeek: "WED",
        timeRange: "10:00-11:00",
      },
      {
        id: "meeting-3",
        name: "進捗報告会",
        dayOfWeek: "FRI",
        timeRange: "16:00-17:00",
      },
    ],
    plan: [
      {
        id: "plan-basic",
        title: "基本情報",
        items: [
          { label: "発注元", value: "ABC株式会社" },
          { label: "プロジェクトマネージャー", value: "田中太郎" },
          { label: "終了予定日", value: "2024年12月31日" },
        ],
      },
      {
        id: "plan-purpose",
        title: "目的・期待効果",
        items: [
          {
            label: "目的",
            value:
              "既存システムの老朽化に伴い、ユーザー体験と業務効率を改善する。",
          },
          {
            label: "期待成果",
            value: "業務処理時間を30%削減し、顧客満足度を向上させる。",
          },
        ],
      },
      {
        id: "plan-scope",
        title: "スコープ",
        items: [
          {
            label: "対象",
            value: "顧客管理・注文管理・在庫管理の主要機能",
          },
          { label: "除外", value: "既存レガシーシステムの改修" },
        ],
      },
    ],
  },
  "2": {
    header: {
      id: "2",
      name: "モバイルアプリ開発プロジェクト",
      code: "PRJ-2024-002",
      startDate: "2024年2月1日",
    },
    phases: [
      { id: "phase-1", name: "商談", status: "DONE", progress: 100 },
      { id: "phase-2", name: "見積", status: "DONE", progress: 100 },
      { id: "phase-3", name: "要件定義", status: "DONE", progress: 100 },
      { id: "phase-4", name: "基本設計", status: "DONE", progress: 100 },
      { id: "phase-5", name: "詳細設計", status: "DONE", progress: 100 },
      { id: "phase-6", name: "実装", status: "IN_PROGRESS", progress: 45 },
      { id: "phase-7", name: "テスト", status: "NOT_STARTED", progress: 0 },
      { id: "phase-8", name: "リリース", status: "NOT_STARTED", progress: 0 },
      { id: "phase-9", name: "不具合対応", status: "NOT_STARTED", progress: 0 },
      { id: "phase-10", name: "保守", status: "NOT_STARTED", progress: 0 },
    ],
    members: [
      {
        id: "member-1",
        name: "山田次郎",
        role: "モバイルエンジニア",
        avatarUrl:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=48&h=48&fit=crop&crop=face",
      },
      {
        id: "member-2",
        name: "渡辺麻美",
        role: "QAエンジニア",
        avatarUrl:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=48&h=48&fit=crop&crop=face",
      },
      {
        id: "member-3",
        name: "中村大輔",
        role: "バックエンドエンジニア",
        avatarUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=48&h=48&fit=crop&crop=face",
      },
    ],
    meetings: [],
    plan: [
      {
        id: "plan-basic",
        title: "基本情報",
        items: [
          { label: "発注元", value: "DEF株式会社" },
          { label: "プロジェクトマネージャー", value: "山田次郎" },
        ],
      },
      {
        id: "plan-purpose",
        title: "目的・期待効果",
        items: [
          {
            label: "目的",
            value: "モバイルアプリによる顧客接点の強化を行う。",
          },
        ],
      },
    ],
  },
};

const projectDetailsData = Object.fromEntries(
  Object.entries(projectDetailsSeeds).map(([key, value]) => [
    key,
    buildProjectDetailsData(value),
  ]),
) satisfies Record<string, ProjectDetailsPageData>;

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const getProjectDetails: ProjectDetailsDataSource["getProjectDetails"] =
  async (projectId) => {
    if (projectId === "network") {
      return {
        type: "error",
        error: buildError("NETWORK", errorMessages.NETWORK),
      };
    }
    if (projectId === "unauthorized") {
      return {
        type: "error",
        error: buildError("UNAUTHORIZED", errorMessages.UNAUTHORIZED),
      };
    }
    if (projectId === "unknown") {
      return {
        type: "error",
        error: buildError("UNKNOWN", errorMessages.UNKNOWN),
      };
    }
    if (projectId === "delay") {
      await delay(400);
    }
    const resolvedId = projectId === "delay" ? "1" : projectId;
    const data = projectDetailsData[resolvedId];
    if (!data) {
      return {
        type: "error",
        error: buildError("NOT_FOUND", errorMessages.NOT_FOUND),
      };
    }
    return { type: "ok", data };
  };

export const ProjectDetailsDataSourceMock: ProjectDetailsDataSource = {
  getProjectDetails,
};
