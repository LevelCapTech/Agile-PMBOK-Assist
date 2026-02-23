import type { Meta, StoryObj } from "@storybook/react";

import { mockMembers } from "../stories/dashboardMocks";
import { MemberListItem } from "./MemberListItem";

const meta: Meta<typeof MemberListItem> = {
  title: "Dashboard/Molecules/MemberListItem",
  component: MemberListItem,
  tags: ["autodocs"],
  args: {
    item: mockMembers[0],
  },
};

export default meta;

type Story = StoryObj<typeof MemberListItem>;

export const Default: Story = {
  name: "default",
};
