import type { Meta, StoryObj } from "@storybook/react";
import { SettingsActionPanel } from "./SettingsActionPanel";
import { IconResolverProvider } from "../../atoms/LcIcon/IconResolverContext";
import { expect, within, userEvent } from "@storybook/test";

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
    const canvas = within(canvasElement);
    const title = canvas.getByText("設定とアクション");
    expect(title).toBeInTheDocument();

    const buttons = canvas.getAllByRole("button");
    expect(buttons.length).toBe(8);

    if (buttons[0]) {
      await userEvent.click(buttons[0]);
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
    expect(spinner).toBeInTheDocument();
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
    const canvas = within(canvasElement);
    const errorMessage = canvas.getByText(/エラーが発生しました/);
    expect(errorMessage).toBeInTheDocument();
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
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");

    const disabledButtons = buttons.filter(
      (btn) => btn.hasAttribute("disabled") || btn.getAttribute("aria-disabled") === "true"
    );
    expect(disabledButtons.length).toBeGreaterThan(0);
  },
};
