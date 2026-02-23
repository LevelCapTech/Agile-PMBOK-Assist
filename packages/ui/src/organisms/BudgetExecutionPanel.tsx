"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import type { BudgetExecutionPanelProps } from "@contracts/pages/dashboard";

import { LcSectionTitle } from "../atoms/LcSectionTitle";
import { BudgetSummaryCard } from "../molecules/BudgetSummaryCard";

export const BudgetExecutionPanel = ({
  title,
  summary,
  series,
  isLoading = false,
  error,
}: BudgetExecutionPanelProps) => {
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box component="section" className="mb-8">
        <LcSectionTitle
          title={title}
          description="全プロジェクトの予算と執行状況の推移"
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
          description="全プロジェクトの予算と執行状況の推移"
        />
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
  }

  return (
    <Box component="section" className="mb-8">
      <Box className="mb-6">
        <LcSectionTitle
          title={title}
          description="全プロジェクトの予算と執行状況の推移"
        />
      </Box>

      <Card
        sx={{
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <CardContent>
          <Box
            sx={{
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: theme.palette.background.default,
              borderRadius: 1,
              mb: 3,
            }}
          >
            <Box className="w-full px-4">
              <Box className="flex justify-between items-end h-48 gap-4">
                {series.map((point, index) => (
                  <Box
                    key={index}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <Box className="flex gap-1 h-32 items-end">
                      <Box
                        sx={{
                          width: 24,
                          bgcolor: theme.palette.primary.main,
                          borderRadius: "4px 4px 0 0",
                          height: `${(point.budget / 22000000) * 100}%`,
                        }}
                      />
                      <Box
                        sx={{
                          width: 24,
                          bgcolor: theme.palette.success.main,
                          borderRadius: "4px 4px 0 0",
                          height: `${(point.actual / 22000000) * 100}%`,
                        }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {point.month}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box className="flex justify-center gap-6 mt-4">
                <Box className="flex items-center gap-2">
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: theme.palette.primary.main,
                      borderRadius: 0.5,
                    }}
                  />
                  <Typography variant="caption">予算</Typography>
                </Box>
                <Box className="flex items-center gap-2">
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: theme.palette.success.main,
                      borderRadius: 0.5,
                    }}
                  />
                  <Typography variant="caption">執行額</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BudgetSummaryCard
              label={`総予算（${series.length}ヶ月）`}
              value={summary.totalBudget}
              tone="primary"
            />
            <BudgetSummaryCard
              label={`総執行額（${series.length}ヶ月）`}
              value={summary.totalActual}
              tone="success"
            />
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: `${theme.palette.warning.main}0F`,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                className="mb-1 block"
              >
                執行率
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: theme.palette.warning.main }}
              >
                {summary.executionRate.toFixed(1)}%
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
