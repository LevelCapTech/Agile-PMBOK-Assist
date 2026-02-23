import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";

import { LcAvatar } from "./LcAvatar";

const meta: Meta<typeof LcAvatar> = {
  title: "Dashboard/Atoms/LcAvatar",
  component: LcAvatar,
  tags: ["autodocs"],
  args: {
    alt: "田中太郎",
    src: "https://i.pravatar.cc/80?img=1",
    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof LcAvatar>;

export const Default: Story = {
  name: "default",
};

export const SizeVariants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <LcAvatar alt="sm" size="sm" src="https://i.pravatar.cc/80?img=1" />
      <LcAvatar alt="md" size="md" src="https://i.pravatar.cc/80?img=2" />
      <LcAvatar alt="lg" size="lg" src="https://i.pravatar.cc/80?img=3" />
    </Stack>
  ),
};
