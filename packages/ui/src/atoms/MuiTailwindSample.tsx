"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export const MuiTailwindSample = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        boxShadow: theme.shadows[1],
        color: theme.palette.text.primary,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 448,
        padding: 3,
        textAlign: "left",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography
          component="p"
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          MUI + Tailwind
        </Typography>
        <Typography component="h2" variant="h6" fontWeight={600}>
          スタイル基盤の確認
        </Typography>
        <Typography
          component="p"
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          Tailwindでレイアウトし、MUIでボタンの見た目を管理します。
        </Typography>
      </Box>
      <Stack direction="row" flexWrap="wrap" gap={1.5} alignItems="center">
        <Button sx={{ textTransform: "none" }} variant="contained">
          MUI Button
        </Button>
        <Chip
          label="Tailwind Layout"
          size="small"
          sx={{
            backgroundColor: theme.palette.action.hover,
            color: theme.palette.text.secondary,
            fontWeight: 500,
          }}
        />
      </Stack>
    </Box>
  );
};
