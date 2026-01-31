"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Send,
  Save,
  Sparkles,
  ChevronDown,
  User,
  Bot,
  Calendar,
  Users as UsersIcon,
} from "lucide-react";

export default function NewProjectPage() {
  const [projectData, setProjectData] = useState({
    name: "",
    code: "",
    start_date: "",
    client: "",
    project_manager: "",
    end_date: "",
    purpose: "",
    expected_outcome: "",
    target_system: "",
    development_scope: "",
    exclusion_scope: "",
    deliverables: "",
    organization_chart: "",
    role_assignment: "",
    phase_schedule: "",
    milestones: "",
    risks: "",
    countermeasures: "",
    review_policy: "",
    test_criteria: "",
    reporting_rules: "",
  });

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "こんにちは！新しいプロジェクトの作成をお手伝いします。プロジェクトについて教えてください。例えば、「ECサイトのリニューアルプロジェクトを作りたい」のように話しかけてみてください。",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleBack = () => {
    window.location.href = "/";
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInputChange = (field, value) => {
    setProjectData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    // ユーザーメッセージを追加
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          projectData,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      // AIの応答を追加
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);

      // プロジェクトデータを更新
      if (data.updatedProjectData) {
        setProjectData((prev) => ({
          ...prev,
          ...data.updatedProjectData,
        }));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "申し訳ございません。エラーが発生しました。もう一度お試しください。",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProject = async () => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to save project");
      }

      const result = await response.json();
      alert("プロジェクトを作成しました！");
      window.location.href = `/projects/${result.id}`;
    } catch (error) {
      console.error("Error saving project:", error);
      alert("プロジェクトの保存に失敗しました");
    }
  };

  const FormSection = ({ title, sectionKey, children }) => (
    <div className="bg-white border border-[#E6E8EB] rounded-lg mb-3">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors"
      >
        <h3 className="text-base font-semibold text-black">{title}</h3>
        <ChevronDown
          className={`w-5 h-5 text-[#8A8F99] transition-transform ${
            expandedSections[sectionKey] ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {expandedSections[sectionKey] && (
        <div className="border-t border-[#E6E8EB] px-6 py-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );

  const InputField = ({ label, field, type = "text", placeholder = "" }) => (
    <div>
      <label className="block text-sm font-semibold text-[#343A40] mb-2">
        {label}
      </label>
      <input
        type={type}
        value={projectData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 text-sm border border-[#E6E8EB] rounded-lg focus:outline-none focus:border-[#246BFF] transition-colors"
      />
    </div>
  );

  const TextAreaField = ({ label, field, placeholder = "", rows = 4 }) => (
    <div>
      <label className="block text-sm font-semibold text-[#343A40] mb-2">
        {label}
      </label>
      <textarea
        value={projectData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-2 text-sm border border-[#E6E8EB] rounded-lg focus:outline-none focus:border-[#246BFF] transition-colors resize-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-inter flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E6E8EB] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-[#8A8F99] hover:text-[#246BFF] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-normal">戻る</span>
            </button>
            <div className="h-6 w-px bg-[#E6E8EB]"></div>
            <h1 className="text-xl font-semibold text-black">
              新規プロジェクト作成
            </h1>
          </div>

          <button
            onClick={handleSaveProject}
            className="flex items-center space-x-2 px-6 py-2 bg-[#246BFF] rounded-2xl hover:bg-[#1B59E0] transition-colors"
          >
            <Save className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">保存</span>
          </button>
        </div>
      </div>

      {/* Main Content - Two Pane Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane - Chat */}
        <div className="w-1/2 border-r border-[#E6E8EB] flex flex-col">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-[#E6E8EB]">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#246BFF] to-[#1B59E0] rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-black">
                  AIアシスタント
                </h2>
                <p className="text-xs text-[#8A8F99]">
                  プロジェクト作成をサポート
                </p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 ${
                  message.role === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-[#E6E8EB]"
                      : "bg-gradient-to-br from-[#246BFF] to-[#1B59E0]"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-[#343A40]" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`flex-1 ${
                    message.role === "user" ? "text-right" : ""
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-[#246BFF] text-white"
                        : "bg-[#F3F4F6] text-black"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#246BFF] to-[#1B59E0] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-[#F3F4F6] px-4 py-3 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#8A8F99] rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-[#8A8F99] rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#8A8F99] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="px-6 py-4 border-t border-[#E6E8EB]">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="プロジェクトについて教えてください..."
                  rows={3}
                  disabled={isLoading}
                  className="w-full px-4 py-3 text-sm border border-[#E6E8EB] rounded-xl focus:outline-none focus:border-[#246BFF] transition-colors resize-none"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-3 bg-[#246BFF] rounded-xl hover:bg-[#1B59E0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-xs text-[#8A8F99] mt-2">
              Shift + Enter で改行、Enter で送信
            </p>
          </div>
        </div>

        {/* Right Pane - Form */}
        <div className="w-1/2 overflow-y-auto">
          <div className="px-6 py-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-black mb-2">
                プロジェクト情報
              </h2>
              <p className="text-sm text-[#8A8F99]">
                AIと対話するか、直接入力してプロジェクト情報を設定できます
              </p>
            </div>

            {/* Basic Information */}
            <FormSection title="1. 基本情報" sectionKey="basic">
              <InputField
                label="プロジェクト名"
                field="name"
                placeholder="例: ECサイトリニューアルプロジェクト"
              />
              <InputField
                label="プロジェクトコード"
                field="code"
                placeholder="例: PRJ-2024-001"
              />
              <InputField label="開始日" field="start_date" type="date" />
              <InputField label="終了予定日" field="end_date" type="date" />
              <InputField
                label="発注元"
                field="client"
                placeholder="例: ABC株式会社"
              />
              <InputField
                label="プロジェクトマネージャー"
                field="project_manager"
                placeholder="例: 田中太郎"
              />
            </FormSection>

            {/* Purpose and Background */}
            <FormSection title="2. 目的と背景" sectionKey="purpose">
              <TextAreaField
                label="なぜこの開発を行うか"
                field="purpose"
                placeholder="例: 既存システムの老朽化に伴い、ユーザーエクスペリエンスの向上と業務効率化を実現するため"
                rows={4}
              />
              <TextAreaField
                label="期待する成果"
                field="expected_outcome"
                placeholder="例: ユーザー満足度20%向上、業務処理時間30%削減、保守コスト40%削減"
                rows={4}
              />
            </FormSection>

            {/* Scope */}
            <FormSection title="3. スコープ" sectionKey="scope">
              <TextAreaField
                label="対象システム・業務"
                field="target_system"
                placeholder="例: 顧客管理システム、注文管理システム、在庫管理システム"
                rows={3}
              />
              <TextAreaField
                label="開発範囲"
                field="development_scope"
                placeholder="例: フロントエンド、バックエンド、データベース、API"
                rows={3}
              />
              <TextAreaField
                label="除外範囲"
                field="exclusion_scope"
                placeholder="例: 既存レガシーシステムとの連携、帳票出力機能"
                rows={3}
              />
            </FormSection>

            {/* Deliverables */}
            <FormSection title="4. 成果物" sectionKey="deliverables">
              <TextAreaField
                label="納品するシステム・ドキュメント一覧"
                field="deliverables"
                placeholder="例:&#10;• システムソースコード&#10;• ユーザーマニュアル&#10;• 運用マニュアル&#10;• テスト結果報告書&#10;• API仕様書"
                rows={6}
              />
            </FormSection>

            {/* Organization */}
            <FormSection title="5. 体制・役割分担" sectionKey="organization">
              <TextAreaField
                label="プロジェクト組織図"
                field="organization_chart"
                placeholder="例:&#10;プロジェクトスポンサー（CEO）&#10;↓&#10;プロジェクトマネージャー（田中太郎）&#10;├─ 開発リーダー（佐藤花子）&#10;├─ インフラリーダー（鈴木一郎）&#10;└─ QAリーダー（高橋美咲）"
                rows={6}
              />
              <TextAreaField
                label="担当者ごとの役割"
                field="role_assignment"
                placeholder="例: PM：全体統括・進捗管理、開発リーダー：実装・品質、インフラ：システム構築・保守、QA：テスト・品質保証"
                rows={4}
              />
            </FormSection>

            {/* Schedule */}
            <FormSection title="6. スケジュール概要" sectionKey="schedule">
              <TextAreaField
                label="フェーズごとの期間"
                field="phase_schedule"
                placeholder="例: 商談（1月）→ 見積（1月）→ 要件定義（1-2月）→ 基本設計（2-3月）→ 詳細設計（3月）→ 実装（4-8月）→ テスト（8-10月）→ リリース（11月）"
                rows={4}
              />
              <TextAreaField
                label="マイルストーン"
                field="milestones"
                placeholder="例: 要件定義完了：2月末、基本設計完了：3月末、開発完了：8月末、テスト完了：10月末、本番リリース：11月30日"
                rows={4}
              />
            </FormSection>

            {/* Risks */}
            <FormSection title="7. リスクと対応方針" sectionKey="risks">
              <TextAreaField
                label="想定リスク"
                field="risks"
                placeholder="例: 技術選定の遅延、メンバーのスキル不足、要件変更の頻発、依存する外部システムの遅延"
                rows={4}
              />
              <TextAreaField
                label="予防策・対応策"
                field="countermeasures"
                placeholder="例: 早期の技術検証、事前トレーニング計画、変更管理プロセスの確立、外部依存の最小化"
                rows={4}
              />
            </FormSection>

            {/* Quality Management */}
            <FormSection title="8. 品質・進捗管理方法" sectionKey="quality">
              <TextAreaField
                label="レビューの有無"
                field="review_policy"
                placeholder="例: 有（要件、設計、コード、テスト）"
                rows={3}
              />
              <TextAreaField
                label="テストの基準"
                field="test_criteria"
                placeholder="例: ユニットテスト（カバレッジ80%以上）、統合テスト、UAT、本番環境テスト"
                rows={3}
              />
              <TextAreaField
                label="日次／週次の報告ルール"
                field="reporting_rules"
                placeholder="例: 日次：朝会（15分）で進捗共有、週次：進捗報告会（金曜16:00）で詳細報告"
                rows={3}
              />
            </FormSection>
          </div>
        </div>
      </div>
    </div>
  );
}
