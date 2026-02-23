import type { Meta, StoryObj } from "@storybook/react";
import { SettingActionButton } from "./SettingActionButton";
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
  title: "Molecules/SettingActionButton",
  component: SettingActionButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <div style={{ maxWidth: "300px" }}>
          <Story />
        </div>
      </IconResolverProvider>
    ),
  ],
  argTypes: {
    action: {
      description: "設定アクション情報",
    },
    disabled: {
      control: "boolean",
      description: "無効化フラグ",
    },
    onClick: {
      description: "クリック時のコールバック",
    },
  },
} satisfies Meta<typeof SettingActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    action: {
      id: "project-settings",
      label: "プロジェクト設定",
      description: "プロジェクトの基本情報や期限を設定",
      iconKey: "settings",
    },
    onClick: (actionId) => {
      console.log("Clicked action:", actionId);
    },
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('[role="button"]');
    if (button) {
      (button as HTMLElement).click();
    }
  },
};

export const Disabled: Story = {
  args: {
    action: {
      id: "member-management",
      label: "メンバー管理",
      description: "チームメンバーの追加・編集・削除",
      iconKey: "users",
      disabled: true,
    },
    onClick: (actionId) => {
      console.log("Clicked action:", actionId);
    },
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('[role="button"]');
    if (!button) {
      console.error("Button not found");
    } else {
      const hasDisabledClass = button.classList.contains("Mui-disabled");
      if (!hasDisabledClass)
        console.error("Button should have Mui-disabled class");
    }
  },
};

export const AllActions: Story = {
  args: {
    action: {
      id: "project-settings",
      label: "プロジェクト設定",
      description: "プロジェクトの基本情報や期限を設定",
      iconKey: "settings",
    },
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px",
      }}
    >
      <SettingActionButton
        action={{
          id: "project-settings",
          label: "プロジェクト設定",
          description: "プロジェクトの基本情報や期限を設定",
          iconKey: "settings",
        }}
      />
      <SettingActionButton
        action={{
          id: "member-management",
          label: "メンバー管理",
          description: "チームメンバーの追加・編集・削除",
          iconKey: "users",
        }}
      />
      <SettingActionButton
        action={{
          id: "notification-settings",
          label: "通知設定",
          description: "通知の受信設定とタイミングを調整",
          iconKey: "bell",
        }}
      />
      <SettingActionButton
        action={{
          id: "security",
          label: "セキュリティ",
          description: "パスワードや二段階認証の設定",
          iconKey: "shield",
        }}
      />
    </div>
  ),
};
