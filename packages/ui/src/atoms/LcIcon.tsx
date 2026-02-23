"use client";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import type { LcIconProps } from "@contracts/pages/dashboard";

import { useIcon } from "../contexts/IconResolverContext";

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

export const LcIcon = ({ iconKey, size = "md" }: LcIconProps) => {
  const theme = useTheme();
  const iconElement = useIcon(iconKey);
  const dimension = sizeMap[size];

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dimension,
        height: dimension,
        color: theme.palette.text.secondary,
        "& > svg": {
          width: "100%",
          height: "100%",
        },
      }}
    >
      {iconElement}
    </Box>
  );
};
