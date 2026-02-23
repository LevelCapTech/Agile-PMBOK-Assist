import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import { SettingsActionPanel } from "./SettingsActionPanel";
import { withMockIconResolver } from "../../stories/mockIconResolver";

const SAMPLE_SETTINGS = [
  { id: "project-settings" as const, label: "プロジェクト設定", description: "プロジェクトの基本情報や期限を設定", iconKey: "settings" },
  { id: "member-management" as const, label: "メンバー管理", description: "チームメンバーの追加・編集・削除", iconKey: "users" },
  { id: "notification-settings" as const, label: "通知設定", description: "通知の受信設定とタイミングを調整", iconKey: "bell" },
  { id: "security" as const, label: "セキュリティ", description: "パスワードや二段階認証の設定", iconKey: "shield" },
  { id: "permission" as const, label: "権限管理", description: "ユーザーの役割と権限を設定", iconKey: "lock" },
  { id: "display" as const, label: "表示設定", description: "テーマやレイアウトのカスタマイズ", iconKey: "eye" },
  { id: "export" as const, label: "データエクスポート", description: "プロジェクトデータをCSVで出力", iconKey: "download" },
  { id: "system" as const, label: "システム設定", description: "全般的なシステム環境を調整", iconKey: "sliders" },
];

const meta: Meta<typeof SettingsActionPanel> = {
  title: "Organisms/SettingsActionPanel",
  component: SettingsActionPanel,
  tags: ["autodocs"],
  decorators: [withMockIconResolver],
  parameters: { layout: "padded" },
  args: {
    title: "設定",
    settings: SAMPLE_SETTINGS,
    onClickSetting: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof SettingsActionPanel>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
    settings: [],
  },
};

export const Error: Story = {
  args: {
    settings: [],
    error: { code: "data_source_unavailable", message: "設定の取得に失敗しました" },
  },
};
