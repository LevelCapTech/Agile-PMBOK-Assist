import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { sampleHeader } from "../fixtures/dashboardSamples";
import { DashboardHeader } from "./DashboardHeader";

const DashboardHeaderStory = (args: Parameters<typeof DashboardHeader>[0]) => {
  const [query, setQuery] = useState(args.searchQuery);
  return (
    <DashboardHeader
      {...args}
      searchQuery={query}
      onSearchChange={setQuery}
    />
  );
};

const meta: Meta<typeof DashboardHeader> = {
  title: "Organisms/DashboardHeader",
  component: DashboardHeader,
  tags: ["autodocs"],
  args: {
    header: sampleHeader,
    searchQuery: "",
    onSearchChange: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof DashboardHeader>;

export const Default: Story = {
  render: (args) => <DashboardHeaderStory {...args} />,
};
