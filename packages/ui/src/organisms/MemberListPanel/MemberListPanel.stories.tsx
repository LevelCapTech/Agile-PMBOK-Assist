import type { Meta, StoryObj } from "@storybook/react";
import { MemberListPanel } from "./MemberListPanel";
import { IconResolverProvider } from "../../atoms/LcIcon/IconResolverContext";
import { expect, within } from "@storybook/test";

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
  title: "Organisms/MemberListPanel",
  component: MemberListPanel,
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
    members: {
      description: "メンバー一覧",
    },
    isLoading: {
      description: "ローディング状態",
    },
    error: {
      description: "エラー情報",
    },
  },
} satisfies Meta<typeof MemberListPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "チームメンバー",
    members: [
      {
        id: "MEM-001",
        displayName: "田中太郎",
        avatarUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        role: "プロジェクトマネージャー",
        status: "稼働中",
        projectCount: 3,
      },
      {
        id: "MEM-002",
        displayName: "佐藤花子",
        avatarUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
        role: "シニアエンジニア",
        status: "稼働中",
        projectCount: 2,
      },
      {
        id: "MEM-003",
        displayName: "鈴木一郎",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
        role: "エンジニア",
        status: "待機中",
        projectCount: 0,
      },
      {
        id: "MEM-004",
        displayName: "高橋美咲",
        avatarUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        role: "デザイナー",
        status: "稼働中",
        projectCount: 1,
      },
      {
        id: "MEM-005",
        displayName: "伊藤健太",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        role: "エンジニア",
        status: "休暇中",
        projectCount: 0,
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("チームメンバー");
    expect(title).toBeInTheDocument();

    const members = canvas.getAllByText(/プロジェクト|エンジニア|デザイナー/);
    expect(members.length).toBeGreaterThan(0);
  },
};

export const Loading: Story = {
  args: {
    title: "チームメンバー",
    members: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const spinner = canvasElement.querySelector('[role="progressbar"]');
    expect(spinner).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    title: "チームメンバー",
    members: [],
    error: {
      code: "FETCH_ERROR",
      message: "メンバー一覧の取得に失敗しました",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const errorMessage = canvas.getByText(/エラーが発生しました/);
    expect(errorMessage).toBeInTheDocument();
  },
};
