"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const ProjectDetailsPlanItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  );
};
