"use client";

import { Box } from "@mui/material";

import type { LcIconProps } from "../types/dashboard";
import { useIconResolver } from "./IconResolverContext";

const SIZE_MAP: Record<NonNullable<LcIconProps["size"]>, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const LcIcon = ({ iconKey, size = "md" }: LcIconProps) => {
  const resolveIcon = useIconResolver();
  const iconSize = SIZE_MAP[size];

  return (
    <Box
      aria-hidden
      data-icon-key={iconKey}
      data-icon-size={size}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: iconSize,
        height: iconSize,
        fontSize: iconSize,
        color: "inherit",
      }}
    >
      {resolveIcon(iconKey)}
    </Box>
  );
};
