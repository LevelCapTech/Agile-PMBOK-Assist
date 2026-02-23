import type { Meta, StoryObj } from "@storybook/react";

import { LcAvatar } from "./LcAvatar";

const meta = {
  title: "Atoms/LcAvatar",
  component: LcAvatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof LcAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    alt: "田中太郎",
    size: "md",
  },
};

export const NoImage: Story = {
  args: {
    alt: "田中太郎",
    size: "md",
  },
};

export const SizeVariants: Story = {
  args: {
    alt: "User",
    size: "md",
  },
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <LcAvatar alt="User" size="sm" />
        <span className="text-xs">sm (24px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LcAvatar alt="User" size="md" />
        <span className="text-xs">md (40px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LcAvatar alt="User" size="lg" />
        <span className="text-xs">lg (64px)</span>
      </div>
    </div>
  ),
};
