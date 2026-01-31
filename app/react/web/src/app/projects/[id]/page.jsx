"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  GripVertical,
  Plus,
  ChevronDown,
  Edit,
  Printer,
} from "lucide-react";

// サンプルデータ（トップページと同じ）
const SAMPLE_PROJECTS = [
  {
    id: 1,
    name: "ECサイトリニューアルプロジェクト",
    code: "PRJ-2024-001",
    start_date: "2024-01-15",
    members: [
      {
        name: "田中太郎",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "佐藤花子",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "鈴木一郎",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "高橋美咲",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "伊藤健太",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
    ],
    meetings: [
      {
        id: 1,
        dayOfWeek: "月曜日",
        time: "14:00-15:00",
        name: "週次定例ミーティング",
      },
      {
        id: 2,
        dayOfWeek: "水曜日",
        time: "10:00-11:00",
        name: "技術レビュー会議",
      },
      {
        id: 3,
        dayOfWeek: "金曜日",
        time: "16:00-17:00",
        name: "進捗報告会",
      },
    ],
    phases: [
      { id: 1, name: "商談", status: "完了", progress: 100 },
      { id: 2, name: "見積", status: "完了", progress: 100 },
      { id: 3, name: "要件定義", status: "完了", progress: 100 },
      { id: 4, name: "基本設計", status: "進行中", progress: 60 },
      { id: 5, name: "詳細設計", status: "未着手", progress: 0 },
      { id: 6, name: "実装", status: "未着手", progress: 0 },
      { id: 7, name: "テスト", status: "未着手", progress: 0 },
      { id: 8, name: "リリース", status: "未着手", progress: 0 },
      { id: 9, name: "不具合対応", status: "未着手", progress: 0 },
      { id: 10, name: "保守", status: "未着手", progress: 0 },
    ],
  },
  {
    id: 2,
    name: "モバイルアプリ開発プロジェクト",
    code: "PRJ-2024-002",
    start_date: "2024-02-01",
    members: [
      {
        name: "山田次郎",
        avatar:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "渡辺麻美",
        avatar:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "中村大輔",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
      },
    ],
    meetings: [
      {
        id: 1,
        dayOfWeek: "火曜日",
        time: "15:00-16:00",
        name: "デイリースタンドアップ",
      },
      {
        id: 2,
        dayOfWeek: "木曜日",
        time: "13:00-14:00",
        name: "スプリントレビュー",
      },
    ],
    phases: [
      { id: 1, name: "商談", status: "完了", progress: 100 },
      { id: 2, name: "見積", status: "完了", progress: 100 },
      { id: 3, name: "要件定義", status: "完了", progress: 100 },
      { id: 4, name: "基本設計", status: "完了", progress: 100 },
      { id: 5, name: "詳細設計", status: "完了", progress: 100 },
      { id: 6, name: "実装", status: "進行中", progress: 45 },
      { id: 7, name: "テスト", status: "未着手", progress: 0 },
      { id: 8, name: "リリース", status: "未着手", progress: 0 },
      { id: 9, name: "不具合対応", status: "未着手", progress: 0 },
      { id: 10, name: "保守", status: "未着手", progress: 0 },
    ],
  },
  {
    id: 3,
    name: "社内システム統合プロジェクト",
    code: "PRJ-2024-003",
    start_date: "2024-03-10",
    members: [
      {
        name: "小林優子",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "加藤誠",
        avatar:
          "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "吉田理恵",
        avatar:
          "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "森田健",
        avatar:
          "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=40&h=40&fit=crop&crop=face",
      },
    ],
    phases: [
      { id: 1, name: "商談", status: "完了", progress: 100 },
      { id: 2, name: "見積", status: "完了", progress: 100 },
      { id: 3, name: "要件定義", status: "完了", progress: 100 },
      { id: 4, name: "基本設計", status: "進行中", progress: 30 },
      { id: 5, name: "詳細設計", status: "未着手", progress: 0 },
      { id: 6, name: "実装", status: "未着手", progress: 0 },
      { id: 7, name: "テスト", status: "未着手", progress: 0 },
      { id: 8, name: "リリース", status: "未着手", progress: 0 },
      { id: 9, name: "不具合対応", status: "未着手", progress: 0 },
      { id: 10, name: "保守", status: "未着手", progress: 0 },
    ],
  },
  {
    id: 4,
    name: "データ分析基盤構築",
    code: "PRJ-2024-004",
    start_date: "2024-04-01",
    members: [
      {
        name: "清水智子",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "池田浩",
        avatar:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face",
      },
    ],
    phases: [
      { id: 1, name: "商談", status: "完了", progress: 100 },
      { id: 2, name: "見積", status: "進行中", progress: 70 },
      { id: 3, name: "要件定義", status: "未着手", progress: 0 },
      { id: 4, name: "基本設計", status: "未着手", progress: 0 },
      { id: 5, name: "詳細設計", status: "未着手", progress: 0 },
      { id: 6, name: "実装", status: "未着手", progress: 0 },
      { id: 7, name: "テスト", status: "未着手", progress: 0 },
      { id: 8, name: "リリース", status: "未着手", progress: 0 },
      { id: 9, name: "不具合対応", status: "未着手", progress: 0 },
      { id: 10, name: "保守", status: "未着手", progress: 0 },
    ],
  },
  {
    id: 5,
    name: "顧客管理システム刷新",
    code: "PRJ-2024-005",
    start_date: "2024-05-15",
    members: [
      {
        name: "岡田真由美",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "前田章",
        avatar:
          "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "藤田直美",
        avatar:
          "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "後藤修一",
        avatar:
          "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "松本絵里",
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "村田隆",
        avatar:
          "https://images.unsplash.com/photo-1502378735452-bc7d86632805?w=40&h=40&fit=crop&crop=face",
      },
    ],
    phases: [
      { id: 1, name: "商談", status: "完了", progress: 100 },
      { id: 2, name: "見積", status: "完了", progress: 100 },
      { id: 3, name: "要件定義", status: "完了", progress: 100 },
      { id: 4, name: "基本設計", status: "完了", progress: 100 },
      { id: 5, name: "詳細設計", status: "完了", progress: 100 },
      { id: 6, name: "実装", status: "完了", progress: 100 },
      { id: 7, name: "テスト", status: "完了", progress: 100 },
      { id: 8, name: "リリース", status: "進行中", progress: 55 },
      { id: 9, name: "不具合対応", status: "未着手", progress: 0 },
      { id: 10, name: "保守", status: "未着手", progress: 0 },
    ],
  },
  {
    id: 6,
    name: "セキュリティ強化プロジェクト",
    code: "PRJ-2024-006",
    start_date: "2024-06-01",
    members: [
      {
        name: "斎藤雄一",
        avatar:
          "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "木村さくら",
        avatar:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=40&h=40&fit=crop&crop=face",
      },
      {
        name: "林大樹",
        avatar:
          "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=40&h=40&fit=crop&crop=face",
      },
    ],
    phases: [
      { id: 1, name: "商談", status: "進行中", progress: 40 },
      { id: 2, name: "見積", status: "未着手", progress: 0 },
      { id: 3, name: "要件定義", status: "未着手", progress: 0 },
      { id: 4, name: "基本設計", status: "未着手", progress: 0 },
      { id: 5, name: "詳細設計", status: "未着手", progress: 0 },
      { id: 6, name: "実装", status: "未着手", progress: 0 },
      { id: 7, name: "テスト", status: "未着手", progress: 0 },
      { id: 8, name: "リリース", status: "未着手", progress: 0 },
      { id: 9, name: "不具合対応", status: "未着手", progress: 0 },
      { id: 10, name: "保守", status: "未着手", progress: 0 },
    ],
  },
];

export default function ProjectDetailPage({ params }) {
  const projectId = parseInt(params.id);
  const project = SAMPLE_PROJECTS.find((p) => p.id === projectId);

  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    purpose: false,
    scope: false,
    deliverables: false,
    organization: false,
    schedule: false,
    risks: false,
    quality: false,
  });

  const handleBack = () => {
    window.location.href = "/";
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddPhase = () => {
    window.location.href = `/projects/${params.id}/phases/new`;
  };

  const handleProjectClick = (projectId) => {
    window.location.href = `/projects/${projectId}`;
  };

  const handlePhaseClick = (phaseId) => {
    window.location.href = `/projects/${params.id}/phases/${phaseId}`;
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-white font-inter flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-black mb-4">
            プロジェクトが見つかりません
          </h1>
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-[#246BFF] text-white text-sm font-semibold rounded-2xl hover:bg-[#1B59E0]"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // プロジェクト計画のサンプルデータ
  const projectPlan = {
    basic: {
      プロジェクト名: project.name,
      発注元: "ABC株式会社",
      プロジェクトマネージャー: "田中太郎",
      主要メンバー: "佐藤花子、鈴木一郎、高橋美咲",
      開始日: formatDate(project.start_date),
      終了予定日: "2024-12-31",
    },
    purpose: {
      なぜこの開発を行うか:
        "既存システムの老朽化に伴い、ユーザーエクスペリエンスの向上と業務効率化を実現するため",
      期待する成果:
        "ユーザー満足度20%向上、業務処理時間30%削減、保守コスト40%削減",
    },
    scope: {
      "対象システム・業務":
        "顧客管理システム、注文管理システム、在庫管理システム",
      開発範囲: "フロントエンド、バックエンド、データベース、API",
      除外範囲: "既存レガシーシステムとの連携、帳票出力機能",
    },
    deliverables: {
      "納品するシステム・ドキュメント一覧":
        "• システムソースコード\n• ユーザーマニュアル\n• 運用マニュアル\n• テスト結果報告書\n• API仕様書",
    },
    organization: {
      プロジェクト組織図:
        "プロジェクトスポンサー（CEO）\n↓\nプロジェクトマネージャー（田中太郎）\n├─ 開発リーダー（佐藤花子）\n├─ インフラリーダー（鈴木一郎）\n└─ QAリーダー（高橋美咲）",
      担当者ごとの役割:
        "PM：全体統括・進捗管理、 開発リーダー：実装・品質、 インフラ：システム構築・保守、 QA：テスト・品質保証",
    },
    schedule: {
      フェーズごとの期間:
        "商談（1月）→ 見積（1月）→ 要件定義（1-2月）→ 基本設計（2-3月）→ 詳細設計（3月）→ 実装（4-8月）→ テスト（8-10月）→ リリース（11月）",
      マイルストーン:
        "要件定義完了：2月末、 基本設計完了：3月末、 開発完了：8月末、 テスト完了：10月末、 本番リリース：11月30日",
    },
    risks: {
      想定リスク:
        "技術選定の遅延、 メンバーのスキル不足、 要件変更の頻発、 依存する外部システムの遅延",
      "予防策・対応策":
        "早期の技術検証、 事前トレーニング計画、 変更管理プロセスの確立、 外部依存の最小化",
    },
    quality: {
      レビューの有無: "有（要件、設計、コード、テスト）",
      テストの基準:
        "ユニットテスト（カバレッジ80%以上）、 統合テスト、 UAT、 本番環境テスト",
      "日次／週次の報告ルール":
        "日次：朝会（15分）で進捗共有、 週次：進捗報告会（金曜16:00）で詳細報告",
    },
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "完了":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "進行中":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "未着手":
        return <Circle className="w-5 h-5 text-gray-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

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

  const overallProgress =
    project.phases.reduce((sum, phase) => sum + phase.progress, 0) /
    project.phases.length;

  // セクション表示用のコンポーネント
  const ProjectPlanSection = ({ title, sectionKey, data }) => (
    <div className="bg-white border border-[#E6E8EB] rounded-lg">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors"
      >
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <ChevronDown
          className={`w-5 h-5 text-[#8A8F99] transition-transform ${
            expandedSections[sectionKey] ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {expandedSections[sectionKey] && (
        <div className="border-t border-[#E6E8EB] px-6 py-4">
          <div className="space-y-3">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <div className="text-sm font-semibold text-[#8A8F99] mb-1">
                  {key}
                </div>
                <div className="text-base font-normal text-black whitespace-pre-wrap break-words">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

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
            <span className="text-sm font-normal">プロジェクト一覧に戻る</span>
          </button>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-semibold text-black">
                  {project.name}
                </h1>
                <span className="px-3 py-1 bg-[#246BFF0F] text-[#246BFF] text-xs font-semibold rounded-full">
                  {project.code}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-[#8A8F99]">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>開始日: {formatDate(project.start_date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{project.members.length}名のメンバー</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-[#8A8F99] mb-1">全体進捗</div>
              <div className="text-3xl font-semibold text-[#246BFF]">
                {Math.round(overallProgress)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Phases and Plan */}
          <div className="lg:col-span-2">
            {/* Project Phases Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-black">
                  プロジェクトフェーズ
                </h2>
                <button
                  onClick={handleAddPhase}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#246BFF] rounded-2xl hover:bg-[#1B59E0] transition-colors"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span className="text-xs font-semibold text-white">
                    フェーズ追加
                  </span>
                </button>
              </div>

              <div className="space-y-4">
                {project.phases.map((phase, index) => (
                  <div
                    key={phase.id}
                    onClick={() => handlePhaseClick(phase.id)}
                    className="bg-white border border-[#E6E8EB] rounded-lg p-6 hover:shadow-md transition-shadow flex items-start space-x-4 cursor-pointer"
                  >
                    {/* Drag Handle */}
                    <div className="cursor-grab active:cursor-grabbing pt-1">
                      <GripVertical className="w-5 h-5 text-[#8A8F99]" />
                    </div>

                    {/* Phase Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(phase.status)}
                          <div>
                            <h3 className="text-base font-semibold text-black">
                              {phase.name}
                            </h3>
                            <span
                              className={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(phase.status)}`}
                            >
                              {phase.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-semibold text-black">
                            {phase.progress}%
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#246BFF] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${phase.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Plan Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-black">
                  プロジェクト計画
                </h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handlePrint}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#E6E8EB] rounded-2xl hover:bg-[#F9FAFB] transition-colors"
                  >
                    <Printer className="w-4 h-4 text-[#8A8F99]" />
                    <span className="text-xs font-semibold text-[#343A40]">
                      印刷
                    </span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#246BFF] rounded-2xl hover:bg-[#1B59E0] transition-colors">
                    <Edit className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white">
                      編集
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <ProjectPlanSection
                  title="1. 基本情報"
                  sectionKey="basic"
                  data={projectPlan.basic}
                />
                <ProjectPlanSection
                  title="2. 目的と背景"
                  sectionKey="purpose"
                  data={projectPlan.purpose}
                />
                <ProjectPlanSection
                  title="3. スコープ"
                  sectionKey="scope"
                  data={projectPlan.scope}
                />
                <ProjectPlanSection
                  title="4. 成果物"
                  sectionKey="deliverables"
                  data={projectPlan.deliverables}
                />
                <ProjectPlanSection
                  title="5. 体制・役割分担"
                  sectionKey="organization"
                  data={projectPlan.organization}
                />
                <ProjectPlanSection
                  title="6. スケジュール概要"
                  sectionKey="schedule"
                  data={projectPlan.schedule}
                />
                <ProjectPlanSection
                  title="7. リスクと対応方針"
                  sectionKey="risks"
                  data={projectPlan.risks}
                />
                <ProjectPlanSection
                  title="8. 品質・進捗管理方法"
                  sectionKey="quality"
                  data={projectPlan.quality}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Project Members */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-black">
                プロジェクトメンバー
              </h2>
              <button className="flex items-center space-x-2 px-3 py-2 bg-[#246BFF] rounded-2xl hover:bg-[#1B59E0] transition-colors">
                <Plus className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-white">
                  メンバー追加
                </span>
              </button>
            </div>

            <div className="bg-white border border-[#E6E8EB] rounded-lg p-6">
              <div className="space-y-4">
                {project.members.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="text-sm font-semibold text-black">
                        {member.name}
                      </div>
                      <div className="text-xs text-[#8A8F99]">メンバー</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meeting Schedule Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-black">会議体</h2>
                <button className="flex items-center space-x-2 px-3 py-2 bg-[#246BFF] rounded-2xl hover:bg-[#1B59E0] transition-colors">
                  <Plus className="w-4 h-4 text-white" />
                  <span className="text-xs font-semibold text-white">
                    会議体追加
                  </span>
                </button>
              </div>

              <div className="bg-white border border-[#E6E8EB] rounded-lg p-6">
                <div className="space-y-4">
                  {project.meetings && project.meetings.length > 0 ? (
                    project.meetings.map((meeting) => (
                      <div
                        key={meeting.id}
                        className="flex items-start space-x-3 pb-4 last:pb-0 border-b border-[#E6E8EB] last:border-b-0"
                      >
                        <Clock className="w-5 h-5 text-[#246BFF] flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-black mb-1">
                            {meeting.name}
                          </div>
                          <div className="text-xs text-[#8A8F99]">
                            毎週{meeting.dayOfWeek} {meeting.time}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <Clock className="w-8 h-8 text-[#E6E8EB] mx-auto mb-2" />
                      <p className="text-xs text-[#8A8F99]">
                        会議体が登録されていません
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Overall Progress Card */}
            <div className="mt-6 bg-[#246BFF0F] border border-[#246BFF] rounded-lg p-6">
              <h3 className="text-sm font-semibold text-[#246BFF] mb-3">
                全体進捗状況
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#8A8F99]">完了したフェーズ</span>
                  <span className="font-semibold text-black">
                    {project.phases.filter((p) => p.status === "完了").length} /{" "}
                    {project.phases.length}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#8A8F99]">進行中のフェーズ</span>
                  <span className="font-semibold text-black">
                    {project.phases.filter((p) => p.status === "進行中").length}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#8A8F99]">未着手のフェーズ</span>
                  <span className="font-semibold text-black">
                    {project.phases.filter((p) => p.status === "未着手").length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          /* Hide non-essential elements when printing */
          button,
          .no-print {
            display: none !important;
          }

          /* Adjust page margins */
          @page {
            margin: 2cm;
          }

          /* Ensure proper page breaks */
          .page-break-avoid {
            page-break-inside: avoid;
          }

          /* Expand all sections for printing */
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          /* Make sure borders are visible */
          * {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
