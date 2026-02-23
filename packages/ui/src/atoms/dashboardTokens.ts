import type { Theme } from "@mui/material/styles";

export const resolveSizeToPx = (size: "sm" | "md" | "lg" = "md") => {
  if (size === "sm") {
    return 16;
  }

  if (size === "lg") {
    return 32;
  }

  return 24;
};

export const resolveToneColor = (
  theme: Theme,
  tone: "primary" | "success" | "warning" | "error" | "neutral" = "neutral"
) => {
  if (tone === "primary") {
    return theme.palette.primary.main;
  }

  if (tone === "success") {
    return theme.palette.success.main;
  }

  if (tone === "warning") {
    return theme.palette.warning.main;
  }

  if (tone === "error") {
    return theme.palette.error.main;
  }

  return theme.palette.text.secondary;
};
