import type { Meta, StoryObj } from "@storybook/react";
import { ProjectListPanel } from "./ProjectListPanel";
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
  title: "Organisms/ProjectListPanel",
  component: ProjectListPanel,
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
    projects: {
      description: "プロジェクト一覧",
    },
    isLoading: {
      description: "ローディング状態",
    },
    error: {
      description: "エラー情報",
    },
    onSelectProject: {
      description: "プロジェクト選択時のコールバック",
    },
  },
} satisfies Meta<typeof ProjectListPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "進行中のプロジェクト",
    projects: [
      {
        id: "PRJ-001",
        name: "ECサイトリニューアルプロジェクト",
        code: "PRJ-2024-001",
        status: "オープン",
        startDate: "2024-01-15",
        members: [
          {
            name: "田中太郎",
            avatarUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          },
          {
            name: "佐藤花子",
            avatarUrl:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
          },
        ],
      },
      {
        id: "PRJ-002",
        name: "モバイルアプリ開発プロジェクト",
        code: "PRJ-2024-002",
        status: "オープン",
        startDate: "2024-02-01",
        members: [
          {
            name: "鈴木一郎",
            avatarUrl:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
          },
        ],
      },
      {
        id: "PRJ-003",
        name: "社内システム統合プロジェクト",
        code: "PRJ-2024-003",
        status: "保守",
        startDate: "2024-03-10",
        members: [
          {
            name: "高橋美咲",
            avatarUrl:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
          },
          {
            name: "伊藤健太",
            avatarUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          },
          {
            name: "山田次郎",
            avatarUrl:
              "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
          },
        ],
      },
    ],
    onSelectProject: (projectId: string) => {
      console.log("Selected project:", projectId);
    },
  },
  play: async ({ canvasElement }) => {
    const title = canvasElement.querySelector("h2");
    const hasTitle =
      title && title.textContent?.includes("進行中のプロジェクト");
    const hasProjects = canvasElement.textContent?.includes("PRJ-2024-");

    if (!hasTitle || !hasProjects) {
      console.error("Required elements not found");
    }
  },
};

export const Loading: Story = {
  args: {
    title: "進行中のプロジェクト",
    projects: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const spinner = canvasElement.querySelector('[role="progressbar"]');
    if (!spinner) console.error("Spinner not found");
  },
};

export const Error: Story = {
  args: {
    title: "進行中のプロジェクト",
    projects: [],
    error: {
      code: "FETCH_ERROR",
      message: "プロジェクト一覧の取得に失敗しました",
    },
  },
  play: async ({ canvasElement }) => {
    const errorMessage =
      canvasElement.textContent?.includes("エラーが発生しました");
    if (!errorMessage) console.error("Error message not found");
  },
};

export const Empty: Story = {
  args: {
    title: "進行中のプロジェクト",
    projects: [],
  },
  play: async ({ canvasElement }) => {
    const emptyMessage =
      canvasElement.textContent?.includes("プロジェクトが見つかりませんでした");
    if (!emptyMessage) console.error("Empty message not found");
  },
};
