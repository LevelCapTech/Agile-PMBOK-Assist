import type { Meta, StoryObj } from "@storybook/react";

import { SidebarNavigation } from "./SidebarNavigation";
import { dashboardSidebarView } from "../stories/dashboardStoryData";

const meta: Meta<typeof SidebarNavigation> = {
  title: "Organisms/SidebarNavigation",
  component: SidebarNavigation,
  tags: ["autodocs"],
  args: {
    sidebar: dashboardSidebarView,
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof SidebarNavigation>;

export const Default: Story = {};

export const Expanded: Story = {
  args: {
    variant: "expanded",
  },
};

export const Rail: Story = {
  args: {
    variant: "rail",
  },
};

export const Selected: Story = {
  args: {
    sidebar: {
      ...dashboardSidebarView,
      items: dashboardSidebarView.items.map((item) => ({
        ...item,
        active: item.id === "reports",
      })),
    },
    variant: "expanded",
  },
};
