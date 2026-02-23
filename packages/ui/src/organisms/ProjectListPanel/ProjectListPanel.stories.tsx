import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { ProjectListPanel } from "./ProjectListPanel";
import { withMockIconResolver } from "../../stories/mockIconResolver";

const SAMPLE_PROJECTS = [
  {
    id: "1",
    name: "ECサイトリニューアルプロジェクト",
    code: "PRJ-2024-001",
    status: "オープン" as const,
    startDate: "2024年1月15日",
    members: [{ name: "田中太郎" }, { name: "佐藤花子" }],
  },
  {
    id: "2",
    name: "モバイルアプリ開発プロジェクト",
    code: "PRJ-2024-002",
    status: "オープン" as const,
    startDate: "2024年2月1日",
    members: [{ name: "鈴木一郎" }],
  },
];

const meta: Meta<typeof ProjectListPanel> = {
  title: "Organisms/ProjectListPanel",
  component: ProjectListPanel,
  tags: ["autodocs"],
  decorators: [withMockIconResolver],
  args: {
    title: "プロジェクト選択",
    projects: SAMPLE_PROJECTS,
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
    const loader = canvas.getByRole("status");
    expect(loader).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    projects: [],
    error: { code: "data_source_unavailable", message: "データの取得に失敗しました" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("データの取得に失敗しました");
  },
};

export const Empty: Story = {
  args: {
    projects: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emptyMessage = canvas.getByText("プロジェクトが見つかりません");
    expect(emptyMessage).toBeInTheDocument();
  },
};
