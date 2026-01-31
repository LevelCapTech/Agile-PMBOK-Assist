"use client";

import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Save,
  Sparkles,
  ChevronDown,
  User,
  Bot,
} from "lucide-react";

export default function EditProjectPage() {
  const params = useParams();
  const navigate = useNavigate();
  const parsedProjectId = params.id ? Number.parseInt(params.id, 10) : null;
  const projectId = Number.isNaN(parsedProjectId) ? null : parsedProjectId;
  const [isLoadingProject, setIsLoadingProject] = useState(true);

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
        "こんにちは！プロジェクトの編集をお手伝いします。どの部分を変更したいか教えてください。例えば、「終了日を1ヶ月延ばしたい」のように話しかけてみてください。",
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

  // プロジェクトデータを取得
  useEffect(() => {
    if (!projectId) {
      navigate("/");
      return;
    }
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const data = await response.json();
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching project:", error);
        alert("プロジェクトの読み込みに失敗しました");
      } finally {
        setIsLoadingProject(false);
      }
    };

    fetchProject();
  }, [navigate, projectId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleBack = () => {
    if (!projectId) {
      navigate("/");
      return;
    }
    navigate(`/projects/${projectId}`);
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
    if (!projectId) {
      navigate("/");
      return;
    }
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      alert("プロジェクトを更新しました！");
      navigate(`/projects/${projectId}`);
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

  if (isLoadingProject) {
    return (
      <div className="min-h-screen bg-white font-inter flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#246BFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-[#8A8F99]">読み込み中...</p>
        </div>
      </div>
    );
  }

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
              プロジェクト編集
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
                  プロジェクト編集をサポート
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
                  placeholder="変更したい内容を教えてください..."
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
                AIと対話するか、直接入力してプロジェクト情報を編集できます
              </p>
            </div>

            {/* Basic Information */}
            <FormSection title="1. 基本情報" sectionKey="basic">
              <InputField label="プロジェクト名" field="name" />
              <InputField label="プロジェクトコード" field="code" />
              <InputField label="開始日" field="start_date" type="date" />
              <InputField label="終了予定日" field="end_date" type="date" />
              <InputField label="発注元" field="client" />
              <InputField
                label="プロジェクトマネージャー"
                field="project_manager"
              />
            </FormSection>

            {/* Purpose and Background */}
            <FormSection title="2. 目的と背景" sectionKey="purpose">
              <TextAreaField
                label="なぜこの開発を行うか"
                field="purpose"
                rows={4}
              />
              <TextAreaField
                label="期待する成果"
                field="expected_outcome"
                rows={4}
              />
            </FormSection>

            {/* Scope */}
            <FormSection title="3. スコープ" sectionKey="scope">
              <TextAreaField
                label="対象システム・業務"
                field="target_system"
                rows={3}
              />
              <TextAreaField
                label="開発範囲"
                field="development_scope"
                rows={3}
              />
              <TextAreaField
                label="除外範囲"
                field="exclusion_scope"
                rows={3}
              />
            </FormSection>

            {/* Deliverables */}
            <FormSection title="4. 成果物" sectionKey="deliverables">
              <TextAreaField
                label="納品するシステム・ドキュメント一覧"
                field="deliverables"
                rows={6}
              />
            </FormSection>

            {/* Organization */}
            <FormSection title="5. 体制・役割分担" sectionKey="organization">
              <TextAreaField
                label="プロジェクト組織図"
                field="organization_chart"
                rows={6}
              />
              <TextAreaField
                label="担当者ごとの役割"
                field="role_assignment"
                rows={4}
              />
            </FormSection>

            {/* Schedule */}
            <FormSection title="6. スケジュール概要" sectionKey="schedule">
              <TextAreaField
                label="フェーズごとの期間"
                field="phase_schedule"
                rows={4}
              />
              <TextAreaField
                label="マイルストーン"
                field="milestones"
                rows={4}
              />
            </FormSection>

            {/* Risks */}
            <FormSection title="7. リスクと対応方針" sectionKey="risks">
              <TextAreaField label="想定リスク" field="risks" rows={4} />
              <TextAreaField
                label="予防策・対応策"
                field="countermeasures"
                rows={4}
              />
            </FormSection>

            {/* Quality Management */}
            <FormSection title="8. 品質・進捗管理方法" sectionKey="quality">
              <TextAreaField
                label="レビューの有無"
                field="review_policy"
                rows={3}
              />
              <TextAreaField
                label="テストの基準"
                field="test_criteria"
                rows={3}
              />
              <TextAreaField
                label="日次／週次の報告ルール"
                field="reporting_rules"
                rows={3}
              />
            </FormSection>
          </div>
        </div>
      </div>
    </div>
  );
}
