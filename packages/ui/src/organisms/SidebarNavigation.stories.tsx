import type { Meta, StoryObj } from "@storybook/react";

import { sampleSidebar } from "../fixtures/dashboard";

import { SidebarNavigation } from "./SidebarNavigation";

const meta: Meta<typeof SidebarNavigation> = {
  title: "Organisms/SidebarNavigation",
  component: SidebarNavigation,
  tags: ["autodocs"],
  args: {
    sidebar: sampleSidebar,
  },
};

export default meta;

type Story = StoryObj<typeof SidebarNavigation>;

export const Default: Story = {};
