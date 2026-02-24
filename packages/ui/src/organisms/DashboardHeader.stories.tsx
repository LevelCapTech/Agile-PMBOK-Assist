import type { Meta, StoryObj } from "@storybook/react";

import { DashboardHeader } from "./DashboardHeader";
import { dashboardHeaderView } from "../stories/dashboardStoryData";

const meta: Meta<typeof DashboardHeader> = {
  title: "Organisms/DashboardHeader",
  component: DashboardHeader,
  tags: ["autodocs"],
  args: {
    header: dashboardHeaderView,
    searchQuery: "",
    onSearchChange: () => undefined,
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof DashboardHeader>;

export const Default: Story = {};
