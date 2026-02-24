import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@testing-library/dom";

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
    const message = canvas.getByText("読み込み中...");
    if (!message) {
      throw new globalThis.Error("読み込み中の表示が見つかりません。");
    }
  },
};

export const Error: Story = {
  args: {
    error: { code: "error", message: "メンバー情報を取得できません" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const message = canvas.getByText("メンバー情報を取得できません");
    if (!message) {
      throw new globalThis.Error("エラー表示が見つかりません。");
    }
  },
};

export const Empty: Story = {
  args: {
    members: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const message = canvas.getByText("メンバーがいません");
    if (!message) {
      throw new globalThis.Error("空状態の表示が見つかりません。");
    }
  },
};
