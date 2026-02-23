"use client";

import Box from "@mui/material/Box";

import type { LcIconProps } from "@contracts/dashboard/types";

import { useIcon } from "@ui/contexts/IconResolverContext";

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

export const LcIcon = ({ iconKey, size = "md" }: LcIconProps) => {
  const icon = useIcon(iconKey);
  const px = sizeMap[size];

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: px,
        height: px,
        fontSize: px,
        "& > svg": { width: px, height: px },
      }}
    >
      {icon}
    </Box>
  );
};
