"use client";

import Typography from "@mui/material/Typography";
import type { TypographyProps } from "@mui/material/Typography";

export const ProjectDetailsSectionTitle = ({
  title,
  component = "h2",
}: {
  title: string;
  component?: TypographyProps["component"];
}) => {
  return (
    <Typography component={component} variant="h6">
      {title}
    </Typography>
  );
};
