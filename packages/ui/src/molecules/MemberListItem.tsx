"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { MemberListItemProps } from "@contracts/pages/dashboard";
import { LcAvatar } from "@ui/atoms/LcAvatar";
import { LcStatusChip } from "@ui/atoms/LcStatusChip";

const STATUS_TONE_MAP = {
  稼働中: "primary",
  待機中: "warning",
  休暇中: "neutral",
} as const;

export const MemberListItem = ({ item }: MemberListItemProps) => {
  const tone = STATUS_TONE_MAP[item.status];

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Box className="flex flex-col items-center gap-2">
          <LcAvatar src={item.avatarUrl} alt={item.displayName} size="lg" />
          <Typography
            variant="subtitle2"
            component="h3"
            sx={{ fontWeight: 600 }}
          >
            {item.displayName}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {item.role}
          </Typography>
          <LcStatusChip status={item.status} tone={tone} />
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            担当プロジェクト: {item.projectCount}件
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
