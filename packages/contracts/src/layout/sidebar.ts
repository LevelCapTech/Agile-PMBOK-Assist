/**
 * サイドバーの表示状態。
 * - `expanded`: 展開表示
 * - `rail`: レール表示
 */
export type SidebarVariant = "expanded" | "rail";

/**
 * サイドバー表示状態の保持。
 */
export interface SidebarNavigationState {
  /** 現在のサイドバー表示状態。 */
  variant: SidebarVariant;
}

/**
 * サイドバー状態の取得元。
 * - `storage`: localStorage から取得
 * - `default`: デフォルト値
 */
export type SidebarPreferenceSource = "storage" | "default";

/**
 * サイドバー状態保存のエラーコード。
 * - `invalid_variant`: 不正な値が保存されていた
 * - `storage_unavailable`: localStorage が利用できない
 */
export type SidebarPreferenceErrorCode =
  | "invalid_variant"
  | "storage_unavailable";

/**
 * サイドバー状態保存に関するエラー。
 */
export interface SidebarPreferenceError {
  /** エラーコード。 */
  code: SidebarPreferenceErrorCode;
  /** ログ用メッセージ。 */
  message: string;
}

/**
 * サイドバー状態の読み込み結果。
 */
export interface SidebarPreferenceResult {
  /** 取得した表示状態。 */
  variant: SidebarVariant;
  /** 取得元。 */
  source: SidebarPreferenceSource;
  /** エラー情報（任意）。 */
  error?: SidebarPreferenceError | null;
}

/**
 * サイドバーの状態保存ストア。
 */
export interface SidebarPreferencesStore {
  /** サイドバー状態を読み込む。 */
  loadSidebarVariant: () => SidebarPreferenceResult;
  /** サイドバー状態を保存する。 */
  saveSidebarVariant: (
    variant: SidebarVariant,
  ) => SidebarPreferenceError | null;
}
