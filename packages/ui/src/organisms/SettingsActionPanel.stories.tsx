import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import type { SettingAction } from "@contracts/pages/dashboard";

import { SettingsActionPanel } from "./SettingsActionPanel";

const sampleSettings: SettingAction[] = [
  { id: "project-settings", label: "プロジェクト設定", description: "プロジェクトの基本情報や期限を設定", iconKey: "settings" },
  { id: "member-management", label: "メンバー管理", description: "チームメンバーの追加・編集・削除", iconKey: "users" },
  { id: "notification-settings", label: "通知設定", description: "通知の受信設定とタイミングを調整", iconKey: "bell" },
  { id: "security", label: "セキュリティ", description: "パスワードや二段階認証の設定", iconKey: "shield" },
  { id: "permission", label: "権限管理", description: "ユーザーの役割と権限を設定", iconKey: "lock" },
  { id: "display", label: "表示設定", description: "テーマやレイアウトのカスタマイズ", iconKey: "eye" },
  { id: "export", label: "データエクスポート", description: "プロジェクトデータをCSVで出力", iconKey: "download" },
  { id: "system", label: "システム設定", description: "全般的なシステム環境を調整", iconKey: "sliders" },
];

const meta: Meta<typeof SettingsActionPanel> = {
  title: "Organisms/SettingsActionPanel",
  component: SettingsActionPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    title: "設定",
    settings: sampleSettings,
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    error: { code: "LOAD_FAILED", message: "設定の読み込みに失敗しました" },
    settings: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("設定の読み込みに失敗しました")).toBeInTheDocument();
  },
};
