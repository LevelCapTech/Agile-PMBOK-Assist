import type { Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

import type { LcIconButtonProps } from "@contracts/pages/dashboard";

type Tone = NonNullable<LcIconButtonProps["tone"]>;

export const resolveToneColor = (theme: Theme, tone: Tone = "neutral") => {
  switch (tone) {
    case "primary":
      return theme.palette.primary.main;
    case "success":
      return theme.palette.success.main;
    case "warning":
      return theme.palette.warning.main;
    case "error":
      return theme.palette.error.main;
    case "neutral":
    default:
      return theme.palette.text.secondary;
  }
};

export const resolveToneBackground = (
  theme: Theme,
  tone: Tone = "neutral",
  opacity = 0.12,
) => {
  return alpha(resolveToneColor(theme, tone), opacity);
};
