import type { Meta, StoryObj } from "@storybook/react";

import { mockMembers } from "../stories/dashboardMocks";
import { MemberListPanel } from "./MemberListPanel";

const meta: Meta<typeof MemberListPanel> = {
  title: "Dashboard/Organisms/MemberListPanel",
  component: MemberListPanel,
  tags: ["autodocs"],
  args: {
    title: "メンバー一覧",
    members: mockMembers,
  },
};

export default meta;

type Story = StoryObj<typeof MemberListPanel>;

export const Default: Story = {
  name: "default",
};

export const Empty: Story = {
  args: {
    members: [],
  },
};
