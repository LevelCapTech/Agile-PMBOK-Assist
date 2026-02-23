import type { Meta, StoryObj } from "@storybook/react";

import type { IconResolver, DashboardMemberItem } from "@contracts/pages/dashboard";

import { IconResolverProvider } from "../contexts/IconResolverContext";
import { MemberListItem } from "./MemberListItem";

const mockIconResolver: IconResolver = (iconKey: string) => {
  const iconMap: Record<string, string> = {
    folder: "📁",
  };
  return <span>{iconMap[iconKey] || "❓"}</span>;
};

const sampleMember: DashboardMemberItem = {
  id: "1",
  displayName: "田中太郎",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  role: "プロジェクトマネージャー",
  status: "稼働中",
  projectCount: 3,
};

const meta = {
  title: "Molecules/MemberListItem",
  component: MemberListItem,
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <div style={{ width: 280 }}>
          <Story />
        </div>
      </IconResolverProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MemberListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: sampleMember,
  },
};

export const StatusVariants: Story = {
  args: {
    item: sampleMember,
  },
  render: () => (
    <div className="flex gap-4">
      <MemberListItem item={{ ...sampleMember, status: "稼働中" }} />
      <MemberListItem item={{ ...sampleMember, status: "待機中" }} />
      <MemberListItem item={{ ...sampleMember, status: "休暇中" }} />
    </div>
  ),
};

export const NoAvatar: Story = {
  args: {
    item: {
      ...sampleMember,
      avatarUrl: undefined,
    },
  },
};
