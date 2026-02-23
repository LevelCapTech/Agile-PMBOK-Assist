import type { Meta, StoryObj } from "@storybook/react";

import type { DashboardMemberItem } from "@contracts/dashboard/types";

import { MemberListItem } from "./MemberListItem";

const sampleMember: DashboardMemberItem = {
  id: "1",
  displayName: "田中太郎",
  avatarUrl: "https://i.pravatar.cc/150?img=1",
  role: "プロジェクトマネージャー",
  status: "稼働中",
  projectCount: 3,
};

const meta = {
  title: "Molecules/MemberListItem",
  component: MemberListItem,
  tags: ["autodocs"],
} satisfies Meta<typeof MemberListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: sampleMember,
  },
};

export const WaitingStatus: Story = {
  args: {
    item: {
      ...sampleMember,
      status: "待機中",
      projectCount: 0,
    },
  },
};
