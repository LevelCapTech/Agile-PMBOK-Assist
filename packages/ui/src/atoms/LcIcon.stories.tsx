import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@testing-library/dom";

import { LcIcon } from "./LcIcon";

const meta: Meta<typeof LcIcon> = {
  title: "Atoms/LcIcon",
  component: LcIcon,
  tags: ["autodocs"],
  args: {
    iconKey: "search",
    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof LcIcon>;

export const Default: Story = {};

export const SizeVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <LcIcon iconKey="search" size="sm" />
      <LcIcon iconKey="search" size="md" />
      <LcIcon iconKey="search" size="lg" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icons = canvas.getAllByTestId("lc-icon");
    const sizes = icons.map(
      (icon) => window.getComputedStyle(icon).width,
    );
    if (sizes[0] !== "16px" || sizes[1] !== "24px" || sizes[2] !== "32px") {
      throw new Error("LcIconのサイズバリアントが適用されていません。");
    }
  },
};
