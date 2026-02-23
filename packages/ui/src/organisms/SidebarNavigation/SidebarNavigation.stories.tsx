import type { Meta, StoryObj } from "@storybook/react";

import { SidebarNavigation } from "./SidebarNavigation";
import { withMockIconResolver } from "../../stories/mockIconResolver";

const meta: Meta<typeof SidebarNavigation> = {
  title: "Organisms/SidebarNavigation",
  component: SidebarNavigation,
  tags: ["autodocs"],
  decorators: [withMockIconResolver],
  args: {
    sidebar: {
      title: "メニュー",
      items: [
        { id: "projects", label: "プロジェクト", iconKey: "project", active: true },
        { id: "members", label: "メンバー", iconKey: "member", active: false },
        { id: "stats", label: "統計", iconKey: "stats", active: false },
        { id: "settings", label: "設定", iconKey: "settings", active: false },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarNavigation>;

export const Default: Story = {};
