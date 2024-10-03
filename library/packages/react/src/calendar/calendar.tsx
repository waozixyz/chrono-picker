"use client";
import * as React from "react";
import { useState, useEffect } from "react";

export interface CalendarProps {
  value?: Date;
  onChange?: (event: {
    target: {
      value: Date;
    };
  }) => void;
  minDate?: Date;
  maxDate?: Date;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  fontSize?: string;
  locale?: string;
}

import { DateTime, Info } from "luxon";

function Calendar(props: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() =>
    DateTime.local().startOf("month")
  );

  const [selectedDate, setSelectedDate] = useState(() => DateTime.local());

  const [minDate, setMinDate] = useState(() =>
    props.minDate
      ? DateTime.fromJSDate(props.minDate)
      : DateTime.local().minus({
          years: 100,
        })
  );

  const [maxDate, setMaxDate] = useState(() =>
    props.maxDate
      ? DateTime.fromJSDate(props.maxDate)
      : DateTime.local().plus({
          years: 100,
        })
  );

  const [backgroundColor, setBackgroundColor] = useState(
    () => props.backgroundColor || "#ffffff"
  );

  const [textColor, setTextColor] = useState(
    () => props.textColor || "#333333"
  );

  const [accentColor, setAccentColor] = useState(
    () => props.accentColor || "#007bff"
  );

  const [fontSize, setFontSize] = useState(() => props.fontSize || "14px");

  const [locale, setLocale] = useState(() => props.locale || "en");

  function changeMonth(delta: number) {
    setCurrentMonth(
      currentMonth
        .plus({
          months: delta,
        })
        .startOf("month") as DateTime<true>
    );
  }

  function selectDate(day: number) {
    const newDate = currentMonth.set({
      day,
    }) as DateTime<true>;
    if (isDateInRange(newDate)) {
      setSelectedDate(newDate);
      props.onChange?.({
        target: {
          value: newDate.toJSDate(),
        },
      });
    }
  }

  function getEmptyCells() {
    return Array(currentMonth.weekday % 7).fill(null);
  }

  function getDayCells() {
    return Array(currentMonth.daysInMonth).fill(null);
  }

  function isSelected(day: number) {
    return selectedDate.hasSame(
      currentMonth.set({
        day,
      }) as DateTime<true>,
      "day"
    );
  }

  function isDateInRange(date: DateTime<true>) {
    return date >= minDate && date <= maxDate;
  }

  function isDisabled(day: number) {
    return !isDateInRange(
      currentMonth.set({
        day,
      }) as DateTime<true>
    );
  }

  function getWeekdays() {
    return Info.weekdays("short", {
      locale: locale,
    });
  }

  function formatMonth() {
    return currentMonth.toLocaleString({
      month: "long",
      year: "numeric",
    });
  }

  useEffect(() => {
    setCurrentMonth(
      (props.value
        ? DateTime.fromJSDate(props.value)
        : DateTime.local()
      ).startOf("month") as DateTime<true>
    );
    setSelectedDate(
      (props.value
        ? DateTime.fromJSDate(props.value)
        : DateTime.local()) as DateTime<true>
    );
  }, []);

  useEffect(() => {
    if (props.value) {
      setSelectedDate(DateTime.fromJSDate(props.value) as DateTime<true>);
      setCurrentMonth(selectedDate.startOf("month") as DateTime<true>);
    }
  }, [props.value]);

  return (
    <>
      <div
        className="calendar"
        style={{
          "--calendar-background-color": backgroundColor,
          "--calendar-text-color": textColor,
          "--calendar-accent-color": accentColor,
          "--calendar-font-size": fontSize,
        }}
      >
        <div className="calendar-header">
          <button
            className="calendar-button"
            onClick={(event) => changeMonth(-1)}
          >
            &lt;
          </button>
          <span>{formatMonth()}</span>
          <button
            className="calendar-button"
            onClick={(event) => changeMonth(1)}
          >
            &gt;
          </button>
        </div>
        <div className="calendar-grid">
          {getWeekdays()?.map((day) => (
            <div className="calendar-weekday">{day}</div>
          ))}
          {getEmptyCells()?.map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {getDayCells()?.map((_, i) => (
            <div
              key={`day-${i + 1}`}
              className={`calendar-day ${isSelected(i + 1) ? "selected" : ""} ${
                isDisabled(i + 1) ? "disabled" : ""
              }`}
              onClick={(event) => selectDate(i + 1)}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <style>{`
    .calendar {
      font-family: 'Roboto', sans-serif;
      background-color: var(--calendar-background-color);
      color: var(--calendar-text-color);
      padding: 10px;
      border-radius: 8px;
    }
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 5px;
    }
    .calendar-day {
      text-align: center;
      padding: 5px;
      cursor: pointer;
      border-radius: 50%;
    }
    .calendar-day:hover:not(.disabled), .calendar-day.selected {
      background-color: var(--calendar-accent-color);
      color: white;
    }
    .calendar-day.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
    .calendar-weekday {
      text-align: center;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .calendar-button {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--calendar-accent-color);
      font-size: var(--calendar-font-size);
    }

`}</style>
    </>
  );
}

export default Calendar;
