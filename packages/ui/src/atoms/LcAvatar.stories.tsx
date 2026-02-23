import type { Meta, StoryObj } from "@storybook/react";

import { LcAvatar } from "./LcAvatar";

const meta = {
  title: "Atoms/LcAvatar",
  component: LcAvatar,
  tags: ["autodocs"],
} satisfies Meta<typeof LcAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: "テストユーザー",
    size: "md",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "テストユーザー",
    size: "lg",
  },
};

export const SizeVariants: Story = {
  args: {
    alt: "テスト",
    size: "md",
  },
  render: () => (
    <div className="flex items-end gap-4">
      <LcAvatar alt="小" size="sm" />
      <LcAvatar alt="中" size="md" />
      <LcAvatar alt="大" size="lg" />
    </div>
  ),
};
