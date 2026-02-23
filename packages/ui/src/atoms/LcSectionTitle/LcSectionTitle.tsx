"use client";

import Typography from "@mui/material/Typography";

import type { LcSectionTitleProps } from "@contracts/pages/dashboard";

export const LcSectionTitle = ({
  title,
  description,
}: LcSectionTitleProps) => {
  return (
    <div className="mb-2">
      <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 0.5 }}>
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
    </div>
  );
};
