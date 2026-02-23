import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import type { IconResolver, SettingAction } from "@contracts/pages/dashboard";

import { IconResolverProvider } from "../contexts/IconResolverContext";
import { SettingsActionPanel } from "./SettingsActionPanel";

const mockIconResolver: IconResolver = (iconKey: string) => {
  const iconMap: Record<string, string> = {
    settings: "⚙️",
    users: "👥",
    bell: "🔔",
    shield: "🛡️",
    lock: "🔒",
    eye: "👁️",
    download: "📥",
    sliders: "🎚️",
  };
  return <span>{iconMap[iconKey] || "❓"}</span>;
};

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

const meta = {
  title: "Organisms/SettingsActionPanel",
  component: SettingsActionPanel,
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <div style={{ width: "100%", minWidth: 800, padding: 16 }}>
          <Story />
        </div>
      </IconResolverProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SettingsActionPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "設定",
    settings: sampleSettings,
    onClickSetting: fn(),
  },
};

export const Loading: Story = {
  args: {
    title: "設定",
    settings: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    expect(canvas.getByRole("progressbar")).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    title: "設定",
    settings: [],
    error: {
      code: "DATA_FETCH_ERROR",
      message: "設定情報の取得に失敗しました。",
    },
  },
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    expect(canvas.getByRole("alert")).toBeInTheDocument();
  },
};
