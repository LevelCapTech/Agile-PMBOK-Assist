import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "storybook/test";

import { LcIcon } from "./LcIcon";

const meta: Meta<typeof LcIcon> = {
  title: "Dashboard/Atoms/LcIcon",
  component: LcIcon,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  args: {
    iconKey: "project",
    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof LcIcon>;

export const Default: Story = {
  name: "default",
};

export const SizeVariants: Story = {
  name: "sizeVariants",
  render: () => (
    <Stack data-testid="icon-size-variants" direction="row" spacing={2}>
      <LcIcon iconKey="project" size="sm" />
      <LcIcon iconKey="project" size="md" />
      <LcIcon iconKey="project" size="lg" />
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId("icon-size-variants")).toBeTruthy();
  },
};
