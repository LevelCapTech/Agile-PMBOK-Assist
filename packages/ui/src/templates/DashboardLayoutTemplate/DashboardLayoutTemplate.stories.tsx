import type { Meta, StoryObj } from "@storybook/react";
import { fn, expect, within } from "storybook/test";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { DashboardLayoutTemplate } from "./DashboardLayoutTemplate";
import { DashboardHeader } from "../../organisms/DashboardHeader/DashboardHeader";
import { SidebarNavigation } from "../../organisms/SidebarNavigation/SidebarNavigation";
import { withMockIconResolver } from "../../stories/mockIconResolver";

const HEADER_DATA = {
  title: "ダッシュボード",
  subtitle: "プロジェクトを選択して作業を開始",
  searchPlaceholder: "プロジェクトを検索...",
  searchQuery: "",
  userName: "ユーザー",
};

const SIDEBAR_DATA = {
  title: "メニュー",
  items: [
    { id: "projects", label: "プロジェクト", iconKey: "project", active: true },
    { id: "members", label: "メンバー", iconKey: "member", active: false },
    { id: "stats", label: "統計", iconKey: "stats", active: false },
    { id: "settings", label: "設定", iconKey: "settings", active: false },
  ],
};

const meta: Meta<typeof DashboardLayoutTemplate> = {
  title: "Templates/DashboardLayoutTemplate",
  component: DashboardLayoutTemplate,
  tags: ["autodocs"],
  decorators: [withMockIconResolver],
  parameters: { layout: "fullscreen" },
  args: {
    header: (
      <DashboardHeader
        header={HEADER_DATA}
        searchQuery=""
        onSearchChange={fn()}
      />
    ),
    sidebar: <SidebarNavigation sidebar={SIDEBAR_DATA} />,
    main: (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">メインコンテンツ</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          ここにダッシュボードのコンテンツが表示されます。
        </Typography>
      </Box>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof DashboardLayoutTemplate>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByRole("banner");
    expect(header).toBeInTheDocument();
    const nav = canvas.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    const main = canvas.getByRole("main");
    expect(main).toBeInTheDocument();
  },
};
