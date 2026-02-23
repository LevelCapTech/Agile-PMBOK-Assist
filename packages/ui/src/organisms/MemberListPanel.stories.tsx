import type { Meta, StoryObj } from "@storybook/react";

import { sampleMembers } from "../fixtures/dashboard";

import { MemberListPanel } from "./MemberListPanel";

const meta: Meta<typeof MemberListPanel> = {
  title: "Organisms/MemberListPanel",
  component: MemberListPanel,
  tags: ["autodocs"],
  args: {
    title: "メンバー一覧",
    members: sampleMembers,
  },
};

export default meta;

type Story = StoryObj<typeof MemberListPanel>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    members: [],
  },
};
