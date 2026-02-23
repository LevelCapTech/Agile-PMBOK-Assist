import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { appTheme } from "@app/providers/appTheme";

import { LcStatusChip } from "./LcStatusChip";

const normalizeColor = (value: string) => value.replace(/\s/g, "").toLowerCase();

const toRgb = (value: string) => {
  if (!value.startsWith("#")) {
    return value;
  }

  const hex = value.replace("#", "");
  const normalized = hex.length === 3
    ? hex
        .split("")
        .map((char) => char + char)
        .join("")
    : hex;
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`;
};

const meta: Meta<typeof LcStatusChip> = {
  title: "Atoms/LcStatusChip",
  component: LcStatusChip,
  tags: ["autodocs"],
  args: {
    status: "オープン",
    tone: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof LcStatusChip>;

export const Default: Story = {};

export const ToneVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <LcStatusChip status="primary" tone="primary" />
      <LcStatusChip status="success" tone="success" />
      <LcStatusChip status="warning" tone="warning" />
      <LcStatusChip status="error" tone="error" />
      <LcStatusChip status="neutral" tone="neutral" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const primaryChip = canvas
      .getByText("primary")
      .closest(".MuiChip-root") as HTMLElement | null;
    const successChip = canvas
      .getByText("success")
      .closest(".MuiChip-root") as HTMLElement | null;
    const warningChip = canvas
      .getByText("warning")
      .closest(".MuiChip-root") as HTMLElement | null;

    expect(primaryChip).not.toBeNull();
    expect(successChip).not.toBeNull();
    expect(warningChip).not.toBeNull();

    if (primaryChip && successChip && warningChip) {
      expect(normalizeColor(getComputedStyle(primaryChip).color)).toBe(
        normalizeColor(toRgb(appTheme.palette.primary.main)),
      );
      expect(normalizeColor(getComputedStyle(successChip).color)).toBe(
        normalizeColor(toRgb(appTheme.palette.success.main)),
      );
      expect(normalizeColor(getComputedStyle(warningChip).color)).toBe(
        normalizeColor(toRgb(appTheme.palette.warning.main)),
      );
    }
  },
};
