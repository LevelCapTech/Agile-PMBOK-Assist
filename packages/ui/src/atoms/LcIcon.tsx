"use client";

import { Box } from "@mui/material";

import type { LcIconProps } from "../types/dashboard";
import { SIZE_VARIANTS } from "../utils/sizes";
import { useIconResolver } from "./IconResolverContext";

export const LcIcon = ({ iconKey, size = "md" }: LcIconProps) => {
  const resolveIcon = useIconResolver();
  const iconSize = SIZE_VARIANTS[size];

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
