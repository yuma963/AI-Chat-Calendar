"use client";

import { useState } from "react";

// メッセージのデータ型（型安全のため定義）
interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

export default function Chat() {
  // チャットの履歴を保存するステート（初期メッセージを入れておく）
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "こんにちは！「来週の月曜19時から渋谷で飲み会」のように予定を教えてください😊",
    },
  ]);

  // 入力中のテキストを保存するステート
  const [input, setInput] = useState("");

  // メッセージ送信時の処理
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault(); // ページの自動リロードを防ぐ
    if (!input.trim()) return;

    // ユーザーのメッセージを追加
    const userMsg: Message = {
      id: String(Date.now()),
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // 仮のAI返答（Phase 4で本物のAIと接続します！）
    setTimeout(() => {
      const aiMsg: Message = {
        id: String(Date.now() + 1),
        sender: "ai",
        text: `「${input}」ですね！Parse（解析）の準備をしています...（AI機能は次のステップで接続します）`,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* チャットヘッダー */}
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
        <span className="text-xl">🤖</span>
        <div>
          <h2 className="font-bold text-slate-800 text-sm">AI アシスタント</h2>
          <p className="text-xs text-slate-500">自然言語で予定を追加</p>
        </div>
      </div>

      {/* メッセージ履歴エリア */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* テキスト入力フォーム */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例: 明日の17時からバイト"
          className="flex-1 px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          送信
        </button>
      </form>
    </div>
  );
}