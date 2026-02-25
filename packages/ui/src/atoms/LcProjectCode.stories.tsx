import type { Meta, StoryObj } from "@storybook/react";

import { LcProjectCode } from "./LcProjectCode";

const meta: Meta<typeof LcProjectCode> = {
  title: "Atoms/LcProjectCode",
  component: LcProjectCode,
  tags: ["autodocs"],
  args: {
    code: "PRJ-042",
  },
};

export default meta;

type Story = StoryObj<typeof LcProjectCode>;

export const Default: Story = {};
