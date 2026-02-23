import type { Theme } from "@mui/material/styles";

export type ToneVariant =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "neutral";

export const resolveToneColor = (theme: Theme, tone: ToneVariant = "neutral") => {
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
