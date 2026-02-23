"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { ProjectListItemProps } from "@contracts/pages/dashboard";
import { LcAvatar } from "../../atoms/LcAvatar/LcAvatar";
import { LcStatusChip } from "../../atoms/LcStatusChip/LcStatusChip";
import { LcIcon } from "../../atoms/LcIcon/LcIcon";

const STATUS_TONE_MAP = {
  見積: "neutral",
  商談: "warning",
  オープン: "primary",
  保守: "success",
  クローズ: "neutral",
} as const;

const MAX_VISIBLE_AVATARS = 4;

export const ProjectListItem = ({ item, onSelect }: ProjectListItemProps) => {
  const theme = useTheme();
  const tone = STATUS_TONE_MAP[item.status] ?? "neutral";

  const handleClick = () => {
    onSelect?.(item.id);
  };

  const visibleMembers = item.members.slice(0, MAX_VISIBLE_AVATARS);
  const extraCount = item.members.length - MAX_VISIBLE_AVATARS;

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
      <CardActionArea onClick={handleClick} sx={{ height: "100%" }}>
        <CardContent sx={{ padding: "24px" }}>
          <Typography
            variant="subtitle1"
            component="h2"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 1,
            }}
          >
            {item.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <Box
              sx={{
                px: 1.5,
                py: 0.25,
                bgcolor: `${theme.palette.primary.main}1a`,
                borderRadius: "999px",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
              >
                {item.code}
              </Typography>
            </Box>
            <LcStatusChip status={item.status} tone={tone} />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <LcIcon iconKey="users" size="sm" />
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
              >
                プロジェクトメンバー
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex" }}>
                {visibleMembers.map((member, idx) => (
                  <Box
                    key={idx}
                    sx={{ marginLeft: idx === 0 ? 0 : -1 }}
                  >
                    <LcAvatar
                      src={member.avatarUrl}
                      alt={member.name}
                      size="sm"
                    />
                  </Box>
                ))}
              </Box>
              {extraCount > 0 && (
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: theme.palette.primary.main,
                    ml: -1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.common.white, fontSize: "10px", fontWeight: 600 }}
                  >
                    +{extraCount}
                  </Typography>
                </Box>
              )}
              <Typography
                variant="caption"
                sx={{ ml: 1.5, color: theme.palette.text.primary }}
              >
                {item.members.length}名
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              borderTop: `1px solid ${theme.palette.divider}`,
              pt: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LcIcon iconKey="calendar" size="sm" />
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
            >
              開始日:
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
            >
              {item.startDate}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
