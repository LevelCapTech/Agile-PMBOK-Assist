import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";

import { LcAvatar } from "./LcAvatar";

const meta: Meta<typeof LcAvatar> = {
  title: "Atoms/LcAvatar",
  component: LcAvatar,
  tags: ["autodocs"],
  args: {
    alt: "ユーザー",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof LcAvatar>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    alt: "田中太郎",
    size: "lg",
  },
};

export const SizeVariants: Story = {
  render: () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <LcAvatar alt="sm" size="sm" />
      <LcAvatar alt="md" size="md" />
      <LcAvatar alt="lg" size="lg" />
    </Box>
  ),
};
