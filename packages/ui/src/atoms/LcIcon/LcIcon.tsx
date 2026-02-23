"use client";

import Box from "@mui/material/Box";

import type { LcIconProps } from "@contracts/pages/dashboard";
import { useIcon } from "../../contexts/IconResolverContext";

const SIZE_MAP: Record<NonNullable<LcIconProps["size"]>, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const LcIcon = ({ iconKey, size = "md" }: LcIconProps) => {
  const icon = useIcon(iconKey);
  const sizePx = SIZE_MAP[size];

  return (
    <Box
      sx={{
        width: sizePx,
        height: sizePx,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        "& > svg": { width: "100%", height: "100%" },
      }}
    >
      {icon}
    </Box>
  );
};
