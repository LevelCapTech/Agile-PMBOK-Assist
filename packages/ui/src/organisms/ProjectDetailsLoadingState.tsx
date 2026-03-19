"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const ProjectDetailsLoadingState = () => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body1" color="text.secondary">
        読み込み中...
      </Typography>
    </Box>
  );
};
