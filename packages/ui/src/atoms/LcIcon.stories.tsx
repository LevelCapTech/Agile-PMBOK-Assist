import type { Meta, StoryObj } from "@storybook/react";

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
    const icons = Array.from(
      canvasElement.querySelectorAll<HTMLElement>("[data-icon-size]"),
    );
    const expectedSizes: Record<string, string> = {
      sm: "16px",
      md: "24px",
      lg: "32px",
    };

    icons.forEach((icon) => {
      const sizeKey = icon.dataset.iconSize ?? "";
      const width = window.getComputedStyle(icon).width;
      if (width !== expectedSizes[sizeKey]) {
        throw new Error(`Icon size mismatch: ${sizeKey} -> ${width}`);
      }
    });
  },
};
