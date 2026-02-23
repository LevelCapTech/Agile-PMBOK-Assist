"use client";

import { Box, CircularProgress, Typography, styled } from "@mui/material";
import type { MemberListPanelProps } from "../../types/dashboard";
import { LcSectionTitle } from "../../atoms/LcSectionTitle";
import { MemberListItem } from "../../molecules/MemberListItem";

const PanelContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const LoadingContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
});

const ErrorContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  color: theme.palette.error.main,
}));

const MemberGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: theme.spacing(2),
}));

export const MemberListPanel = ({
  title,
  members,
  isLoading,
  error,
}: MemberListPanelProps) => {
  return (
    <PanelContainer>
      <LcSectionTitle title={title} />

      {isLoading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : error ? (
        <ErrorContainer>
          <Typography variant="h6" className="mb-2">
            エラーが発生しました
          </Typography>
          <Typography variant="body2">
            {error.code}: {error.message}
          </Typography>
        </ErrorContainer>
      ) : (
        <MemberGrid>
          {members.map((member) => (
            <MemberListItem key={member.id} item={member} />
          ))}
        </MemberGrid>
      )}
    </PanelContainer>
  );
};
