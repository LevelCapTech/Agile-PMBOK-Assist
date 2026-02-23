"use client";

import Box from "@mui/material/Box";
import type { LcIconProps } from "@contracts/pages/dashboard";
import { useIcon } from "@ui/context/IconResolverContext";

const SIZE_MAP = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

export const LcIcon = ({ iconKey, size = "md" }: LcIconProps) => {
  const iconNode = useIcon(iconKey);
  const px = SIZE_MAP[size];

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
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      {iconNode}
    </Box>
  );
};
