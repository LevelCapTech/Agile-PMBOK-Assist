import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { ProjectListItem } from "./ProjectListItem";
import { withMockIconResolver } from "../../stories/mockIconResolver";

const meta: Meta<typeof ProjectListItem> = {
  title: "Molecules/ProjectListItem",
  component: ProjectListItem,
  tags: ["autodocs"],
  decorators: [withMockIconResolver],
  args: {
    item: {
      id: "1",
      name: "ECサイトリニューアルプロジェクト",
      code: "PRJ-2024-001",
      status: "オープン",
      startDate: "2024年1月15日",
      members: [
        { name: "田中太郎" },
        { name: "佐藤花子" },
        { name: "鈴木一郎" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProjectListItem>;

export const Default: Story = {};

export const EmptyMembers: Story = {
  args: {
    item: {
      id: "2",
      name: "メンバー未割当プロジェクト",
      code: "PRJ-2024-007",
      status: "見積",
      startDate: "2024年7月1日",
      members: [],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole("heading", {
      name: "メンバー未割当プロジェクト",
    });
    expect(heading).toBeInTheDocument();
    const countText = canvas.getByText("0名");
    expect(countText).toBeInTheDocument();
  },
};
