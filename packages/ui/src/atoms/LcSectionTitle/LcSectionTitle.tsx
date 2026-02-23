"use client";

import { Typography } from "@mui/material";
import type { LcSectionTitleProps } from "../../types/dashboard";

export const LcSectionTitle = ({ title, description }: LcSectionTitleProps) => {
  return (
    <div className="mb-4">
      <Typography variant="h6" component="h2" className="mb-1">
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" component="p" color="text.secondary">
          {description}
        </Typography>
      )}
    </div>
  );
};
