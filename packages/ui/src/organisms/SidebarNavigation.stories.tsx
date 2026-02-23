import type { Meta, StoryObj } from "@storybook/react";

import { mockSidebar } from "../stories/dashboardMocks";
import { SidebarNavigation } from "./SidebarNavigation";

const meta: Meta<typeof SidebarNavigation> = {
  title: "Dashboard/Organisms/SidebarNavigation",
  component: SidebarNavigation,
  tags: ["autodocs"],
  args: {
    sidebar: mockSidebar,
  },
};

export default meta;

type Story = StoryObj<typeof SidebarNavigation>;

export const Default: Story = {
  name: "default",
};
