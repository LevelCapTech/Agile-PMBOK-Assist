import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { sampleProjects } from "../fixtures/dashboard";

import { ProjectListPanel } from "./ProjectListPanel";

const meta: Meta<typeof ProjectListPanel> = {
  title: "Organisms/ProjectListPanel",
  component: ProjectListPanel,
  tags: ["autodocs"],
  args: {
    title: "プロジェクト一覧",
    projects: sampleProjects,
    onSelectProject: () => undefined,
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
    expect(canvas.getByText("読み込み中...")).toBeTruthy();
  },
};

export const Error: Story = {
  args: {
    error: {
      code: "project_load_failed",
      message: "プロジェクトの取得に失敗しました",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("プロジェクトの取得に失敗しました")).toBeTruthy();
  },
};

export const Empty: Story = {
  args: {
    projects: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("プロジェクトが見つかりません")).toBeTruthy();
  },
};
