import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

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
      <span data-testid="icon-sm" className="inline-flex">
        <LcIcon iconKey="search" size="sm" />
      </span>
      <span data-testid="icon-md" className="inline-flex">
        <LcIcon iconKey="search" size="md" />
      </span>
      <span data-testid="icon-lg" className="inline-flex">
        <LcIcon iconKey="search" size="lg" />
      </span>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const smallRect = canvas.getByTestId("icon-sm").getBoundingClientRect();
    const mediumRect = canvas.getByTestId("icon-md").getBoundingClientRect();
    const largeRect = canvas.getByTestId("icon-lg").getBoundingClientRect();

    expect(smallRect.width).toBeLessThan(mediumRect.width);
    expect(mediumRect.width).toBeLessThan(largeRect.width);
  },
};
