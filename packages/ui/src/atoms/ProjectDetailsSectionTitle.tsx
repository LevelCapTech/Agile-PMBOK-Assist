"use client";

import Typography from "@mui/material/Typography";

export const ProjectDetailsSectionTitle = ({ title }: { title: string }) => {
  return (
    <Typography component="h2" variant="h6" sx={{ fontWeight: 600 }}>
      {title}
    </Typography>
  );
};
