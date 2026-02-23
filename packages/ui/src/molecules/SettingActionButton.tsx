"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import type { SettingActionButtonProps } from "@contracts/dashboard/types";

import { LcIcon } from "@ui/atoms/LcIcon";

export const SettingActionButton = ({
  action,
  disabled = false,
  onClick,
}: SettingActionButtonProps) => {
  const isDisabled = disabled || action.disabled;

  const handleClick = () => {
    if (!isDisabled) {
      onClick?.(action.id);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: "background.paper",
        opacity: isDisabled ? 0.5 : 1,
      }}
    >
      <CardActionArea onClick={handleClick} disabled={isDisabled}>
        <CardContent>
          <Box className="flex flex-col items-center gap-2">
            <LcIcon iconKey={action.iconKey} size="lg" />
            <Typography
              variant="subtitle2"
              component="div"
              sx={{ color: "text.primary", fontWeight: "bold" }}
            >
              {action.label}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", textAlign: "center" }}
            >
              {action.description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
