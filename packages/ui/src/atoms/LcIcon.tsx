"use client";

import { Box } from "@mui/material";

import type { LcIconProps } from "@contracts/pages/dashboard";

import { resolveSizeToPx } from "./dashboardTokens";
import { useIcon } from "../contexts/IconResolverContext";

export const LcIcon = ({ iconKey, size = "md" }: LcIconProps) => {
  const icon = useIcon(iconKey);
  const iconSize = resolveSizeToPx(size);

  return (
    <Box
      component="span"
      sx={{
        p: 0,
        m: 0,
        fontSize: iconSize,
        color: "text.secondary",
        border: 0,
        background: "transparent",
        width: iconSize,
        height: iconSize,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
      }}
    >
      {icon}
    </Box>
  );
};
