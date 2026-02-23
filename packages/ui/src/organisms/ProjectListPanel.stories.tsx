import type { Meta, StoryObj } from "@storybook/react";

import { sampleProjects } from "../fixtures/dashboardSamples";
import { ProjectListPanel } from "./ProjectListPanel";

const meta: Meta<typeof ProjectListPanel> = {
  title: "Organisms/ProjectListPanel",
  component: ProjectListPanel,
  tags: ["autodocs"],
  args: {
    title: "プロジェクト選択",
    projects: sampleProjects,
  },
};

export default meta;

type Story = StoryObj<typeof ProjectListPanel>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    projects: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    if (!canvasElement.textContent?.includes("読み込み中")) {
      throw new globalThis.Error("ローディング表示が見つかりません");
    }
  },
};

export const Error: Story = {
  args: {
    projects: [],
    error: {
      code: "error",
      message: "プロジェクトの取得に失敗しました",
    },
  },
  play: async ({ canvasElement }) => {
    if (!canvasElement.textContent?.includes("取得に失敗")) {
      throw new globalThis.Error("エラー表示が見つかりません");
    }
  },
};

export const Empty: Story = {
  args: {
    projects: [],
  },
  play: async ({ canvasElement }) => {
    if (!canvasElement.textContent?.includes("プロジェクトがありません")) {
      throw new globalThis.Error("空状態の表示が見つかりません");
    }
  },
};
