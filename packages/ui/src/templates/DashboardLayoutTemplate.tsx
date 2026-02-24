"use client";

import Box from "@mui/material/Box";

import type { DashboardLayoutTemplateProps } from "@contracts/pages/dashboard";

export const DashboardLayoutTemplate = ({
  header,
  sidebar,
  main,
}: DashboardLayoutTemplateProps) => {
  return (
    <Box className="flex h-screen w-full flex-col">
      <Box className="flex-shrink-0">{header}</Box>
      <Box className="flex flex-1 overflow-hidden">
        <Box className="flex-shrink-0">{sidebar}</Box>
        <Box
          className="flex-1 overflow-y-auto px-6 py-6"
          sx={{ backgroundColor: "background.default" }}
        >
          {main}
        </Box>
      </Box>
    </Box>
  );
};
