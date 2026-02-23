"use client";

import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { LcStatusChipProps } from "@contracts/pages/dashboard";

const useToneColor = (
  tone: NonNullable<LcStatusChipProps["tone"]>
): { bg: string; color: string } => {
  const theme = useTheme();
  const map: Record<
    NonNullable<LcStatusChipProps["tone"]>,
    { bg: string; color: string }
  > = {
    primary: {
      bg: `${theme.palette.primary.main}1a`,
      color: theme.palette.primary.main,
    },
    success: {
      bg: `${theme.palette.success.main}1a`,
      color: theme.palette.success.main,
    },
    warning: {
      bg: `${theme.palette.warning.main}1a`,
      color: theme.palette.warning.main,
    },
    error: {
      bg: `${theme.palette.error.main}1a`,
      color: theme.palette.error.main,
    },
    neutral: {
      bg: theme.palette.action.hover,
      color: theme.palette.text.secondary,
    },
  };
  return map[tone];
};

export const LcStatusChip = ({
  status,
  tone = "neutral",
}: LcStatusChipProps) => {
  const { bg, color } = useToneColor(tone);

  return (
    <Chip
      label={
        <Typography
          variant="caption"
          component="span"
          sx={{ color, fontWeight: 600 }}
        >
          {status}
        </Typography>
      }
      size="small"
      sx={{
        backgroundColor: bg,
        border: "none",
        height: 24,
        "& .MuiChip-label": { padding: "0 8px" },
      }}
    />
  );
};
