"use client";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { SettingActionButtonProps } from "@contracts/pages/dashboard";
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
        height: "100%",
        opacity: isDisabled ? 0.5 : 1,
      }}
    >
      <CardActionArea onClick={handleClick} disabled={isDisabled}>
        <CardContent>
          <Box className="flex flex-col items-start gap-2">
            <LcIcon iconKey={action.iconKey} size="lg" />
            <Typography
              variant="subtitle2"
              component="h3"
              sx={{ fontWeight: 600 }}
            >
              {action.label}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {action.description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
