"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { MemberListItemProps } from "@contracts/pages/dashboard";
import { LcAvatar } from "../../atoms/LcAvatar/LcAvatar";
import { LcStatusChip } from "../../atoms/LcStatusChip/LcStatusChip";
import { LcIcon } from "../../atoms/LcIcon/LcIcon";

const STATUS_TONE_MAP = {
  稼働中: "primary",
  待機中: "warning",
  休暇中: "neutral",
} as const;

export const MemberListItem = ({ item }: MemberListItemProps) => {
  const theme = useTheme();
  const tone = STATUS_TONE_MAP[item.status] ?? "neutral";

  return (
    <Card
      variant="outlined"
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        background: theme.palette.background.paper,
        transition: "box-shadow 0.2s, border-color 0.2s",
        "&:hover": {
          boxShadow: theme.shadows[4],
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <CardContent sx={{ padding: "24px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ mb: 1.5 }}>
            <LcAvatar src={item.avatarUrl} alt={item.displayName} size="lg" />
          </Box>
          <Typography
            variant="subtitle2"
            component="h3"
            sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 0.5 }}
          >
            {item.displayName}
          </Typography>
          <Typography
            variant="caption"
            component="p"
            sx={{ color: theme.palette.text.secondary, mb: 1 }}
          >
            {item.role}
          </Typography>
          <LcStatusChip status={item.status} tone={tone} />
        </Box>

        <Box
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
            pt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <LcIcon iconKey="users" size="sm" />
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.secondary }}
          >
            担当プロジェクト:
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
          >
            {item.projectCount}件
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
