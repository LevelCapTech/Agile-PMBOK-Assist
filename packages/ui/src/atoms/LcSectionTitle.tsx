"use client";

import { Typography } from "@mui/material";

import type { LcSectionTitleProps } from "@contracts/pages/dashboard";

export const LcSectionTitle = ({
  title,
  description,
}: LcSectionTitleProps) => {
  return (
    <div className="flex flex-col gap-1">
      <Typography variant="h6" component="h2" color="text.primary">
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" component="p" color="text.secondary">
          {description}
        </Typography>
      ) : null}
    </div>
  );
};
