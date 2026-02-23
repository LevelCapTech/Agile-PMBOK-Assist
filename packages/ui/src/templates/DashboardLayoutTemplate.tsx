"use client";

import Box from "@mui/material/Box";

import type { DashboardLayoutTemplateProps } from "@contracts/dashboard/types";

export const DashboardLayoutTemplate = ({
  header,
  sidebar,
  main,
}: DashboardLayoutTemplateProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateAreas: `"header header" "sidebar main"`,
        gridTemplateColumns: "240px 1fr",
        gridTemplateRows: "auto 1fr",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ gridArea: "header" }}>{header}</Box>
      <Box sx={{ gridArea: "sidebar", overflow: "auto" }}>{sidebar}</Box>
      <Box sx={{ gridArea: "main", overflow: "auto", p: 3 }}>
        {main}
      </Box>
    </Box>
  );
};
