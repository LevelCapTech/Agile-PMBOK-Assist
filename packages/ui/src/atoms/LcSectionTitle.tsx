"use client";

import { Box, Typography } from "@mui/material";

import type { LcSectionTitleProps } from "../types/dashboard";

export const LcSectionTitle = ({ title, description }: LcSectionTitleProps) => {
  return (
    <Box className="flex flex-col gap-1">
      <Typography component="h2" variant="h6" color="text.primary">
        {title}
      </Typography>
      {description ? (
        <Typography component="p" variant="body2" color="text.secondary">
          {description}
        </Typography>
      ) : null}
    </Box>
  );
};
