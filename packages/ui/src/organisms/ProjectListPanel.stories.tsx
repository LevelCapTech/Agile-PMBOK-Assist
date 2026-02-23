import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, within } from "storybook/test";

import { mockProjects } from "../stories/dashboardMocks";
import { ProjectListPanel } from "./ProjectListPanel";

const meta: Meta<typeof ProjectListPanel> = {
  title: "Dashboard/Organisms/ProjectListPanel",
  component: ProjectListPanel,
  tags: ["autodocs"],
  args: {
    title: "プロジェクト選択",
    projects: mockProjects,
    onSelectProject: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof ProjectListPanel>;

export const Default: Story = {
  name: "default",
};

export const Loading: Story = {
  name: "loading",
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("読み込み中...")).toBeTruthy();
  },
};

export const Error: Story = {
  name: "error",
  args: {
    error: { code: "network", message: "取得に失敗しました" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("取得に失敗しました")).toBeTruthy();
  },
};

export const Empty: Story = {
  name: "empty",
  args: {
    projects: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("表示できるプロジェクトがありません")).toBeTruthy();
  },
};
