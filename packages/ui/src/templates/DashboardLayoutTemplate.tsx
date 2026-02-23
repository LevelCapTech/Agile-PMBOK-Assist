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
        display: "flex",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {sidebar}
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {header}
        <Box component="main" className="flex-1 p-6">
          {main}
        </Box>
      </Box>
    </Box>
  );
};
