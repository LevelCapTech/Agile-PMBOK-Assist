"use client";

import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { MemberListItemProps } from "../types/dashboard";
import { LcAvatar } from "../atoms/LcAvatar";
import { LcStatusChip } from "../atoms/LcStatusChip";

const resolveStatusTone = (status: MemberListItemProps["item"]["status"]) => {
  switch (status) {
    case "稼働中":
      return "primary";
    case "休暇中":
      return "warning";
    case "待機中":
    default:
      return "neutral";
  }
};

export const MemberListItem = ({ item }: MemberListItemProps) => {
  const theme = useTheme();
  const tone = resolveStatusTone(item.status);

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: theme.palette.divider,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2.5),
      }}
    >
      <Box className="flex flex-col items-center gap-2 text-center">
        <LcAvatar
          src={item.avatarUrl}
          alt={item.displayName}
          size="lg"
        />
        <Box className="flex flex-col gap-1">
          <Typography variant="subtitle1" color="text.primary">
            {item.displayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.role}
          </Typography>
        </Box>
        <LcStatusChip status={item.status} tone={tone} />
        <Typography variant="body2" color="text.secondary">
          担当プロジェクト: {item.projectCount}件
        </Typography>
      </Box>
    </Card>
  );
};
