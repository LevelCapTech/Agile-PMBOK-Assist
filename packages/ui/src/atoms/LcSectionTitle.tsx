"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { LcSectionTitleProps } from "@contracts/pages/dashboard";

export const LcSectionTitle = ({
  title,
  description,
}: LcSectionTitleProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Typography
        component="h2"
        variant="h6"
        sx={{
          color: theme.palette.text.primary,
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      {description ? (
        <Typography
          component="p"
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          {description}
        </Typography>
      ) : null}
    </Box>
  );
};
