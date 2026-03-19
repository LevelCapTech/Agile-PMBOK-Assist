import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@testing-library/react";

import type { ProjectDetailsPageData } from "@contracts/pages/project-details";

import { ProjectDetailsPage } from "./ProjectDetailsPage";

const sampleData: ProjectDetailsPageData = {
  header: {
    id: "1",
    name: "ECサイトリニューアルプロジェクト",
    code: "PRJ-2024-001",
    startDate: "2024年1月15日",
  },
  phases: [
    { id: "phase-1", name: "要件定義", status: "DONE", progress: 100 },
    { id: "phase-2", name: "基本設計", status: "IN_PROGRESS", progress: 60 },
    { id: "phase-3", name: "詳細設計", status: "NOT_STARTED", progress: 0 },
  ],
  members: [
    { id: "member-1", name: "田中太郎", role: "PM", avatarUrl: null },
    { id: "member-2", name: "佐藤花子", role: "デザイナー", avatarUrl: null },
  ],
  meetings: [
    {
      id: "meeting-1",
      name: "週次定例ミーティング",
      dayOfWeek: "MON",
      timeRange: "14:00-15:00",
    },
  ],
  plan: [
    {
      id: "plan-basic",
      title: "基本情報",
      items: [
        { label: "発注元", value: "ABC株式会社" },
        { label: "プロジェクトマネージャー", value: "田中太郎" },
      ],
    },
  ],
  overallProgress: {
    percentage: 53,
    completedCount: 1,
    inProgressCount: 1,
    notStartedCount: 1,
  },
};

const meta: Meta<typeof ProjectDetailsPage> = {
  title: "Pages/ProjectDetailsPage",
  component: ProjectDetailsPage,
  tags: ["autodocs"],
  args: {
    data: sampleData,
  },
};

export default meta;

type Story = StoryObj<typeof ProjectDetailsPage>;

export const Normal: Story = {};

export const EmptyMeetings: Story = {
  args: {
    data: {
      ...sampleData,
      meetings: [],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText("会議体がありません");
  },
};

export const NotFound: Story = {
  args: {
    data: undefined,
    error: {
      code: "NOT_FOUND",
      message: "プロジェクトが見つかりません。",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText("プロジェクトが見つかりません。");
  },
};

export const NetworkError: Story = {
  args: {
    data: undefined,
    error: {
      code: "NETWORK",
      message: "通信に失敗しました。",
    },
    onRetry: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText("通信に失敗しました。");
    await canvas.findByRole("button", { name: "再読み込み" });
  },
};
