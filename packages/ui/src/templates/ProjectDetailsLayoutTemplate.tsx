"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { ReactNode } from "react";

export const ProjectDetailsLayoutTemplate = ({
  header,
  primary,
  secondary,
  footer,
}: {
  header: ReactNode;
  primary: ReactNode;
  secondary: ReactNode;
  footer?: ReactNode;
}) => {
  return (
    <Box sx={{ px: { xs: 3, md: 6 }, py: 4, backgroundColor: "background.default" }}>
      <Stack spacing={4} sx={{ maxWidth: 1280, mx: "auto" }}>
        {header}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 3,
          }}
        >
          <Stack spacing={3}>{primary}</Stack>
          <Stack spacing={3}>{secondary}</Stack>
        </Box>
        {footer}
      </Stack>
    </Box>
  );
};
