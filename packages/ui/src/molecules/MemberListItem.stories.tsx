import type { Meta, StoryObj } from "@storybook/react";
import type { DashboardMemberItem } from "@contracts/pages/dashboard";

import { MemberListItem } from "./MemberListItem";

const sampleMember: DashboardMemberItem = {
  id: "1",
  displayName: "田中太郎",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  role: "プロジェクトマネージャー",
  status: "稼働中",
  projectCount: 3,
};

const meta: Meta<typeof MemberListItem> = {
  title: "Molecules/MemberListItem",
  component: MemberListItem,
  tags: ["autodocs"],
  args: {
    item: sampleMember,
  },
};

export default meta;

type Story = StoryObj<typeof MemberListItem>;

export const Default: Story = {};

export const OnLeave: Story = {
  args: {
    item: {
      ...sampleMember,
      status: "休暇中",
      projectCount: 0,
    },
  },
};
