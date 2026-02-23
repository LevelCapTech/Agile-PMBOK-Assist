import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import type { DashboardMemberItem } from "@contracts/dashboard/types";

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
];

const meta = {
  title: "Organisms/MemberListPanel",
  component: MemberListPanel,
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
    const canvas = within(canvasElement);
    expect(canvas.getByRole("progressbar")).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    title: "メンバー一覧",
    members: [],
    error: { code: "FETCH_ERROR", message: "メンバーの取得に失敗しました" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("メンバーの取得に失敗しました")).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: {
    title: "メンバー一覧",
    members: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("メンバーがいません")).toBeInTheDocument();
  },
};
