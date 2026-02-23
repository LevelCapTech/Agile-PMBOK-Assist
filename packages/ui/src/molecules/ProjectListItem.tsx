"use client";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useTheme } from "@mui/material/styles";

import type { ProjectListItemProps } from "@contracts/pages/dashboard";

import { LcStatusChip } from "../atoms/LcStatusChip";
import { LcAvatar } from "../atoms/LcAvatar";
import { LcIcon } from "../atoms/LcIcon";

const statusToneMap = {
  見積: "neutral",
  商談: "warning",
  オープン: "primary",
  保守: "success",
  クローズ: "neutral",
} as const;

export const ProjectListItem = ({ item, onSelect }: ProjectListItemProps) => {
  const theme = useTheme();

  const handleClick = () => {
    onSelect?.(item.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="subtitle1" component="h3" gutterBottom>
            {item.name}
          </Typography>
          <Box className="flex items-center gap-2 mb-4">
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                bgcolor: `${theme.palette.primary.main}0F`,
                borderRadius: "9999px",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                  color: theme.palette.primary.main,
                }}
              >
                {item.code}
              </Typography>
            </Box>
            <LcStatusChip
              status={item.status}
              tone={statusToneMap[item.status]}
            />
          </Box>
          <Box className="mb-4">
            <Box className="flex items-center gap-2 mb-2">
              <LcIcon iconKey="users" size="sm" />
              <Typography variant="caption" color="text.secondary">
                プロジェクトメンバー
              </Typography>
            </Box>
            <Box className="flex items-center">
              <AvatarGroup
                max={4}
                sx={{
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    fontSize: theme.typography.caption.fontSize,
                    border: `2px solid ${theme.palette.background.paper}`,
                  },
                }}
              >
                {item.members.map((member, index) => (
                  <LcAvatar
                    key={index}
                    src={member.avatarUrl}
                    alt={member.name}
                    size="sm"
                  />
                ))}
              </AvatarGroup>
              <Typography variant="body2" className="ml-3">
                {item.members.length}名
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              borderTop: `1px solid ${theme.palette.divider}`,
              pt: 2,
            }}
          >
            <Box className="flex items-center gap-2">
              <LcIcon iconKey="calendar" size="sm" />
              <Typography variant="caption" color="text.secondary">
                開始日:
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                {formatDate(item.startDate)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
