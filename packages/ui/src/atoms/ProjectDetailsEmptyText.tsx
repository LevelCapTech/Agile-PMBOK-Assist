"use client";

import Typography from "@mui/material/Typography";

export const ProjectDetailsEmptyText = ({ text }: { text: string }) => {
  return (
    <Typography variant="body2" color="text.secondary">
      {text}
    </Typography>
  );
};
