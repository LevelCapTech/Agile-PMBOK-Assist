"use client";

import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { LcProjectCodeProps } from "@contracts/pages/dashboard";

export const LcProjectCode = ({ code }: LcProjectCodeProps) => {
  const theme = useTheme();

  return (
    <Typography
      component="span"
      variant="caption"
      data-testid="lc-project-code"
      sx={{ color: theme.palette.text.secondary }}
    >
      {code}
    </Typography>
  );
};
