"use client";

import { useState } from "react";
import { withBase } from "@/utils/withBase";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  Plus,
  Calendar,
  Users,
  Settings,
  Shield,
  Download,
  Eye,
  Lock,
  FileText,
  Sliders,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// サンプルデータ
const SAMPLE_PROJECTS = [
  {
    id: 1,
    name: "ECサイトリニューアルプロジェクト",
    code: "PRJ-2024-001",
    start_date: "2024-01-15",
    status: "オープン",
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
  },
  {
    id: 2,
    name: "モバイルアプリ開発プロジェクト",
    code: "PRJ-2024-002",
    start_date: "2024-02-01",
    status: "オープン",
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
  },
  {
    id: 3,
    name: "社内システム統合プロジェクト",
    code: "PRJ-2024-003",
    start_date: "2024-03-10",
    status: "保守",
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
  },
  {
    id: 4,
    name: "データ分析基盤構築",
    code: "PRJ-2024-004",
    start_date: "2024-04-01",
    status: "商談",
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
  },
  {
    id: 5,
    name: "顧客管理システム刷新",
    code: "PRJ-2024-005",
    start_date: "2024-05-15",
    status: "クローズ",
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
  },
  {
    id: 6,
    name: "セキュリティ強化プロジェクト",
    code: "PRJ-2024-006",
    start_date: "2024-06-01",
    status: "見積",
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
  },
];

// メンバーサンプルデータ
const SAMPLE_MEMBERS = [
  {
    id: 1,
    name: "田中太郎",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    role: "プロジェクトマネージャー",
    status: "稼働中",
    projects: 3,
  },
  {
    id: 2,
    name: "佐藤花子",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    role: "フロントエンドエンジニア",
    status: "稼働中",
    projects: 2,
  },
  {
    id: 3,
    name: "鈴木一郎",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    role: "バックエンドエンジニア",
    status: "待機中",
    projects: 1,
  },
  {
    id: 4,
    name: "高橋美咲",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    role: "UIデザイナー",
    status: "稼働中",
    projects: 4,
  },
  {
    id: 5,
    name: "伊藤健太",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    role: "フルスタックエンジニア",
    status: "休暇中",
    projects: 0,
  },
  {
    id: 6,
    name: "山田次郎",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face",
    role: "データアナリスト",
    status: "稼働中",
    projects: 2,
  },
  {
    id: 7,
    name: "渡辺麻美",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
    role: "QAエンジニア",
    status: "待機中",
    projects: 1,
  },
  {
    id: 8,
    name: "中村大輔",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
    role: "セキュリティエンジニア",
    status: "稼働中",
    projects: 2,
  },
];

// 予算・執行状況サンプルデータ
const BUDGET_DATA = [
  {
    month: "1月",
    budget: 12000000,
    actual: 10500000,
  },
  {
    month: "2月",
    budget: 15000000,
    actual: 14200000,
  },
  {
    month: "3月",
    budget: 18000000,
    actual: 17800000,
  },
  {
    month: "4月",
    budget: 16000000,
    actual: 15200000,
  },
  {
    month: "5月",
    budget: 20000000,
    actual: 18500000,
  },
  {
    month: "6月",
    budget: 22000000,
    actual: 19800000,
  },
];

