"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  getEndTime,
  getSavedBookings,
  type SavedBooking,
} from "@/lib/bookings";
import { IconFilter } from "./icons";

const WEEKDAYS = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
];

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, count: number) {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildMonthCells(monthDate: Date) {
  const first = startOfMonth(monthDate);
  const firstWeekday = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth() + 1,
    0,
  ).getDate();

  const cells: Array<{ date: Date; inMonth: boolean }> = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    const date = new Date(first);
    date.setDate(date.getDate() - (firstWeekday - i));
    cells.push({ date, inMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      date: new Date(monthDate.getFullYear(), monthDate.getMonth(), day),
      inMonth: true,
    });
  }

  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    const next = new Date(last);
    next.setDate(last.getDate() + 1);
    cells.push({ date: next, inMonth: false });
  }

  return cells;
}

export function MyCalendar() {
  const today = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(() => startOfMonth(today));
  const [bookings, setBookings] = useState<SavedBooking[]>([]);

  useEffect(() => {
    setBookings(getSavedBookings());
  }, []);

  const cells = useMemo(() => buildMonthCells(month), [month]);
  const todayKey = toDateKey(today);

  const bookingsByDate = useMemo(() => {
    const map = new Map<string, SavedBooking[]>();
    for (const booking of bookings) {
      if (!booking.date) continue;
      const list = map.get(booking.date) || [];
      list.push(booking);
      map.set(booking.date, list);
    }
    return map;
  }, [bookings]);

  const monthLabel = `Tháng ${month.getMonth() + 1}, ${month.getFullYear()}`;

  return (
    <div className="calendar-page">
      <div className="calendar-toolbar">
        <div className="calendar-toolbar-left">
          <button
            type="button"
            className="calendar-chip"
            onClick={() => setMonth(startOfMonth(today))}
          >
            Hôm Nay
          </button>
          <div className="month-nav">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => setMonth((value) => addMonths(value, -1))}
            >
              ‹
            </button>
            <strong>{monthLabel}</strong>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => setMonth((value) => addMonths(value, 1))}
            >
              ›
            </button>
          </div>
        </div>

        <div className="calendar-toolbar-right">
          <button type="button" className="calendar-chip">
            <IconFilter /> Bộ Lọc
          </button>
          <Link href="/" className="calendar-primary">
            Đặt lịch khám +
          </Link>
        </div>
      </div>

      <div className="calendar-grid content-panel">
        <div className="calendar-weekdays">
          {WEEKDAYS.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="calendar-days">
          {cells.map(({ date, inMonth }) => {
            const key = toDateKey(date);
            const dayBookings = bookingsByDate.get(key) || [];
            const isToday = key === todayKey;

            return (
              <div
                key={key}
                className={`calendar-cell${inMonth ? "" : " is-outside"}${isToday ? " is-today" : ""}`}
              >
                <div className="calendar-day-number">
                  <span className={isToday ? "today-badge" : undefined}>
                    {date.getDate()}
                  </span>
                </div>
                <div className="calendar-events">
                  {dayBookings.slice(0, 3).map((booking) => (
                    <article
                      key={booking.id}
                      className={`calendar-event color-${booking.color}`}
                    >
                      <div className="calendar-event-top">
                        <strong>{booking.doctorName}</strong>
                        <span className="event-dot" aria-hidden />
                      </div>
                      <p>
                        {booking.time} - {getEndTime(booking.time, booking.durationMinutes)}
                      </p>
                      {booking.isChild ? (
                        <span className="event-child-tag">TRẺ EM</span>
                      ) : null}
                    </article>
                  ))}
                  {dayBookings.length > 3 ? (
                    <p className="more-events">+{dayBookings.length - 3} more</p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {bookings.length === 0 ? (
        <p className="calendar-empty">
          Chưa có lịch khám. Hãy đặt lịch để hiển thị tại đây.
        </p>
      ) : null}
    </div>
  );
}
