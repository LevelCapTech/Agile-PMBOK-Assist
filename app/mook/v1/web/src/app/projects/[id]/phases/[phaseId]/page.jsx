"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Edit,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  BarChart3,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { withBase } from "@/utils/withBase";

// サンプルフェーズデータ
const SAMPLE_PHASE_DATA = {
  1: {
    id: 1,
    name: "商談",
    status: "完了",
    progress: 100,
    projectId: 1,
    projectName: "ECサイトリニューアルプロジェクト",
    markdown: `# 商談フェーズ

## 概要
このフェーズでは、クライアントとの初期商談を実施し、プロジェクトの基本的な要件と期待値を確認します。

## 目的
- プロジェクトの全体像の把握
- クライアントのニーズと期待値の確認
- プロジェクトの実現可能性の評価
- 初期予算とスケジュールの概算

## 主な活動
1. **初回ミーティング**
   - クライアントのビジネス課題のヒアリング
   - 現状システムの問題点の確認
   - 期待する成果の明確化

2. **要件の概要把握**
   - 必要な機能の洗い出し
   - 技術的な制約の確認
   - セキュリティ要件の確認

3. **提案書の作成**
   - ソリューションの提案
   - 概算見積もりの作成
   - スケジュール案の提示

## 成果物
- 商談議事録
- 初期要件一覧
- 提案書（初版）
- 概算見積書

## 期間
- 開始日: 2024年1月5日
- 終了日: 2024年1月19日
- 期間: 2週間

## 担当者
- 営業担当: 山田太郎
- 技術営業: 佐藤花子
- プロジェクトマネージャー: 田中太郎

## 成功基準
- クライアントからの提案承認
- 予算枠の確保
- 次フェーズへの合意形成
`,
    tasks: [
      {
        id: 1,
        name: "初回ミーティング",
        startDate: "2024-01-05",
        endDate: "2024-01-08",
        progress: 100,
        assignee: "山田太郎",
      },
      {
        id: 2,
        name: "要件ヒアリング",
        startDate: "2024-01-08",
        endDate: "2024-01-12",
        progress: 100,
        assignee: "佐藤花子",
      },
      {
        id: 3,
        name: "提案書作成",
        startDate: "2024-01-12",
        endDate: "2024-01-16",
        progress: 100,
        assignee: "田中太郎",
      },
      {
        id: 4,
        name: "提案プレゼンテーション",
        startDate: "2024-01-16",
        endDate: "2024-01-19",
        progress: 100,
        assignee: "山田太郎",
      },
    ],
  },
  2: {
    id: 2,
    name: "見積",
    status: "完了",
    progress: 100,
    projectId: 1,
    projectName: "ECサイトリニューアルプロジェクト",
    markdown: `# 見積フェーズ

## 概要
商談フェーズで合意した内容をベースに、詳細な見積を作成します。

## 目的
- 正式な見積書の作成
- 工数と費用の詳細な算出
- 契約条件の確定

## 主な活動
1. 要件の詳細化
2. 工数見積
3. リスク分析
4. 見積書作成

## 成果物
- 正式見積書
- 工数内訳表
- リスク管理表

## 期間
- 開始日: 2024年1月20日
- 終了日: 2024年1月31日

## 担当者
- PM: 田中太郎
- 営業: 山田太郎
`,
    tasks: [
      {
        id: 1,
        name: "要件詳細化",
        startDate: "2024-01-20",
        endDate: "2024-01-24",
        progress: 100,
        assignee: "田中太郎",
      },
      {
        id: 2,
        name: "工数見積",
        startDate: "2024-01-24",
        endDate: "2024-01-27",
        progress: 100,
        assignee: "佐藤花子",
      },
      {
        id: 3,
        name: "見積書作成",
        startDate: "2024-01-27",
        endDate: "2024-01-31",
        progress: 100,
        assignee: "山田太郎",
      },
    ],
  },
  3: {
    id: 3,
    name: "要件定義",
    status: "完了",
    progress: 100,
    projectId: 1,
    projectName: "ECサイトリニューアルプロジェクト",
    markdown: `# 要件定義フェーズ

## 概要
システムの詳細な要件を定義し、開発の基礎を確立します。

## 目的
- 機能要件の詳細定義
- 非機能要件の明確化
- 要件仕様書の作成

## 主な活動
1. 機能要件定義
2. 非機能要件定義
3. 画面遷移図作成
4. データモデル設計

## 成果物
- 要件定義書
- 画面遷移図
- データモデル図
- ユースケース図

## 期間
- 開始日: 2024年2月1日
- 終了日: 2024年2月29日

## 担当者
- PM: 田中太郎
- システムアーキテクト: 鈴木一郎
- ビジネスアナリスト: 佐藤花子
`,
    tasks: [
      {
        id: 1,
        name: "機能要件定義",
        startDate: "2024-02-01",
        endDate: "2024-02-10",
        progress: 100,
        assignee: "佐藤花子",
      },
      {
        id: 2,
        name: "非機能要件定義",
        startDate: "2024-02-08",
        endDate: "2024-02-15",
        progress: 100,
        assignee: "鈴木一郎",
      },
      {
        id: 3,
        name: "画面遷移図作成",
        startDate: "2024-02-12",
        endDate: "2024-02-20",
        progress: 100,
        assignee: "高橋美咲",
      },
      {
        id: 4,
        name: "要件レビュー",
        startDate: "2024-02-20",
        endDate: "2024-02-29",
        progress: 100,
        assignee: "田中太郎",
      },
    ],
  },
  4: {
    id: 4,
    name: "基本設計",
    status: "進行中",
    progress: 60,
    projectId: 1,
    projectName: "ECサイトリニューアルプロジェクト",
    markdown: `# 基本設計フェーズ

## 概要
要件定義をベースに、システムの基本的な設計を行います。

## 目的
- システムアーキテクチャの設計
- データベース設計
- インターフェース設計
- セキュリティ設計

## 主な活動
1. **システムアーキテクチャ設計**
   - レイヤー構造の定義
   - 技術スタックの選定
   - インフラ構成の設計

2. **データベース設計**
   - ER図の作成
   - テーブル定義
   - インデックス設計

3. **API設計**
   - RESTful API設計
   - エンドポイント定義
   - リクエスト/レスポンス仕様

4. **セキュリティ設計**
   - 認証・認可方式の設計
   - データ暗号化方式
   - セキュリティ対策の定義

## 成果物
- 基本設計書
- システムアーキテクチャ図
- ER図
- API仕様書
- セキュリティ設計書

## 期間
- 開始日: 2024年3月1日
- 終了日: 2024年3月31日
- 期間: 1ヶ月

## 担当者
- システムアーキテクト: 鈴木一郎
- データベース設計: 伊藤健太
- セキュリティ担当: 高橋美咲
- PM: 田中太郎

## 進捗状況
✅ システムアーキテクチャ設計完了（100%）
✅ データベース設計完了（100%）
🔄 API設計進行中（70%）
⏳ セキュリティ設計開始前（0%）

## 課題とリスク
- API設計のレビューで一部仕様変更の可能性
- セキュリティ要件の追加確認が必要
`,
    tasks: [
      {
        id: 1,
        name: "システムアーキテクチャ設計",
        startDate: "2024-03-01",
        endDate: "2024-03-10",
        progress: 100,
        assignee: "鈴木一郎",
      },
      {
        id: 2,
        name: "データベース設計",
        startDate: "2024-03-08",
        endDate: "2024-03-18",
        progress: 100,
        assignee: "伊藤健太",
      },
      {
        id: 3,
        name: "API設計",
        startDate: "2024-03-15",
        endDate: "2024-03-25",
        progress: 70,
        assignee: "鈴木一郎",
      },
      {
        id: 4,
        name: "セキュリティ設計",
        startDate: "2024-03-22",
        endDate: "2024-03-31",
        progress: 20,
        assignee: "高橋美咲",
      },
    ],
  },
};

