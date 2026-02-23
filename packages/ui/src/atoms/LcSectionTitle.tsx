"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { LcSectionTitleProps } from "@contracts/dashboard/types";

export const LcSectionTitle = ({
  title,
  description,
}: LcSectionTitleProps) => {
  return (
    <Box className="mb-2">
      <Typography variant="h6" component="h2" sx={{ color: "text.primary" }}>
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          component="p"
          sx={{ color: "text.secondary" }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};
