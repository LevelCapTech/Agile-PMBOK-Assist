import type { Meta, StoryObj } from "@storybook/react";
import { SettingsActionPanel } from "./SettingsActionPanel";
import { IconResolverProvider } from "../../atoms/LcIcon/IconResolverContext";

const mockIconResolver = (iconKey: string) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#246BFF",
        color: "white",
        fontSize: "10px",
        fontWeight: "bold",
      }}
    >
      {iconKey.substring(0, 2).toUpperCase()}
    </div>
  );
};

const meta = {
  title: "Organisms/SettingsActionPanel",
  component: SettingsActionPanel,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
          <Story />
        </div>
      </IconResolverProvider>
    ),
  ],
  argTypes: {
    title: {
      description: "パネルタイトル",
    },
    settings: {
      description: "設定アクション一覧",
    },
    isLoading: {
      description: "ローディング状態",
    },
    error: {
      description: "エラー情報",
    },
    onClickSetting: {
      description: "設定アクションクリック時のコールバック",
    },
  },
} satisfies Meta<typeof SettingsActionPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "設定とアクション",
    settings: [
      {
        id: "project-settings",
        label: "プロジェクト設定",
        description: "プロジェクトの基本設定を管理",
        iconKey: "settings",
      },
      {
        id: "member-management",
        label: "メンバー管理",
        description: "チームメンバーの追加・削除",
        iconKey: "users",
      },
      {
        id: "notification-settings",
        label: "通知設定",
        description: "通知の受信設定を変更",
        iconKey: "bell",
      },
      {
        id: "security",
        label: "セキュリティ",
        description: "アクセス権限とセキュリティ設定",
        iconKey: "shield",
      },
      {
        id: "permission",
        label: "権限管理",
        description: "ユーザー権限の設定",
        iconKey: "lock",
      },
      {
        id: "display",
        label: "表示設定",
        description: "画面表示のカスタマイズ",
        iconKey: "eye",
      },
      {
        id: "export",
        label: "エクスポート",
        description: "データのエクスポート",
        iconKey: "download",
      },
      {
        id: "system",
        label: "システム設定",
        description: "システム全体の設定",
        iconKey: "sliders",
      },
    ],
    onClickSetting: (actionId) => {
      console.log("Clicked setting:", actionId);
    },
  },
  play: async ({ canvasElement }) => {
    const title = canvasElement.querySelector("h2");
    const hasTitle = title && title.textContent?.includes("設定とアクション");
    const buttons = canvasElement.querySelectorAll('[role="button"]');

    if (!hasTitle) console.error("Title not found");
    if (buttons.length !== 8)
      console.error(`Expected 8 buttons, found ${buttons.length}`);

    if (buttons[0]) {
      (buttons[0] as HTMLElement).click();
    }
  },
};

export const Loading: Story = {
  args: {
    title: "設定とアクション",
    settings: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const spinner = canvasElement.querySelector('[role="progressbar"]');
    if (!spinner) console.error("Spinner not found");
  },
};

export const Error: Story = {
  args: {
    title: "設定とアクション",
    settings: [],
    error: {
      code: "FETCH_ERROR",
      message: "設定情報の取得に失敗しました",
    },
  },
  play: async ({ canvasElement }) => {
    const errorMessage =
      canvasElement.textContent?.includes("エラーが発生しました");
    if (!errorMessage) console.error("Error message not found");
  },
};

export const WithDisabledActions: Story = {
  args: {
    title: "設定とアクション",
    settings: [
      {
        id: "project-settings",
        label: "プロジェクト設定",
        description: "プロジェクトの基本設定を管理",
        iconKey: "settings",
      },
      {
        id: "member-management",
        label: "メンバー管理",
        description: "チームメンバーの追加・削除",
        iconKey: "users",
        disabled: true,
      },
      {
        id: "security",
        label: "セキュリティ",
        description: "アクセス権限とセキュリティ設定",
        iconKey: "shield",
        disabled: true,
      },
      {
        id: "export",
        label: "エクスポート",
        description: "データのエクスポート",
        iconKey: "download",
      },
    ],
    onClickSetting: (actionId) => {
      console.log("Clicked setting:", actionId);
    },
  },
  play: async ({ canvasElement }) => {
    const buttons = canvasElement.querySelectorAll('[role="button"]');
    const disabledButtons = Array.from(buttons).filter(
      (btn: Element) =>
        btn.hasAttribute("disabled") ||
        btn.getAttribute("aria-disabled") === "true",
    );

    if (disabledButtons.length === 0) {
      console.error("Expected at least one disabled button");
    }
  },
};
