import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import type { DashboardProjectItem } from "@contracts/pages/dashboard";

import { ProjectListPanel } from "./ProjectListPanel";

const sampleProjects: DashboardProjectItem[] = [
  {
    id: "1",
    name: "ECサイトリニューアルプロジェクト",
    code: "PRJ-2024-001",
    status: "オープン",
    startDate: "2024年1月15日",
    members: [
      { name: "田中太郎" },
      { name: "佐藤花子" },
    ],
  },
  {
    id: "2",
    name: "モバイルアプリ開発プロジェクト",
    code: "PRJ-2024-002",
    status: "オープン",
    startDate: "2024年2月1日",
    members: [{ name: "山田次郎" }],
  },
  {
    id: "3",
    name: "社内システム統合プロジェクト",
    code: "PRJ-2024-003",
    status: "保守",
    startDate: "2024年3月10日",
    members: [{ name: "小林優子" }, { name: "加藤誠" }],
  },
];

const meta: Meta<typeof ProjectListPanel> = {
  title: "Organisms/ProjectListPanel",
  component: ProjectListPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
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
    isLoading: true,
    projects: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("progressbar")).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    error: { code: "LOAD_FAILED", message: "プロジェクトの読み込みに失敗しました" },
    projects: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("プロジェクトの読み込みに失敗しました")).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: {
    projects: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("プロジェクトがありません")).toBeInTheDocument();
  },
};
