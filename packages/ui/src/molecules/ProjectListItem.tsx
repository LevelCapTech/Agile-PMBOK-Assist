"use client";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import type { ProjectListItemProps } from "@contracts/pages/dashboard";
import { LcStatusChip } from "@ui/atoms/LcStatusChip";
import { LcAvatar } from "@ui/atoms/LcAvatar";
import { LcIcon } from "@ui/atoms/LcIcon";

const STATUS_TONE_MAP = {
  見積: "neutral",
  商談: "warning",
  オープン: "primary",
  保守: "success",
  クローズ: "neutral",
} as const;

export const ProjectListItem = ({ item, onSelect }: ProjectListItemProps) => {
  const tone = STATUS_TONE_MAP[item.status];

  const handleClick = () => {
    onSelect?.(item.id);
  };

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardActionArea onClick={handleClick} disabled={!onSelect}>
        <CardContent>
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            {item.name}
          </Typography>
          <Box className="flex items-center gap-2 mb-2">
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 600 }}
            >
              {item.code}
            </Typography>
            <LcStatusChip status={item.status} tone={tone} />
          </Box>
          <Box className="flex items-center gap-1 mb-1">
            <LcIcon iconKey="users" size="sm" />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              プロジェクトメンバー
            </Typography>
          </Box>
          <Box className="flex items-center gap-2 mb-2">
            {item.members.length > 0 ? (
              <AvatarGroup max={4} sx={{ "& .MuiAvatar-root": { width: 28, height: 28, fontSize: 12 } }}>
                {item.members.map((member) => (
                  <LcAvatar
                    key={member.name}
                    src={member.avatarUrl}
                    alt={member.name}
                    size="sm"
                  />
                ))}
              </AvatarGroup>
            ) : null}
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {item.members.length}名
            </Typography>
          </Box>
          <Box className="flex items-center gap-1">
            <LcIcon iconKey="calendar" size="sm" />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              開始日: {item.startDate}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
