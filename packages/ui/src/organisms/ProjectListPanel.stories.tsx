import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import type { DashboardProjectItem } from "@contracts/dashboard/types";

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
    members: [{ name: "鈴木一郎" }],
  },
];

const meta = {
  title: "Organisms/ProjectListPanel",
  component: ProjectListPanel,
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectListPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "プロジェクト選択",
    projects: sampleProjects,
  },
};

export const Loading: Story = {
  args: {
    title: "プロジェクト選択",
    projects: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("progressbar")).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    title: "プロジェクト選択",
    projects: [],
    error: { code: "FETCH_ERROR", message: "プロジェクトの取得に失敗しました" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("プロジェクトの取得に失敗しました")).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: {
    title: "プロジェクト選択",
    projects: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("プロジェクトがありません")).toBeInTheDocument();
  },
};
