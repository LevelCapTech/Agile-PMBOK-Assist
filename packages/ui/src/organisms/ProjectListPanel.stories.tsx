import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import type { IconResolver, DashboardProjectItem } from "@contracts/pages/dashboard";

import { IconResolverProvider } from "../contexts/IconResolverContext";
import { ProjectListPanel } from "./ProjectListPanel";

const mockIconResolver: IconResolver = (iconKey: string) => {
  const iconMap: Record<string, string> = {
    search: "🔍",
    plus: "➕",
    users: "👥",
    calendar: "📅",
  };
  return <span>{iconMap[iconKey] || "❓"}</span>;
};

const sampleProjects: DashboardProjectItem[] = [
  {
    id: "1",
    name: "ECサイトリニューアルプロジェクト",
    code: "PRJ-2024-001",
    status: "オープン",
    startDate: "2024-01-15",
    members: [
      { name: "田中太郎" },
      { name: "佐藤花子" },
      { name: "鈴木一郎" },
    ],
  },
  {
    id: "2",
    name: "モバイルアプリ開発プロジェクト",
    code: "PRJ-2024-002",
    status: "保守",
    startDate: "2024-02-01",
    members: [{ name: "山田次郎" }],
  },
];

const meta = {
  title: "Organisms/ProjectListPanel",
  component: ProjectListPanel,
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <div style={{ width: "100%", minWidth: 800, padding: 16 }}>
          <Story />
        </div>
      </IconResolverProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectListPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "プロジェクト選択",
    projects: sampleProjects,
    onSelectProject: fn(),
  },
};

export const Loading: Story = {
  args: {
    title: "プロジェクト選択",
    projects: [],
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    expect(canvas.getByRole("progressbar")).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: {
    title: "プロジェクト選択",
    projects: [],
    error: {
      code: "DATA_FETCH_ERROR",
      message: "データの取得に失敗しました。再度お試しください。",
    },
  },
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    expect(canvas.getByRole("alert")).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: {
    title: "プロジェクト選択",
    projects: [],
  },
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    expect(canvas.getByText("プロジェクトが見つかりません")).toBeInTheDocument();
  },
};
