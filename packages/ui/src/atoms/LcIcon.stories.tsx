import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { LcIcon } from "./LcIcon";

const meta: Meta<typeof LcIcon> = {
  title: "Atoms/LcIcon",
  component: LcIcon,
  tags: ["autodocs"],
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
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <LcIcon iconKey="settings" size="sm" />
      <LcIcon iconKey="settings" size="md" />
      <LcIcon iconKey="settings" size="lg" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icons = canvas.getAllByLabelText("settings");
    await expect(icons).toHaveLength(3);
  },
};
