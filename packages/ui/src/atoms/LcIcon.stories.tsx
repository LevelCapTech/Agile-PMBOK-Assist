import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { LcIcon } from "./LcIcon";

const meta = {
  title: "Atoms/LcIcon",
  component: LcIcon,
  tags: ["autodocs"],
} satisfies Meta<typeof LcIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconKey: "settings",
    size: "md",
  },
};

export const SizeVariants: Story = {
  args: {
    iconKey: "settings",
    size: "md",
  },
  render: () => (
    <div className="flex items-end gap-4">
      <LcIcon iconKey="settings" size="sm" />
      <LcIcon iconKey="settings" size="md" />
      <LcIcon iconKey="settings" size="lg" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icons = canvas.getAllByText("[settings]");
    expect(icons).toHaveLength(3);
  },
};
