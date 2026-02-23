import type { Meta, StoryObj } from "@storybook/react";
import { MemberListItem } from "./MemberListItem";
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
  title: "Molecules/MemberListItem",
  component: MemberListItem,
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
    item: {
      description: "メンバー情報",
    },
  },
} satisfies Meta<typeof MemberListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      id: "MEM-001",
      displayName: "田中太郎",
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      role: "プロジェクトマネージャー",
      status: "稼働中",
      projectCount: 3,
    },
  },
  play: async ({ canvasElement }) => {
    const memberName = canvasElement.textContent?.includes("田中太郎");
    if (!memberName) console.error("Member name not found");
  },
};

export const StatusActive: Story = {
  args: {
    item: {
      id: "MEM-002",
      displayName: "佐藤花子",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
      role: "フロントエンドエンジニア",
      status: "稼働中",
      projectCount: 2,
    },
  },
};

export const StatusWaiting: Story = {
  args: {
    item: {
      id: "MEM-003",
      displayName: "鈴木一郎",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      role: "バックエンドエンジニア",
      status: "待機中",
      projectCount: 1,
    },
  },
};

export const StatusOnLeave: Story = {
  args: {
    item: {
      id: "MEM-004",
      displayName: "伊藤健太",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      role: "フルスタックエンジニア",
      status: "休暇中",
      projectCount: 0,
    },
  },
};
