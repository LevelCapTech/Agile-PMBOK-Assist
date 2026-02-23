import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import { mockHeader } from "../stories/dashboardMocks";
import { DashboardHeader } from "./DashboardHeader";

const meta: Meta<typeof DashboardHeader> = {
  title: "Dashboard/Organisms/DashboardHeader",
  component: DashboardHeader,
  tags: ["autodocs"],
  args: {
    header: mockHeader,
    searchQuery: "",
    onSearchChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof DashboardHeader>;

export const Default: Story = {
  name: "default",
};
