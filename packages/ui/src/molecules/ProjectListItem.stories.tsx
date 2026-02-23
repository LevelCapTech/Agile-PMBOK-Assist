import type { Meta, StoryObj } from "@storybook/react";

import type { IconResolver, DashboardProjectItem } from "@contracts/pages/dashboard";

import { IconResolverProvider } from "../contexts/IconResolverContext";
import { ProjectListItem } from "./ProjectListItem";

const mockIconResolver: IconResolver = (iconKey: string) => {
  const iconMap: Record<string, string> = {
    users: "👥",
    calendar: "📅",
  };
  return <span>{iconMap[iconKey] || "❓"}</span>;
};

const sampleProject: DashboardProjectItem = {
  id: "1",
  name: "ECサイトリニューアルプロジェクト",
  code: "PRJ-2024-001",
  status: "オープン",
  startDate: "2024-01-15",
  members: [
    { name: "田中太郎", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
    { name: "佐藤花子", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face" },
    { name: "鈴木一郎", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" },
    { name: "高橋美咲", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" },
    { name: "伊藤健太", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
  ],
};

const meta = {
  title: "Molecules/ProjectListItem",
  component: ProjectListItem,
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <div style={{ width: 360 }}>
          <Story />
        </div>
      </IconResolverProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: sampleProject,
  },
};

export const EmptyMembers: Story = {
  args: {
    item: {
      ...sampleProject,
      members: [],
    },
  },
  play: async ({ canvasElement }) => {
    const { within, expect } = await import("storybook/test");
    const canvas = within(canvasElement);
    expect(canvas.getByText("0名")).toBeInTheDocument();
  },
};

export const StatusVariants: Story = {
  args: {
    item: sampleProject,
  },
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: 360 }}>
      <ProjectListItem item={{ ...sampleProject, status: "見積" }} />
      <ProjectListItem item={{ ...sampleProject, status: "商談" }} />
      <ProjectListItem item={{ ...sampleProject, status: "オープン" }} />
      <ProjectListItem item={{ ...sampleProject, status: "保守" }} />
      <ProjectListItem item={{ ...sampleProject, status: "クローズ" }} />
    </div>
  ),
};
