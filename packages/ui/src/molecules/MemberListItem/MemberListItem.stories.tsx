import type { Meta, StoryObj } from "@storybook/react";

import { MemberListItem } from "./MemberListItem";
import { withMockIconResolver } from "../../stories/mockIconResolver";

const meta: Meta<typeof MemberListItem> = {
  title: "Molecules/MemberListItem",
  component: MemberListItem,
  tags: ["autodocs"],
  decorators: [withMockIconResolver],
  args: {
    item: {
      id: "1",
      displayName: "田中太郎",
      role: "プロジェクトマネージャー",
      status: "稼働中",
      projectCount: 3,
    },
  },
};

export default meta;
type Story = StoryObj<typeof MemberListItem>;

export const Default: Story = {};

export const Waiting: Story = {
  args: {
    item: {
      id: "2",
      displayName: "鈴木一郎",
      role: "バックエンドエンジニア",
      status: "待機中",
      projectCount: 1,
    },
  },
};

export const OnVacation: Story = {
  args: {
    item: {
      id: "3",
      displayName: "伊藤健太",
      role: "フルスタックエンジニア",
      status: "休暇中",
      projectCount: 0,
    },
  },
};
