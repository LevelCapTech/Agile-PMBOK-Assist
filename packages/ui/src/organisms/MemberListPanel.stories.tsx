import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@testing-library/react";

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

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText("読み込み中...");
    const firstMemberName = dashboardMembers[0]?.displayName;
    if (firstMemberName && canvas.queryByText(firstMemberName)) {
      throw new globalThis.Error("読み込み中にメンバーが表示されています。");
    }
  },
};

export const Error: Story = {
  args: {
    error: { code: "error", message: "メンバー情報を取得できません" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText("メンバー情報を取得できません");
  },
};

export const Empty: Story = {
  args: {
    members: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText("メンバーがいません");
  },
};
