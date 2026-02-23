import type { Meta, StoryObj } from "@storybook/react";

import { LcAvatar } from "./LcAvatar";

const meta: Meta<typeof LcAvatar> = {
  title: "Atoms/LcAvatar",
  component: LcAvatar,
  tags: ["autodocs"],
  args: {
    src: "https://placehold.co/64x64",
    alt: "ダミー",
    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof LcAvatar>;

export const Default: Story = {};

export const SizeVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <LcAvatar src="https://placehold.co/64x64" alt="sm" size="sm" />
      <LcAvatar src="https://placehold.co/64x64" alt="md" size="md" />
      <LcAvatar src="https://placehold.co/64x64" alt="lg" size="lg" />
    </div>
  ),
};
