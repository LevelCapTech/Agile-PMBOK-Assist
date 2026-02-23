import type { Meta, StoryObj } from "@storybook/react";

import { MemberListPanel } from "./MemberListPanel";
import { withMockIconResolver } from "../../stories/mockIconResolver";

const SAMPLE_MEMBERS = [
  {
    id: "1",
    displayName: "田中太郎",
    role: "プロジェクトマネージャー",
    status: "稼働中" as const,
    projectCount: 3,
  },
  {
    id: "2",
    displayName: "佐藤花子",
    role: "フロントエンドエンジニア",
    status: "稼働中" as const,
    projectCount: 2,
  },
];

const meta: Meta<typeof MemberListPanel> = {
  title: "Organisms/MemberListPanel",
  component: MemberListPanel,
  tags: ["autodocs"],
  decorators: [withMockIconResolver],
  args: {
    title: "メンバー一覧",
    members: SAMPLE_MEMBERS,
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
};

export const Error: Story = {
  args: {
    members: [],
    error: { code: "data_source_unavailable", message: "メンバー情報の取得に失敗しました" },
  },
};

export const Empty: Story = {
  args: {
    members: [],
  },
};
