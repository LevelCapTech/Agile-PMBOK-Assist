import type { Meta, StoryObj } from "@storybook/react";

import { MemberListPanel } from "./MemberListPanel";
import { dashboardMembers } from "../stories/dashboardStoryData";

const meta: Meta<typeof MemberListPanel> = {
  title: "Organisms/MemberListPanel",
  component: MemberListPanel,
  tags: ["autodocs"],
  args: {
    title: "メンバー一覧",
    members: dashboardMembers,
  },
};

export default meta;

type Story = StoryObj<typeof MemberListPanel>;

export const Default: Story = {};
