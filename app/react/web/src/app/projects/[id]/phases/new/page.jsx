"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Eye,
  Edit3,
  Save,
  Sparkles,
  User,
  Bot,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import useHandleStreamResponse from "@/utils/useHandleStreamResponse";

export default function NewPhasePage() {
  const params = useParams();
  const projectId = params.id;
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "こんにちは！新しいプロジェクトフェーズの作成をお手伝いします。どのようなフェーズを作成したいですか？",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [streamingMessage, setStreamingMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [markdownContent, setMarkdownContent] = useState(`# 新しいフェーズ

## 概要
このフェーズの目的と概要を記載してください。

## 成果物
- 成果物1
- 成果物2

## タスク
1. タスク1
2. タスク2

## 期間
- 開始日: 未定
- 終了日: 未定

## 担当者
- 担当者名を記載
`);
  const [viewMode, setViewMode] = useState("edit"); // 'edit' or 'preview'
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const handleFinish = useCallback((message) => {
    setMessages((prev) => [...prev, { role: "assistant", content: message }]);
    setStreamingMessage("");
    setIsLoading(false);

    // AIの応答をMarkdownに反映（簡易的な実装）
    if (message.includes("```markdown") || message.includes("# ")) {
      // Markdownコードブロックから内容を抽出
      const markdownMatch = message.match(/```markdown\n([\s\S]*?)\n```/);
      if (markdownMatch) {
        setMarkdownContent(markdownMatch[1]);
      } else if (message.startsWith("# ")) {
        setMarkdownContent(message);
      }
    }
  }, []);

  const handleStreamResponse = useHandleStreamResponse({
    onChunk: setStreamingMessage,
    onFinish: handleFinish,
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { role: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const systemMessage = {
        role: "system",
        content: `あなたはプロジェクトフェーズの作成を支援するアシスタントです。ユーザーの要求に応じて、Markdown形式でフェーズの詳細を作成してください。現在のMarkdownコンテンツ:\n\n${markdownContent}\n\nMarkdownコードブロック（\`\`\`markdown）で囲んで出力してください。`,
      };

      const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [systemMessage, ...messages, userMessage],
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      handleStreamResponse(response);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "申し訳ありません。エラーが発生しました。もう一度お試しください。",
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSave = async () => {
    // TODO: フェーズをデータベースに保存する処理
    console.log("Saving phase:", markdownContent);
    alert("フェーズを保存しました（実装予定）");
  };

  const handleBack = () => {
    if (!projectId) {
      return;
    }
    window.location.href = `/projects/${projectId}`;
  };

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
              <span className="text-sm font-normal">プロジェクトに戻る</span>
            </button>
            <div className="h-4 w-px bg-[#E6E8EB]"></div>
            <h1 className="text-lg font-semibold text-black">
              新しいフェーズを作成
            </h1>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-[#246BFF] text-white rounded-2xl hover:bg-[#1B59E0] transition-colors"
          >
            <Save className="w-4 h-4" />
            <span className="text-xs font-semibold">保存</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Chat Pane */}
        <div className="w-1/2 border-r border-[#E6E8EB] flex flex-col">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-[#E6E8EB]">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#246BFF]" />
              <h2 className="text-base font-semibold text-black">
                AI アシスタント
              </h2>
            </div>
            <p className="text-xs text-[#8A8F99] mt-1">
              フェーズの内容をAIと対話しながら編集できます
            </p>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-[80%] ${
                    message.role === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user" ? "bg-[#246BFF]" : "bg-[#F3F4F6]"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-[#8A8F99]" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-[#246BFF] text-white"
                        : "bg-[#F9FAFB] text-black"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Streaming Message */}
            {streamingMessage && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#F3F4F6]">
                    <Bot className="w-4 h-4 text-[#8A8F99]" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-[#F9FAFB] text-black">
                    <div className="text-sm whitespace-pre-wrap break-words">
                      {streamingMessage}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && !streamingMessage && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#F3F4F6]">
                    <Bot className="w-4 h-4 text-[#8A8F99]" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-[#F9FAFB]">
                    <div className="flex space-x-1">
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
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="px-6 py-4 border-t border-[#E6E8EB]">
            <div className="flex items-end space-x-3">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="メッセージを入力..."
                className="flex-1 px-4 py-3 border border-[#E6E8EB] rounded-2xl text-sm resize-none focus:outline-none focus:border-[#246BFF] min-h-[48px] max-h-[120px]"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-4 py-3 bg-[#246BFF] text-white rounded-2xl hover:bg-[#1B59E0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Markdown Editor/Preview */}
        <div className="w-1/2 flex flex-col">
          {/* Editor Header */}
          <div className="px-6 py-4 border-b border-[#E6E8EB] flex items-center justify-between">
            <h2 className="text-base font-semibold text-black">
              フェーズドキュメント
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("edit")}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-2 ${
                  viewMode === "edit"
                    ? "bg-[#246BFF] text-white"
                    : "bg-white text-[#8A8F99] border border-[#E6E8EB] hover:bg-[#F9FAFB]"
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>編集</span>
              </button>
              <button
                onClick={() => setViewMode("preview")}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-2 ${
                  viewMode === "preview"
                    ? "bg-[#246BFF] text-white"
                    : "bg-white text-[#8A8F99] border border-[#E6E8EB] hover:bg-[#F9FAFB]"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>プレビュー</span>
              </button>
            </div>
          </div>

          {/* Editor/Preview Area */}
          <div className="flex-1 overflow-hidden">
            {viewMode === "edit" ? (
              <textarea
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
                className="w-full h-full px-6 py-4 resize-none focus:outline-none text-sm font-mono"
                placeholder="Markdown形式でフェーズの内容を記述..."
              />
            ) : (
              <div className="h-full overflow-y-auto px-6 py-4">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{markdownContent}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
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
        }
        .prose h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
          color: #000;
        }
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #000;
        }
        .prose p {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          line-height: 1.75;
        }
        .prose ul,
        .prose ol {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
        }
        .prose code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }
        .prose pre {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
        }
        .prose pre code {
          background-color: transparent;
          padding: 0;
        }
        .prose blockquote {
          border-left: 4px solid #246bff;
          padding-left: 1rem;
          margin-left: 0;
          font-style: italic;
          color: #6b7280;
        }
        .prose a {
          color: #246bff;
          text-decoration: underline;
        }
        .prose strong {
          font-weight: 600;
        }
        .prose hr {
          border-color: #e6e8eb;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
}