export default function PhaseDetailPage({ params }) {
  const { id: projectId, phaseId } = params;
  const phaseData = SAMPLE_PHASE_DATA[phaseId];

  const handleBack = () => {
    window.location.href = withBase(`/projects/${projectId}`);
  };

  const handleEdit = () => {
    window.location.href = withBase(
      `/projects/${projectId}/phases/${phaseId}/edit`
    );
  };

  if (!phaseData) {
    return (
      <div className="min-h-screen bg-white font-inter flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-black mb-4">
            フェーズが見つかりません
          </h1>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-[#246BFF] text-white text-sm font-semibold rounded-2xl hover:bg-[#1B59E0]"
          >
            プロジェクトに戻る
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "完了":
        return "bg-green-100 text-green-700";
      case "進行中":
        return "bg-blue-100 text-blue-700";
      case "未着手":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // ガントチャート用のデータ計算
  const calculateGanttData = () => {
    if (!phaseData.tasks || phaseData.tasks.length === 0) return null;

    // すべてのタスクの最小日付と最大日付を取得
    const allDates = phaseData.tasks.flatMap((task) => [
      new Date(task.startDate),
      new Date(task.endDate),
    ]);
    const minDate = new Date(Math.min(...allDates));
    const maxDate = new Date(Math.max(...allDates));

    // 日付範囲の計算（余裕を持たせる）
    minDate.setDate(minDate.getDate() - 2);
    maxDate.setDate(maxDate.getDate() + 2);

    const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));

    return {
      minDate,
      maxDate,
      totalDays,
    };
  };

  const ganttData = calculateGanttData();

  const calculateTaskPosition = (startDate, endDate) => {
    if (!ganttData) return { left: 0, width: 0 };

    const taskStart = new Date(startDate);
    const taskEnd = new Date(endDate);

    const startOffset = Math.ceil(
      (taskStart - ganttData.minDate) / (1000 * 60 * 60 * 24),
    );
    const duration = Math.ceil((taskEnd - taskStart) / (1000 * 60 * 60 * 24));

    const left = (startOffset / ganttData.totalDays) * 100;
    const width = (duration / ganttData.totalDays) * 100;

    return { left, width };
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Header */}
      <div className="bg-white border-b border-[#E6E8EB]">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-[#8A8F99] hover:text-[#246BFF] mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-normal">プロジェクトに戻る</span>
          </button>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-semibold text-black">
                  {phaseData.name}
                </h1>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(phaseData.status)}`}
                >
                  {phaseData.status}
                </span>
              </div>
              <p className="text-sm text-[#8A8F99]">{phaseData.projectName}</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right mr-4">
                <div className="text-sm text-[#8A8F99] mb-1">進捗</div>
                <div className="text-3xl font-semibold text-[#246BFF]">
                  {phaseData.progress}%
                </div>
              </div>
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 px-4 py-2 bg-[#246BFF] text-white rounded-2xl hover:bg-[#1B59E0] transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span className="text-xs font-semibold">編集</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Markdown Content */}
        <div className="bg-white border border-[#E6E8EB] rounded-lg p-8 mb-8">
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{phaseData.markdown}</ReactMarkdown>
          </div>
        </div>

        {/* Gantt Chart Section */}
        {phaseData.tasks && phaseData.tasks.length > 0 && ganttData && (
          <div className="bg-white border border-[#E6E8EB] rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-5 h-5 text-[#246BFF]" />
              <h2 className="text-lg font-semibold text-black">
                ガントチャート
              </h2>
            </div>

            {/* Timeline Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-[#8A8F99] mb-2">
                <span>{formatDate(ganttData.minDate)}</span>
                <span>{formatDate(ganttData.maxDate)}</span>
              </div>
              <div className="relative h-2 bg-[#F3F4F6] rounded-full">
                <div className="absolute top-0 left-0 w-full h-full flex">
                  {Array.from({ length: ganttData.totalDays }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 border-r border-white last:border-r-0"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-4">
              {phaseData.tasks.map((task) => {
                const position = calculateTaskPosition(
                  task.startDate,
                  task.endDate,
                );

                return (
                  <div key={task.id} className="space-y-2">
                    {/* Task Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {task.progress === 100 ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        )}
                        <div>
                          <div className="text-sm font-semibold text-black">
                            {task.name}
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-[#8A8F99]">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {formatDate(task.startDate)} -{" "}
                                {formatDate(task.endDate)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{task.assignee}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-[#246BFF]">
                        {task.progress}%
                      </div>
                    </div>

                    {/* Task Bar */}
                    <div className="relative h-8 bg-[#F9FAFB] rounded-lg overflow-hidden">
                      <div
                        className="absolute top-0 h-full bg-[#246BFF] bg-opacity-20 rounded-lg"
                        style={{
                          left: `${position.left}%`,
                          width: `${position.width}%`,
                        }}
                      >
                        <div
                          className="h-full bg-[#246BFF] rounded-lg transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chart Legend */}
            <div className="mt-6 pt-6 border-t border-[#E6E8EB]">
              <div className="flex items-center justify-center space-x-6 text-xs text-[#8A8F99]">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-[#246BFF] bg-opacity-20 rounded"></div>
                  <span>予定期間</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-[#246BFF] rounded"></div>
                  <span>進捗</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>完了</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>進行中</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles for Markdown */}
      <style jsx global>{`
        .prose {
          color: #000;
        }
        .prose h1 {
          font-size: 1.875rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #000;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e6e8eb;
        }
        .prose h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #000;
        }
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          color: #000;
        }
        .prose p {
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
          line-height: 1.75;
        }
        .prose ul,
        .prose ol {
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .prose code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          color: #246bff;
        }
        .prose pre {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .prose pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }
        .prose blockquote {
          border-left: 4px solid #246bff;
          padding-left: 1rem;
          margin-left: 0;
          margin-top: 1rem;
          margin-bottom: 1rem;
          font-style: italic;
          color: #6b7280;
        }
        .prose a {
          color: #246bff;
          text-decoration: underline;
        }
        .prose strong {
          font-weight: 600;
          color: #000;
        }
        .prose hr {
          border-color: #e6e8eb;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .prose th,
        .prose td {
          border: 1px solid #e6e8eb;
          padding: 0.5rem 0.75rem;
          text-align: left;
        }
        .prose th {
          background-color: #f9fafb;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
