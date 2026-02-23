import type { Meta, StoryObj } from "@storybook/react";

import { sampleHeader } from "../fixtures/dashboard";

import { DashboardHeader } from "./DashboardHeader";

const meta: Meta<typeof DashboardHeader> = {
  title: "Organisms/DashboardHeader",
  component: DashboardHeader,
  tags: ["autodocs"],
  args: {
    header: sampleHeader,
    searchQuery: "",
    onSearchChange: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof DashboardHeader>;

export const Default: Story = {};
