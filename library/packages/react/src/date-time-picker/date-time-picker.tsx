"use client";
import * as React from "react";
import { useState } from "react";

export interface DateTimePickerProps {
  value?: Date;
  onChange?: (event: {
    target: {
      value: Date;
    };
  }) => void;
  format?: "12h" | "24h";
  size?: "small" | "medium" | "large";
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  showBorder?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

import TimePicker from "../time-picker/time-picker";
import Calendar from "../calendar/calendar";

function DateTimePicker(props: DateTimePickerProps) {
  const [selectedDateTime, setSelectedDateTime] = useState(
    () => props.value || new Date()
  );

  const [isCalendarOpen, setIsCalendarOpen] = useState(() => false);

  const [backgroundColor, setBackgroundColor] = useState(
    () => props.backgroundColor || "#ffffff"
  );

  const [textColor, setTextColor] = useState(
    () => props.textColor || "#333333"
  );

  const [accentColor, setAccentColor] = useState(
    () => props.accentColor || "#007bff"
  );

  const [fontSize, setFontSize] = useState(() =>
    props.size === "small" ? "12px" : props.size === "large" ? "18px" : "14px"
  );

  const [borderStyle, setBorderStyle] = useState(() =>
    props.showBorder ? `1px solid ${props.accentColor || "#007bff"}` : "none"
  );

  function updateDateTime() {
    props.onChange?.({
      target: {
        value: selectedDateTime,
      },
    });
  }

  function setDate(event: {
    target: {
      value: Date;
    };
  }) {
    setSelectedDateTime(
      new Date(
        event.target.value.getFullYear(),
        event.target.value.getMonth(),
        event.target.value.getDate(),
        selectedDateTime.getHours(),
        selectedDateTime.getMinutes()
      )
    );
    updateDateTime();
  }

  function setTime(event: {
    target: {
      value: Date;
    };
  }) {
    setSelectedDateTime(
      new Date(
        selectedDateTime.getFullYear(),
        selectedDateTime.getMonth(),
        selectedDateTime.getDate(),
        event.target.value.getHours(),
        event.target.value.getMinutes()
      )
    );
    updateDateTime();
  }

  function toggleCalendar() {
    setIsCalendarOpen(!isCalendarOpen);
  }

  function formatDate() {
    return selectedDateTime.toLocaleDateString();
  }

  return (
    <>
      <div
        className="date-time-picker"
        style={{
          "--date-time-picker-background-color": backgroundColor,
          "--date-time-picker-text-color": textColor,
          "--date-time-picker-accent-color": accentColor,
          "--date-time-picker-font-size": fontSize,
          "--date-time-picker-border": borderStyle,
        }}
      >
        <div className="date-display">
          <span>{formatDate()}</span>
          <button
            className="toggle-button"
            onClick={(event) => toggleCalendar()}
          >
            {isCalendarOpen ? <>▲</> : <>▼</>}
          </button>
        </div>
        {isCalendarOpen ? (
          <Calendar
            value={selectedDateTime}
            onChange={(event) => setDate(event)}
            minDate={props.minDate}
            maxDate={props.maxDate}
            accentColor={accentColor}
            fontSize={fontSize}
            backgroundColor={backgroundColor}
            textColor={textColor}
          />
        ) : null}
        <TimePicker
          value={selectedDateTime}
          onChange={(event) => setTime(event)}
          format={props.format}
          size={props.size}
          backgroundColor={backgroundColor}
          textColor={textColor}
          accentColor={accentColor}
          showBorder={false}
        />
      </div>

      <style>{`
    .date-time-picker {
      font-family: 'Roboto', sans-serif;
      width: 300px;
      background-color: var(--date-time-picker-background-color);
      color: var(--date-time-picker-text-color);
      border: var(--date-time-picker-border);
      border-radius: 8px;
      padding: 10px;
    }
    .date-display {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .date-display span {
      flex-grow: 1;
      text-align: center;
    }
    .toggle-button {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--date-time-picker-accent-color);
      font-size: var(--date-time-picker-font-size);
    }

`}</style>
    </>
  );
}

export default DateTimePicker;