export default function ProjectSelectionPage() {
  const [projects] = useState(SAMPLE_PROJECTS);
  const [members] = useState(SAMPLE_MEMBERS);
  const [searchQuery, setSearchQuery] = useState("");

  const handleProjectClick = (projectId) => {
    window.location.href = withBase(`/projects/${projectId}`);
  };

  const filteredProjects = projects.filter((project) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      project.name.toLowerCase().includes(query) ||
      project.code.toLowerCase().includes(query)
    );
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "見積":
        return "bg-[#F3F4F6] text-[#6B7280]";
      case "商談":
        return "bg-[#FEF3C7] text-[#D97706]";
      case "オープン":
        return "bg-[#DBEAFE] text-[#2563EB]";
      case "保守":
        return "bg-[#D1FAE5] text-[#059669]";
      case "クローズ":
        return "bg-[#E5E7EB] text-[#374151]";
      default:
        return "bg-[#F3F4F6] text-[#6B7280]";
    }
  };

  const getMemberStatusColor = (status) => {
    switch (status) {
      case "稼働中":
        return "bg-[#DBEAFE] text-[#2563EB]";
      case "待機中":
        return "bg-[#FEF3C7] text-[#D97706]";
      case "休暇中":
        return "bg-[#E5E7EB] text-[#6B7280]";
      default:
        return "bg-[#F3F4F6] text-[#6B7280]";
    }
  };

  const formatCurrency = (value) => {
    return `¥${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="min-h-screen bg-white font-inter flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-[#E6E8EB]">
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#E6E8EB]">
          <div className="flex items-center space-x-2">
            <Menu className="w-4 h-4 text-[#8A8F99]" />
            <span className="text-xs font-semibold text-[#343A40]">
              メニュー
            </span>
          </div>
          <X className="w-4 h-4 text-[#8A8F99]" />
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center space-x-3 p-2 rounded bg-[#246BFF0F] hover:bg-[#246BFF0F]">
            <div className="w-4 h-4 bg-[#246BFF] rounded-sm"></div>
            <span className="text-xs font-normal text-[#246BFF]">
              プロジェクト
            </span>
          </div>

          <div className="flex items-center space-x-3 p-2 hover:bg-[#246BFF0F] rounded">
            <div className="w-4 h-4 border border-[#8A8F99] rounded-sm"></div>
            <span className="text-xs font-normal text-[#343A40]">メンバー</span>
          </div>

          <div className="flex items-center space-x-3 p-2 hover:bg-[#246BFF0F] rounded">
            <div className="w-4 h-4 border border-[#8A8F99] rounded-sm"></div>
            <span className="text-xs font-normal text-[#343A40]">統計</span>
          </div>

          <div className="flex items-center space-x-3 p-2 hover:bg-[#246BFF0F] rounded">
            <div className="w-4 h-4 border border-[#8A8F99] rounded-sm"></div>
            <span className="text-xs font-normal text-[#343A40]">設定</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Application Bar */}
        <div className="h-16 bg-white border-b border-[#E6E8EB] px-4 grid grid-cols-3 items-center">
          <div className="relative">
            <div className="relative w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8F99]" />
              <input
                type="text"
                placeholder="プロジェクトを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs font-normal text-[#8A8F99] border border-[#E6E8EB] rounded-lg focus:outline-none focus:border-[#246BFF]"
              />
            </div>
          </div>

          <div className="w-8 h-8 rounded-full border-4 border-[#246BFF] justify-self-center"></div>

          <div className="flex items-center space-x-4 justify-self-end">
            <Bell className="w-6 h-6 text-[#8A8F99]" />
            <div className="flex items-center space-x-2">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-xs font-normal text-[#343A40]">
                ユーザー
              </span>
              <ChevronDown className="w-4 h-4 text-[#8A8F99]" />
            </div>
          </div>
        </div>

        {/* Central Work Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-lg font-semibold text-black mb-1">
                プロジェクト選択
              </h1>
              <p className="text-xs font-normal text-[#8A8F99]">
                プロジェクトを選択して作業を開始
              </p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#246BFF] rounded-2xl hover:bg-[#1B59E0] transition-colors">
              <Plus className="w-4 h-4 text-white" />
              <span className="text-xs font-semibold text-white">
                新規プロジェクト
              </span>
            </button>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[#246BFF0F] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#246BFF]" />
              </div>
              <h2 className="text-base font-semibold text-black mb-2">
                プロジェクトが見つかりません
              </h2>
              <p className="text-xs font-normal text-[#8A8F99] mb-6">
                検索条件を変更してください
              </p>
            </div>
          )}

          {/* Project Cards Grid */}
          {filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className="bg-white border border-[#E6E8EB] rounded-lg p-6 hover:shadow-lg hover:border-[#246BFF] hover:transform hover:translate-y-[-4px] transition-all duration-200 cursor-pointer"
                >
                  {/* Project Name */}
                  <h2 className="text-base font-semibold text-black mb-2">
                    {project.name}
                  </h2>

                  {/* Project Code and Status */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="inline-block px-3 py-1 bg-[#246BFF0F] rounded-full">
                      <span className="text-xs font-semibold text-[#246BFF]">
                        {project.code}
                      </span>
                    </div>
                    <div
                      className={`inline-block px-3 py-1 rounded-full ${getStatusColor(project.status)}`}
                    >
                      <span className="text-xs font-semibold">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Project Members */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-4 h-4 text-[#8A8F99]" />
                      <span className="text-[10px] font-normal text-[#8A8F99]">
                        プロジェクトメンバー
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        {project.members.slice(0, 4).map((member, idx) => (
                          <img
                            key={idx}
                            src={member.avatar}
                            alt={member.name}
                            className="w-8 h-8 rounded-full border-2 border-white"
                            title={member.name}
                          />
                        ))}
                      </div>
                      {project.members.length > 4 && (
                        <div className="w-8 h-8 rounded-full bg-[#246BFF] border-2 border-white -ml-2 flex items-center justify-center">
                          <span className="text-[10px] font-semibold text-white">
                            +{project.members.length - 4}
                          </span>
                        </div>
                      )}
                      <span className="ml-3 text-xs font-normal text-[#343A40]">
                        {project.members.length}名
                      </span>
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="border-t border-[#E6E8EB] pt-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#8A8F99]" />
                      <span className="text-[10px] font-normal text-[#8A8F99]">
                        開始日:
                      </span>
                      <span className="text-xs font-semibold text-black">
                        {formatDate(project.start_date)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Members Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-semibold text-black mb-1">
                  メンバー一覧
                </h2>
                <p className="text-xs font-normal text-[#8A8F99]">
                  チームメンバーの稼働状況を確認
                </p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#246BFF] rounded-2xl hover:bg-[#1B59E0] transition-colors">
                <Plus className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-white">
                  メンバー追加
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-white border border-[#E6E8EB] rounded-lg p-6 hover:shadow-lg hover:border-[#246BFF] hover:transform hover:translate-y-[-4px] transition-all duration-200"
                >
                  {/* Member Avatar and Name */}
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-full mb-3"
                    />
                    <h3 className="text-sm font-semibold text-black mb-1">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#8A8F99] mb-3">{member.role}</p>
                    <div
                      className={`inline-block px-3 py-1 rounded-full ${getMemberStatusColor(member.status)}`}
                    >
                      <span className="text-xs font-semibold">
                        {member.status}
                      </span>
                    </div>
                  </div>

                  {/* Project Count */}
                  <div className="border-t border-[#E6E8EB] pt-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Users className="w-4 h-4 text-[#8A8F99]" />
                      <span className="text-xs font-normal text-[#8A8F99]">
                        担当プロジェクト:
                      </span>
                      <span className="text-xs font-semibold text-black">
                        {member.projects}件
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget & Execution Status Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-semibold text-black mb-1">
                  予算・執行状況
                </h2>
                <p className="text-xs font-normal text-[#8A8F99]">
                  全プロジェクトの予算と執行状況の推移
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#E6E8EB] rounded-lg p-6">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={BUDGET_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6E8EB" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#8A8F99", fontSize: 12 }}
                    stroke="#E6E8EB"
                  />
                  <YAxis
                    tickFormatter={formatCurrency}
                    tick={{ fill: "#8A8F99", fontSize: 12 }}
                    stroke="#E6E8EB"
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E6E8EB",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} iconType="line" />
                  <Line
                    type="monotone"
                    dataKey="budget"
                    stroke="#246BFF"
                    strokeWidth={2}
                    name="予算"
                    dot={{ fill: "#246BFF", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#059669"
                    strokeWidth={2}
                    name="執行額"
                    dot={{ fill: "#059669", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-[#246BFF0F] rounded-lg p-4">
                  <div className="text-xs text-[#8A8F99] mb-1">
                    総予算（6ヶ月）
                  </div>
                  <div className="text-xl font-semibold text-[#246BFF]">
                    ¥103.0M
                  </div>
                </div>
                <div className="bg-[#D1FAE5] rounded-lg p-4">
                  <div className="text-xs text-[#8A8F99] mb-1">
                    総執行額（6ヶ月）
                  </div>
                  <div className="text-xl font-semibold text-[#059669]">
                    ¥96.0M
                  </div>
                </div>
                <div className="bg-[#FEF3C7] rounded-lg p-4">
                  <div className="text-xs text-[#8A8F99] mb-1">執行率</div>
                  <div className="text-xl font-semibold text-[#D97706]">
                    93.2%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-semibold text-black mb-1">設定</h2>
                <p className="text-xs font-normal text-[#8A8F99]">
                  システムとプロジェクトの設定を管理
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Setting Button 1 */}
              <button className="bg-white border border-[#E6E8EB] rounded-lg p-6 hover:shadow-lg hover:border-[#246BFF] hover:transform hover:translate-y-[-4px] transition-all duration-200 text-left">
                <div className="w-12 h-12 bg-[#246BFF0F] rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-[#246BFF]" />
                </div>
                <h3 className="text-sm font-semibold text-black mb-2">
                  プロジェクト設定
                </h3>
                <p className="text-xs text-[#8A8F99]">
                  プロジェクトの基本情報や期限を設定
                </p>
              </button>

              {/* Setting Button 2 */}
              <button className="bg-white border border-[#E6E8EB] rounded-lg p-6 hover:shadow-lg hover:border-[#246BFF] hover:transform hover:translate-y-[-4px] transition-all duration-200 text-left">
                <div className="w-12 h-12 bg-[#246BFF0F] rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#246BFF]" />
                </div>
                <h3 className="text-sm font-semibold text-black mb-2">
                  メンバー管理
                </h3>
                <p className="text-xs text-[#8A8F99]">
                  チームメンバーの追加・編集・削除
                </p>
              </button>

              {/* Setting Button 3 */}
              <button className="bg-white border border-[#E6E8EB] rounded-lg p-6 hover:shadow-lg hover:border-[#246BFF] hover:transform hover:translate-y-[-4px] transition-all duration-200 text-left">
                <div className="w-12 h-12 bg-[#246BFF0F] rounded-lg flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-[#246BFF]" />
                </div>
                <h3 className="text-sm font-semibold text-black mb-2">
                  通知設定
                </h3>
                <p className="text-xs text-[#8A8F99]">
                  通知の受信設定とタイミングを調整
                </p>
              </button>

              {/* Setting Button 4 */}
              <button className="bg-white border border-[#E6E8EB] rounded-lg p-6 hover:shadow-lg hover:border-[#246BFF] hover:transform hover:translate-y-[-4px] transition-all duration-200 text-left">
                <div className="w-12 h-12 bg-[#246BFF0F] rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-[#246BFF]" />
                </div>
                <h3 className="text-sm font-semibold text-black mb-2">
                  セキュリティ
                </h3>
                <p className="text-xs text-[#8A8F99]">
                  パスワードや二段階認証の設定
                </p>
              </button>

              {/* Setting Button 5 */}
              <button className="bg-white border border-[#E6E8EB] rounded-lg p-6 hover:shadow-lg hover:border-[#246BFF] hover:transform hover:translate-y-[-4px] transition-all duration-200 text-left">
                <div className="w-12 h-12 bg-[#246BFF0F] rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-[#246BFF]" />
                </div>
                <h3 className="text-sm font-semibold text-black mb-2">
                  権限管理
                </h3>
                <p className="text-xs text-[#8A8F99]">
                  ユーザーの役割と権限を設定
                </p>
              </button>

              {/* Setting Button 6 */}
              <button className="bg-white border border-[#E6E8EB] rounded-lg p-6 hover:shadow-lg hover:border-[#246BFF] hover:transform hover:translate-y-[-4px] transition-all duration-200 text-left">
                <div className="w-12 h-12 bg-[#246BFF0F] rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-[#246BFF]" />
                </div>
                <h3 className="text-sm font-semibold text-black mb-2">
                  表示設定
                </h3>
                <p className="text-xs text-[#8A8F99]">
                  テーマやレイアウトのカスタマイズ
                </p>
              </button>

              {/* Setting Button 7 */}
              <button className="bg-white border border-[#E6E8EB] rounded-lg p-6 hover:shadow-lg hover:border-[#246BFF] hover:transform hover:translate-y-[-4px] transition-all duration-200 text-left">
                <div className="w-12 h-12 bg-[#246BFF0F] rounded-lg flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-[#246BFF]" />
                </div>
                <h3 className="text-sm font-semibold text-black mb-2">
                  データエクスポート
                </h3>
                <p className="text-xs text-[#8A8F99]">
                  プロジェクトデータをCSVで出力
                </p>
              </button>

              {/* Setting Button 8 */}
              <button className="bg-white border border-[#E6E8EB] rounded-lg p-6 hover:shadow-lg hover:border-[#246BFF] hover:transform hover:translate-y-[-4px] transition-all duration-200 text-left">
                <div className="w-12 h-12 bg-[#246BFF0F] rounded-lg flex items-center justify-center mb-4">
                  <Sliders className="w-6 h-6 text-[#246BFF]" />
                </div>
                <h3 className="text-sm font-semibold text-black mb-2">
                  システム設定
                </h3>
                <p className="text-xs text-[#8A8F99]">
                  全般的なシステム環境を調整
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
