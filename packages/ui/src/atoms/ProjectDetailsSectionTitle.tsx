"use client";

import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export const ProjectDetailsSectionTitle = ({ title }: { title: string }) => {
  const theme = useTheme();

  return (
    <Typography
      component="h2"
      variant="h6"
      sx={{ fontWeight: theme.typography.fontWeightBold }}
    >
      {title}
    </Typography>
  );
};
