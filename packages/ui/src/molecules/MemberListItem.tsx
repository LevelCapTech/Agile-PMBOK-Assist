"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import type { MemberListItemProps } from "@contracts/pages/dashboard";

import { LcAvatar } from "../atoms/LcAvatar";
import { LcStatusChip } from "../atoms/LcStatusChip";
import { LcIcon } from "../atoms/LcIcon";

const statusToneMap = {
  稼働中: "primary",
  待機中: "warning",
  休暇中: "neutral",
} as const;

export const MemberListItem = ({ item }: MemberListItemProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        "&:hover": {
          borderColor: theme.palette.primary.main,
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent>
        <Box className="flex flex-col items-center mb-4">
          <LcAvatar src={item.avatarUrl} alt={item.displayName} size="lg" />
          <Typography variant="subtitle1" component="h3" className="mt-3 mb-1">
            {item.displayName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {item.role}
          </Typography>
        </Box>
        <Box className="flex justify-center mb-4">
          <LcStatusChip
            status={item.status}
            tone={statusToneMap[item.status]}
          />
        </Box>
        <Box className="flex items-center justify-center gap-2">
          <LcIcon iconKey="folder" size="sm" />
          <Typography variant="caption" color="text.secondary">
            担当プロジェクト:
          </Typography>
          <Typography variant="caption" fontWeight="bold">
            {item.projectCount}件
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
