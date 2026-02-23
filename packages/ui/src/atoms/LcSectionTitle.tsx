"use client";

import { Stack, Typography } from "@mui/material";

import type { LcSectionTitleProps } from "@contracts/pages/dashboard";

export const LcSectionTitle = ({ title, description }: LcSectionTitleProps) => {
  return (
    <Stack className="py-1" spacing={0.5}>
      <Typography color="text.primary" component="h2" variant="h6">
        {title}
      </Typography>
      {description ? (
        <Typography color="text.secondary" component="p" variant="body2">
          {description}
        </Typography>
      ) : null}
    </Stack>
  );
};
