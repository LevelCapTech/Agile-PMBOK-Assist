import { createTheme } from "@mui/material/styles";
import type { Meta, StoryObj } from "@storybook/react";

import { LcStatusChip } from "./LcStatusChip";

const meta: Meta<typeof LcStatusChip> = {
  title: "Atoms/LcStatusChip",
  component: LcStatusChip,
  tags: ["autodocs"],
  args: {
    status: "稼働中",
    tone: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof LcStatusChip>;

export const Default: Story = {};

const parseColor = (value: string) => {
  if (value.startsWith("#")) {
    const hex = value.replace("#", "");
    const num = Number.parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }
  const matches = value.match(/\d+/g);
  if (!matches) {
    return null;
  }
  return matches.slice(0, 3).map((item) => Number(item));
};

export const ToneVariants: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <LcStatusChip status="Primary" tone="primary" />
      <LcStatusChip status="Success" tone="success" />
      <LcStatusChip status="Warning" tone="warning" />
      <LcStatusChip status="Error" tone="error" />
      <LcStatusChip status="Neutral" tone="neutral" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const theme = createTheme();
    const expected = {
      primary: parseColor(theme.palette.primary.main),
      success: parseColor(theme.palette.success.main),
      warning: parseColor(theme.palette.warning.main),
      error: parseColor(theme.palette.error.main),
      neutral: parseColor(theme.palette.text.secondary),
    };

    const chips = Array.from(
      canvasElement.querySelectorAll<HTMLElement>("[data-tone]"),
    );

    chips.forEach((chip) => {
      const tone = chip.dataset.tone as keyof typeof expected;
      const expectedColor = expected[tone];
      const computed = parseColor(window.getComputedStyle(chip).color ?? "");
      if (!computed || !expectedColor) {
        throw new Error(`tone ${tone} の色が取得できません`);
      }
      const [r, g, b] = expectedColor;
      if (computed[0] !== r || computed[1] !== g || computed[2] !== b) {
        throw new Error(`tone ${tone} の色が一致しません`);
      }
    });
  },
};
