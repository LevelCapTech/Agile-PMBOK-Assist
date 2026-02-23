"use client";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import type { LcSectionTitleProps } from "@contracts/pages/dashboard";

export const LcSectionTitle = ({
  title,
  description,
}: LcSectionTitleProps) => {
  return (
    <Box className="mb-2">
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" component="p" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
  );
};
