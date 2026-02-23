"use client";

import { Box } from "@mui/material";

import type { LcIconProps } from "@contracts/pages/dashboard";

import { useIcon } from "../contexts/IconResolverContext";

const iconSizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const LcIcon = ({ iconKey, size = "md" }: LcIconProps) => {
  const icon = useIcon(iconKey);

  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        color: "inherit",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: iconSizeMap[size],
        width: iconSizeMap[size],
        height: iconSizeMap[size],
        lineHeight: 1,
      }}
    >
      {icon}
    </Box>
  );
};
