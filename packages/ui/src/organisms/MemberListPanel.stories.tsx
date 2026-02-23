import type { Meta, StoryObj } from "@storybook/react";

import type { IconResolver, DashboardMemberItem } from "@contracts/pages/dashboard";

import { IconResolverProvider } from "../contexts/IconResolverContext";
import { MemberListPanel } from "./MemberListPanel";

const mockIconResolver: IconResolver = (iconKey: string) => {
  const iconMap: Record<string, string> = {
    plus: "➕",
    users: "👥",
    folder: "📁",
  };
  return <span>{iconMap[iconKey] || "❓"}</span>;
};

const sampleMembers: DashboardMemberItem[] = [
  {
    id: "1",
    displayName: "田中太郎",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    role: "プロジェクトマネージャー",
    status: "稼働中",
    projectCount: 3,
  },
  {
    id: "2",
    displayName: "佐藤花子",
    role: "フロントエンドエンジニア",
    status: "待機中",
    projectCount: 2,
  },
];

const meta = {
  title: "Organisms/MemberListPanel",
  component: MemberListPanel,
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
} satisfies Meta<typeof MemberListPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "メンバー一覧",
    members: sampleMembers,
  },
};

export const Loading: Story = {
  args: {
    title: "メンバー一覧",
    members: [],
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
    title: "メンバー一覧",
    members: [],
    error: {
      code: "DATA_FETCH_ERROR",
      message: "メンバー情報の取得に失敗しました。",
    },
  },
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    expect(canvas.getByRole("alert")).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: {
    title: "メンバー一覧",
    members: [],
  },
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    expect(canvas.getByText("メンバーが登録されていません")).toBeInTheDocument();
  },
};
