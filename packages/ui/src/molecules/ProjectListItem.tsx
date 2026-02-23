"use client";

import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import type { ProjectListItemProps } from "@contracts/dashboard/types";

import { LcAvatar } from "@ui/atoms/LcAvatar";
import { LcIcon } from "@ui/atoms/LcIcon";
import { LcStatusChip } from "@ui/atoms/LcStatusChip";

const statusToneMap = {
  見積: "warning",
  商談: "error",
  オープン: "primary",
  保守: "success",
  クローズ: "neutral",
} as const;

export const ProjectListItem = ({
  item,
  onSelect,
}: ProjectListItemProps) => {
  const handleClick = () => {
    onSelect?.(item.id);
  };

  return (
    <Card variant="outlined" sx={{ bgcolor: "background.paper" }}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.primary", fontWeight: "bold" }}
          >
            {item.name}
          </Typography>
          <Box className="mt-1 flex items-center gap-2">
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {item.code}
            </Typography>
            <LcStatusChip
              status={item.status}
              tone={statusToneMap[item.status]}
            />
          </Box>
          <Box className="mt-2 flex items-center gap-1">
            <LcIcon iconKey="users" size="sm" />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              プロジェクトメンバー
            </Typography>
          </Box>
          <Box className="mt-1 flex items-center gap-2">
            <AvatarGroup max={4}>
              {item.members.map((m) => (
                <LcAvatar key={m.name} src={m.avatarUrl} alt={m.name} />
              ))}
            </AvatarGroup>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {item.members.length}名
            </Typography>
          </Box>
          <Box className="mt-2 flex items-center gap-1">
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
