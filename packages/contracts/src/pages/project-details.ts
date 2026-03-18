/**
 * プロジェクト詳細画面の契約エラーコード。
 * - `NOT_FOUND`: 対象プロジェクトが見つからない。
 * - `NETWORK`: 通信に失敗した。
 * - `UNAUTHORIZED`: 権限不足。
 * - `UNKNOWN`: 想定外の例外。
 */
export type ProjectDetailsErrorCode =
  | "NOT_FOUND"
  | "NETWORK"
  | "UNAUTHORIZED"
  | "UNKNOWN";

/** プロジェクト詳細画面で扱うエラー情報。 */
export interface ProjectDetailsError {
  /** エラーコード。 */
  code: ProjectDetailsErrorCode;
  /** 表示・ログ用の安全なメッセージ。 */
  message: string;
}

/** 成否を表す結果型。 */
export type Result<T, E> =
  | { type: "ok"; data: T }
  | { type: "error"; error: E };

/** フェーズの状態。 */
export type PhaseStatus = "DONE" | "IN_PROGRESS" | "NOT_STARTED";

/** 曜日。 */
export type DayOfWeek = "MON" | "TUE" | "WED" | "THU" | "FRI";

/** 画面ヘッダー表示情報。 */
export interface ProjectHeader {
  /** プロジェクトID。 */
  id: string;
  /** プロジェクト名。 */
  name: string;
  /** プロジェクトコード。 */
  code: string;
  /** 開始日（表示用文字列）。 */
  startDate: string;
}

/** フェーズ進捗の表示情報。 */
export interface ProjectPhase {
  /** フェーズID。 */
  id: string;
  /** フェーズ名。 */
  name: string;
  /** フェーズ状態。 */
  status: PhaseStatus;
  /** 進捗率（0-100）。 */
  progress: number;
}

/** プロジェクトメンバーの表示情報。 */
export interface ProjectMember {
  /** メンバーID。 */
  id: string;
  /** メンバー名。 */
  name: string;
  /** 役割。 */
  role: string;
  /** アバター画像URL（任意）。 */
  avatarUrl: string | null;
}

/** 会議体の表示情報。 */
export interface ProjectMeeting {
  /** 会議ID。 */
  id: string;
  /** 会議名。 */
  name: string;
  /** 曜日。 */
  dayOfWeek: DayOfWeek;
  /** 時間帯（例: 10:00-11:00）。 */
  timeRange: string;
}

/** 計画セクションの項目。 */
export interface PlanItem {
  /** ラベル。 */
  label: string;
  /** 値。 */
  value: string;
}

/** プロジェクト計画セクション。 */
export interface ProjectPlanSection {
  /** セクションID。 */
  id: string;
  /** セクションタイトル。 */
  title: string;
  /** セクション内の計画項目。 */
  items: PlanItem[];
}

/** 全体進捗の集計情報。 */
export interface OverallProgress {
  /** 全体進捗率。 */
  percentage: number;
  /** 完了フェーズ数。 */
  completedCount: number;
  /** 進行中フェーズ数。 */
  inProgressCount: number;
  /** 未着手フェーズ数。 */
  notStartedCount: number;
}

/** プロジェクト詳細画面の表示データ。 */
export interface ProjectDetailsPageData {
  /** ヘッダー表示情報。 */
  header: ProjectHeader;
  /** フェーズ進捗一覧。 */
  phases: ProjectPhase[];
  /** メンバー一覧。 */
  members: ProjectMember[];
  /** 会議体一覧。 */
  meetings: ProjectMeeting[];
  /** プロジェクト計画。 */
  plan: ProjectPlanSection[];
  /** 全体進捗集計。 */
  overallProgress: OverallProgress;
}

/** プロジェクト詳細画面のデータ取得契約。 */
export interface ProjectDetailsDataSource {
  /** 指定プロジェクトの詳細データを取得する。 */
  getProjectDetails(
    projectId: string,
  ): Promise<Result<ProjectDetailsPageData, ProjectDetailsError>>;
}
