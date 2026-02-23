import type { Meta, StoryObj } from "@storybook/react";

import { LcAvatar } from "./LcAvatar";

const meta: Meta<typeof LcAvatar> = {
  title: "Atoms/LcAvatar",
  component: LcAvatar,
  tags: ["autodocs"],
  args: {
    alt: "田中太郎",
    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof LcAvatar>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    alt: "田中太郎",
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <LcAvatar alt="小" size="sm" />
      <LcAvatar alt="中" size="md" />
      <LcAvatar alt="大" size="lg" />
    </div>
  ),
};
