import type { Meta, StoryObj } from "@storybook/react";

import { sampleMembers } from "../fixtures/dashboardSamples";
import { MemberListItem } from "./MemberListItem";

const meta: Meta<typeof MemberListItem> = {
  title: "Molecules/MemberListItem",
  component: MemberListItem,
  tags: ["autodocs"],
  args: {
    item: sampleMembers[0],
  },
};

export default meta;

type Story = StoryObj<typeof MemberListItem>;

export const Default: Story = {};
