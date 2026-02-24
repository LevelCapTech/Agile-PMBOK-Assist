import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@testing-library/dom";

import { ProjectListPanel } from "./ProjectListPanel";
import { dashboardProjects } from "../stories/dashboardStoryData";

const meta: Meta<typeof ProjectListPanel> = {
  title: "Organisms/ProjectListPanel",
  component: ProjectListPanel,
  tags: ["autodocs"],
  args: {
    title: "プロジェクト一覧",
    projects: dashboardProjects,
  },
};

export default meta;

type Story = StoryObj<typeof ProjectListPanel>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByText("読み込み中...");
  },
};

export const Error: Story = {
  args: {
    error: { code: "data_source_unavailable", message: "取得に失敗しました" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByText("取得に失敗しました");
  },
};

export const Empty: Story = {
  args: {
    projects: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByText("プロジェクトがありません");
  },
};
