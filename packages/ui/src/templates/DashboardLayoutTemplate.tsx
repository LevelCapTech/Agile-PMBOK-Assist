"use client";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { DashboardLayoutTemplateProps } from "../types/dashboard";

export const DashboardLayoutTemplate = ({
  header,
  sidebar,
  main,
}: DashboardLayoutTemplateProps) => {
  const theme = useTheme();

  return (
    <Box
      className="flex min-h-screen"
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Box>{sidebar}</Box>
      <Box className="flex flex-1 flex-col">
        <Box>{header}</Box>
        <Box sx={{ padding: theme.spacing(3) }}>{main}</Box>
      </Box>
    </Box>
  );
};
