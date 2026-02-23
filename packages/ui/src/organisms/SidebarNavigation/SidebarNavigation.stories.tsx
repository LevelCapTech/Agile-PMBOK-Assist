import type { Meta, StoryObj } from "@storybook/react";
import { SidebarNavigation } from "./SidebarNavigation";
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
  title: "Organisms/SidebarNavigation",
  component: SidebarNavigation,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <div style={{ height: "100vh", display: "flex" }}>
          <Story />
        </div>
      </IconResolverProvider>
    ),
  ],
  argTypes: {
    sidebar: {
      description: "サイドバー情報",
    },
  },
} satisfies Meta<typeof SidebarNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sidebar: {
      title: "メインメニュー",
      items: [
        {
          id: "dashboard",
          label: "ダッシュボード",
          iconKey: "home",
          active: true,
        },
        {
          id: "projects",
          label: "プロジェクト",
          iconKey: "folder",
          active: false,
        },
        {
          id: "members",
          label: "メンバー",
          iconKey: "users",
          active: false,
        },
        {
          id: "settings",
          label: "設定",
          iconKey: "settings",
          active: false,
        },
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const activeItem = canvasElement.textContent?.includes("ダッシュボード");
    if (!activeItem) console.error("Active item not found");
  },
};

export const AllItems: Story = {
  args: {
    sidebar: {
      title: "ナビゲーション",
      items: [
        {
          id: "dashboard",
          label: "ダッシュボード",
          iconKey: "home",
          active: false,
        },
        {
          id: "projects",
          label: "プロジェクト",
          iconKey: "folder",
          active: true,
        },
        {
          id: "members",
          label: "メンバー",
          iconKey: "users",
          active: false,
        },
        {
          id: "budget",
          label: "予算管理",
          iconKey: "dollar-sign",
          active: false,
        },
        {
          id: "reports",
          label: "レポート",
          iconKey: "file-text",
          active: false,
        },
        {
          id: "settings",
          label: "設定",
          iconKey: "settings",
          active: false,
        },
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const items = canvasElement.querySelectorAll('[role="button"]');
    if (items.length !== 6) {
      console.error(`Expected 6 items, found ${items.length}`);
    }
  },
};
