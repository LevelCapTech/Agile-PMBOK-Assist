import type { Meta, StoryObj } from "@storybook/react";
import { DashboardHeader } from "./DashboardHeader";
import { IconResolverProvider } from "../../atoms/LcIcon/IconResolverContext";
import { expect, userEvent, within } from "@storybook/test";
import { useState } from "react";

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
  title: "Organisms/DashboardHeader",
  component: DashboardHeader,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <IconResolverProvider resolver={mockIconResolver}>
        <Story />
      </IconResolverProvider>
    ),
  ],
  argTypes: {
    header: {
      description: "ヘッダー情報",
    },
    searchQuery: {
      description: "検索クエリ（親から制御される値）",
    },
    onSearchChange: {
      description: "検索クエリ変更時のコールバック",
    },
  },
} satisfies Meta<typeof DashboardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledWrapper = ({
  header,
  initialQuery = "",
}: {
  header: Story["args"]["header"];
  initialQuery?: string;
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  return (
    <DashboardHeader
      header={header!}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );
};

export const Default: Story = {
  render: () => (
    <ControlledWrapper
      header={{
        title: "ダッシュボード",
        subtitle: "プロジェクト管理システム",
        searchPlaceholder: "プロジェクトを検索...",
        searchQuery: "",
        userName: "田中太郎",
        userAvatarUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("プロジェクトを検索...");

    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, "テスト検索");

    expect(searchInput).toHaveValue("テスト検索");
  },
};

export const WithInitialSearch: Story = {
  render: () => (
    <ControlledWrapper
      header={{
        title: "ダッシュボード",
        subtitle: "プロジェクト管理システム",
        searchPlaceholder: "プロジェクトを検索...",
        searchQuery: "初期検索",
        userName: "佐藤花子",
        userAvatarUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
      }}
      initialQuery="初期検索"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("プロジェクトを検索...");

    expect(searchInput).toHaveValue("初期検索");
  },
};
