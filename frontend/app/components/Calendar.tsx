"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface CalendarProps {
  events: any[];
  onDateClick: (arg: { dateStr: string }) => void;
}

export default function Calendar({ events, onDateClick }: CalendarProps) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={onDateClick}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "",
      }}
      height="auto"
      locale="ja"
    />
  );
}