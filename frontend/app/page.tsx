"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Chat from "./components/Chat";

// FullCalendarを動的ロード（SSR無効化）
const Calendar = dynamic(() => import("./components/Calendar"), {
  ssr: false,
});

// ダミー予定データ
const INITIAL_EVENTS = [
  { id: "1", title: "バイト (17:00-22:00)", start: "2026-08-18" },
  { id: "2", title: "TOEIC勉強", start: "2026-08-20" },
];

export default function Home() {
  const [events, setEvents] = useState(INITIAL_EVENTS);

  const handleDateClick = (arg: { dateStr: string }) => {
    const title = prompt("新しい予定のタイトルを入力してください:");
    if (title) {
      setEvents([
        ...events,
        { id: String(Date.now()), title, start: arg.dateStr },
      ]);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ヘッダー */}
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              📅 AI Smart Calendar
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              自然に生活を整理できる次世代カレンダー
            </p>
          </div>
          <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold border border-indigo-100">
            Phase 2: チャットUI構築中
          </div>
        </header>

        {/* メインコンテンツエリア (2コラムレイアウト) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左側：カレンダー本体 (幅 2/3) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[600px]">
            <Calendar events={events} onDateClick={handleDateClick} />
          </div>

          {/* 右側：AIチャット入力欄 (幅 1/3) */}
          <div className="lg:col-span-1">
            <Chat />
          </div>
        </div>
      </div>
    </main>
  );
}