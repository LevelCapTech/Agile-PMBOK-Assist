"use client";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import type { DashboardLayoutTemplateProps } from "@contracts/pages/dashboard";

export const DashboardLayoutTemplate = ({
  header,
  sidebar,
  main,
}: DashboardLayoutTemplateProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.paper,
        display: "flex",
      }}
    >
      {sidebar}
      <Box className="flex-1 flex flex-col">
        {header}
        <Box
          component="main"
          className="flex-1 p-8 overflow-y-auto"
          sx={{
            bgcolor: theme.palette.background.default,
          }}
        >
          {main}
        </Box>
      </Box>
    </Box>
  );
};
