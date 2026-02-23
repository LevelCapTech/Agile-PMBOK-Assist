import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";
import { expect, within } from "storybook/test";

import { LcIcon } from "./LcIcon";
import { withMockIconResolver } from "../../stories/mockIconResolver";

const meta: Meta<typeof LcIcon> = {
  title: "Atoms/LcIcon",
  component: LcIcon,
  tags: ["autodocs"],
  decorators: [withMockIconResolver],
  args: {
    iconKey: "settings",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof LcIcon>;

export const Default: Story = {};

export const SizeVariants: Story = {
  render: () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <LcIcon iconKey="settings" size="sm" />
      <LcIcon iconKey="settings" size="md" />
      <LcIcon iconKey="settings" size="lg" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const iconSymbols = canvas.getAllByText("⚙️");
    expect(iconSymbols.length).toBe(3);
  },
};
