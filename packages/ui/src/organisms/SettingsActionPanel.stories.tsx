import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import type { SettingAction } from "@contracts/dashboard/types";

import { SettingsActionPanel } from "./SettingsActionPanel";

const sampleSettings: SettingAction[] = [
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
    description: "通知の受信設定とタイミングを選択",
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
    iconKey: "system",
  },
];

const meta = {
  title: "Organisms/SettingsActionPanel",
  component: SettingsActionPanel,
  tags: ["autodocs"],
} satisfies Meta<typeof SettingsActionPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "設定",
    settings: sampleSettings,
  },
};

export const Loading: Story = {
  args: {
    title: "設定",
    settings: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("progressbar")).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    title: "設定",
    settings: [],
    error: { code: "FETCH_ERROR", message: "設定の取得に失敗しました" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("設定の取得に失敗しました")).toBeInTheDocument();
  },
};
