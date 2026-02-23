"use client";

import { Box, Card, CardActionArea, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type { ProjectListItemProps } from "../types/dashboard";
import { LcAvatar } from "../atoms/LcAvatar";
import { LcIcon } from "../atoms/LcIcon";
import { LcStatusChip } from "../atoms/LcStatusChip";

const resolveStatusTone = (status: ProjectListItemProps["item"]["status"]) => {
  switch (status) {
    case "見積":
      return "warning";
    case "商談":
      return "primary";
    case "オープン":
      return "success";
    case "保守":
      return "success";
    case "クローズ":
    default:
      return "neutral";
  }
};

export const ProjectListItem = ({ item, onSelect }: ProjectListItemProps) => {
  const theme = useTheme();
  const tone = resolveStatusTone(item.status);
  const members = item.members ?? [];
  const visibleMembers = members.slice(0, 3);
  const extraCount = Math.max(members.length - visibleMembers.length, 0);

  const content = (
    <Box className="flex flex-col gap-3">
      <Box className="flex items-start justify-between gap-2">
        <Box className="flex flex-col gap-1">
          <Typography variant="subtitle1" color="text.primary">
            {item.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {item.code}
          </Typography>
        </Box>
        <LcStatusChip status={item.status} tone={tone} />
      </Box>
      <Divider sx={{ borderColor: theme.palette.divider }} />
      <Box className="flex flex-col gap-2">
        <Box className="flex items-center gap-2" sx={{ color: theme.palette.text.secondary }}>
          <LcIcon iconKey="users" size="sm" />
          <Typography variant="body2" color="text.secondary">
            プロジェクトメンバー
          </Typography>
        </Box>
        {members.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            メンバーなし
          </Typography>
        ) : (
          <Box className="flex items-center gap-2">
            <Box className="flex items-center" sx={{ gap: theme.spacing(0.5) }}>
              {visibleMembers.map((member) => (
                <LcAvatar
                  key={member.name}
                  src={member.avatarUrl}
                  alt={member.name}
                  size="sm"
                />
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {members.length}名
              {extraCount > 0 ? ` (+${extraCount})` : ""}
            </Typography>
          </Box>
        )}
        <Box className="flex items-center gap-2" sx={{ color: theme.palette.text.secondary }}>
          <LcIcon iconKey="calendar" size="sm" />
          <Typography variant="body2" color="text.secondary">
            開始日: {item.startDate}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: theme.palette.divider,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {onSelect ? (
        <CardActionArea
          onClick={() => onSelect(item.id)}
          sx={{ padding: theme.spacing(2) }}
        >
          {content}
        </CardActionArea>
      ) : (
        <Box sx={{ padding: theme.spacing(2) }}>{content}</Box>
      )}
    </Card>
  );
};
