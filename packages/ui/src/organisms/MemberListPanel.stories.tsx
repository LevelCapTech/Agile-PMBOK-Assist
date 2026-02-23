import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import type { DashboardMemberItem } from "@contracts/pages/dashboard";

import { MemberListPanel } from "./MemberListPanel";

const sampleMembers: DashboardMemberItem[] = [
  {
    id: "1",
    displayName: "田中太郎",
    role: "プロジェクトマネージャー",
    status: "稼働中",
    projectCount: 3,
  },
  {
    id: "2",
    displayName: "佐藤花子",
    role: "フロントエンドエンジニア",
    status: "稼働中",
    projectCount: 2,
  },
  {
    id: "3",
    displayName: "鈴木一郎",
    role: "バックエンドエンジニア",
    status: "待機中",
    projectCount: 1,
  },
];

const meta: Meta<typeof MemberListPanel> = {
  title: "Organisms/MemberListPanel",
  component: MemberListPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    title: "メンバー一覧",
    members: sampleMembers,
  },
};

export default meta;

type Story = StoryObj<typeof MemberListPanel>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
    members: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    error: { code: "LOAD_FAILED", message: "メンバーの読み込みに失敗しました" },
    members: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("メンバーの読み込みに失敗しました")).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: {
    members: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("メンバーがいません")).toBeInTheDocument();
  },
};
