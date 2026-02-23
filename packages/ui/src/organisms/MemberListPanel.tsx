"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { MemberListPanelProps } from "@contracts/pages/dashboard";

import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { LcIcon } from "../atoms/LcIcon";
import { MemberListItem } from "../molecules/MemberListItem";

export const MemberListPanel = ({
  title,
  members,
  isLoading = false,
  error,
}: MemberListPanelProps) => {
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box component="section" className="mb-8">
        <LcSectionTitle
          title={title}
          description="チームメンバーの稼働状況を確認"
        />
        <Box className="flex justify-center py-16">
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box component="section" className="mb-8">
        <LcSectionTitle
          title={title}
          description="チームメンバーの稼働状況を確認"
        />
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
  }

  const isEmpty = members.length === 0;

  return (
    <Box component="section" className="mb-8">
      <Box className="flex items-center justify-between mb-6">
        <LcSectionTitle
          title={title}
          description="チームメンバーの稼働状況を確認"
        />
        <Button
          variant="contained"
          startIcon={<LcIcon iconKey="plus" size="sm" />}
          sx={{ borderRadius: 4 }}
        >
          メンバー追加
        </Button>
      </Box>

      {isEmpty ? (
        <Box className="text-center py-16">
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              bgcolor: `${theme.palette.primary.main}0F`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <LcIcon iconKey="users" size="lg" />
          </Box>
          <Typography variant="subtitle1" fontWeight="bold" className="mb-2">
            メンバーが登録されていません
          </Typography>
          <Typography variant="caption" color="text.secondary">
            メンバーを追加してください
          </Typography>
        </Box>
      ) : (
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <MemberListItem key={member.id} item={member} />
          ))}
        </Box>
      )}
    </Box>
  );
};
