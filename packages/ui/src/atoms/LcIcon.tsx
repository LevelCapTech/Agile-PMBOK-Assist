"use client";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import type { LcIconProps } from "@contracts/pages/dashboard";

import { useIcon } from "../contexts/IconResolverContext";

const iconSizeMap: Record<NonNullable<LcIconProps["size"]>, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const LcIcon = ({ iconKey, size = "md" }: LcIconProps) => {
  const theme = useTheme();
  const resolvedIcon = useIcon(iconKey);
  const iconSize = iconSizeMap[size];

  return (
    <Box
      component="span"
      data-testid="lc-icon"
      data-size={size}
      sx={{
        alignItems: "center",
        color: theme.palette.text.secondary,
        display: "inline-flex",
        fontSize: iconSize,
        height: iconSize,
        justifyContent: "center",
        width: iconSize,
      }}
    >
      {resolvedIcon}
    </Box>
  );
};
