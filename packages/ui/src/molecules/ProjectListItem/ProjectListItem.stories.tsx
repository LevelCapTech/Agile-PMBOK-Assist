import type { Meta, StoryObj } from "@storybook/react";
import { ProjectListItem } from "./ProjectListItem";
import { IconResolverProvider } from "../../atoms/LcIcon/IconResolverContext";
import { expect, userEvent } from "@storybook/test";

const mockIconResolver = (iconKey: string) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#246BFF",
        color: "white",
        fontSize: "10px",
        fontWeight: "bold",
      }}
    >
      {iconKey.substring(0, 2).toUpperCase()}
    </div>
  );
};

const meta = {
  title: "Molecules/ProjectListItem",
  component: ProjectListItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <div style={{ maxWidth: "400px" }}>
          <Story />
        </div>
      </IconResolverProvider>
    ),
  ],
  argTypes: {
    item: {
      description: "プロジェクト情報",
    },
    onSelect: {
      description: "プロジェクト選択時のコールバック",
    },
  },
} satisfies Meta<typeof ProjectListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      id: "PRJ-001",
      name: "ECサイトリニューアルプロジェクト",
      code: "PRJ-2024-001",
      status: "オープン",
      startDate: "2024-01-15",
      members: [
        {
          name: "田中太郎",
          avatarUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        },
        {
          name: "佐藤花子",
          avatarUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
        },
        {
          name: "鈴木一郎",
          avatarUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
        },
      ],
    },
    onSelect: (projectId: string) => {
      console.log("Selected project:", projectId);
    },
  },
  play: async ({ canvasElement }) => {
    const card = canvasElement.querySelector('[role="button"]');
    if (card) {
      await userEvent.click(card);
    }
  },
};

export const EmptyMembers: Story = {
  args: {
    item: {
      id: "PRJ-002",
      name: "新規プロジェクト",
      code: "PRJ-2024-002",
      status: "見積",
      startDate: "2024-06-01",
      members: [],
    },
    onSelect: (projectId: string) => {
      console.log("Selected project:", projectId);
    },
  },
  play: async ({ canvasElement }) => {
    const memberCount = canvasElement.textContent?.includes("0名");
    expect(memberCount).toBeTruthy();
  },
};
