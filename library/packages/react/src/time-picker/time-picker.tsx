"use client";
import * as React from "react";
import { useState, useEffect } from "react";

export interface TimePickerProps {
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
}

function TimePicker(props: TimePickerProps) {
  const [hour, setHour] = useState(() => 0);

  const [minute, setMinute] = useState(() => 0);

  const [period, setPeriod] = useState(() => "AM");

  const [cellWidth, setCellWidth] = useState(() =>
    props.size === "small" ? "10px" : props.size === "large" ? "16px" : "13px"
  );

  const [cellHeight, setCellHeight] = useState(() =>
    props.size === "small" ? "24px" : props.size === "large" ? "38px" : "30px"
  );

  const [smallCellHeight, setSmallCellHeight] = useState(() =>
    props.size === "small" ? "12px" : props.size === "large" ? "19px" : "15px"
  );

  const [fontSize, setFontSize] = useState(() =>
    props.size === "small" ? "12px" : props.size === "large" ? "20px" : "16px"
  );

  const [buttonFontSize, setButtonFontSize] = useState(() =>
    props.size === "small" ? "10px" : props.size === "large" ? "16px" : "13px"
  );

  const [accentColor, setAccentColor] = useState(
    () => props.accentColor || "#007bff"
  );

  const [textColor, setTextColor] = useState(
    () => props.textColor || "#333333"
  );

  const [backgroundColor, setBackgroundColor] = useState(
    () => props.backgroundColor || "#ffffff"
  );

  const [borderStyle, setBorderStyle] = useState(() =>
    props.showBorder ? `1px solid ${props.accentColor || "#007bff"}` : "none"
  );

  const [buttonColor, setButtonColor] = useState(() => "#666666");

  const [buttonHoverColor, setButtonHoverColor] = useState(() => "#333333");

  function updateTime() {
    let newHour = hour;
    if (props.format === "12h") {
      newHour = period === "PM" ? (newHour % 12) + 12 : newHour % 12;
      if (newHour === 0) newHour = 12;
    }
    const newDate = new Date(props.value || new Date());
    newDate.setHours(newHour);
    newDate.setMinutes(minute);
    props.onChange?.({
      target: {
        value: newDate,
      },
    });
  }

  function setHour(value: string) {
    const hourInt = parseInt(value, 10);
    if (isNaN(hourInt)) return;
    const maxHour = props.format === "24h" ? 23 : 12;
    setHour(Math.max(0, Math.min(hourInt, maxHour)));
    updateTime();
  }

  function setMinute(value: string) {
    const minuteInt = parseInt(value, 10);
    if (isNaN(minuteInt)) return;
    setMinute(Math.max(0, Math.min(minuteInt, 59)));
    updateTime();
  }

  function incrementHour() {
    setHour((hour + 1) % (props.format === "24h" ? 24 : 12));
    if (hour === 0 && props.format === "12h") setHour(12);
    updateTime();
  }

  function decrementHour() {
    setHour(
      (hour - 1 + (props.format === "24h" ? 24 : 12)) %
        (props.format === "24h" ? 24 : 12)
    );
    if (hour === 0 && props.format === "12h") setHour(12);
    updateTime();
  }

  function incrementMinute() {
    setMinute((minute + 1) % 60);
    updateTime();
  }

  function decrementMinute() {
    setMinute((minute - 1 + 60) % 60);
    updateTime();
  }

  function togglePeriod() {
    setPeriod(period === "AM" ? "PM" : "AM");
    updateTime();
  }

  useEffect(() => {
    const val = props.value || new Date();
    setHour(val.getHours() % (props.format === "12h" ? 12 : 24));
    if (hour === 0 && props.format === "12h") setHour(12);
    setMinute(val.getMinutes());
    setPeriod(val.getHours() >= 12 ? "PM" : "AM");
  }, []);

  useEffect(() => {
    const val = props.value || new Date();
    setHour(val.getHours() % (props.format === "12h" ? 12 : 24));
    if (hour === 0 && props.format === "12h") setHour(12);
    setMinute(val.getMinutes());
    setPeriod(val.getHours() >= 12 ? "PM" : "AM");
  }, [props.value]);

  return (
    <>
      <div
        className="time-picker"
        style={{
          display: "inline-grid",
          gridTemplateColumns: `repeat(9, ${cellWidth})`,
          gridTemplateRows: `${smallCellHeight} ${cellHeight} ${smallCellHeight}`,
          gap: "1px",
          padding: "3px",
          borderRadius: "6px",
          backgroundColor: backgroundColor,
          color: textColor,
          border: borderStyle,
          fontFamily: "'Roboto', sans-serif",
          fontSize: fontSize,
          "--time-picker-button-color": buttonColor,
          "--time-picker-button-font-size": buttonFontSize,
          "--time-picker-button-hover-color": buttonHoverColor,
          "--time-picker-accent-color": accentColor,
        }}
      >
        <button
          className="time-picker-button"
          onClick={(event) => incrementHour()}
          style={{
            gridColumn: "1 / 5",
            gridRow: "1 / 2",
          }}
        >
          +
        </button>
        <div
          style={{
            gridColumn: "5 / 6",
          }}
        />
        <button
          className="time-picker-button"
          onClick={(event) => incrementMinute()}
          style={{
            gridColumn: "6 / 10",
            gridRow: "1 / 2",
          }}
        >
          +
        </button>
        <input
          type="text"
          className="time-picker-input"
          value={hour.toString().padStart(2, "0")}
          onChange={(event) => setHour(event.target.value)}
          style={{
            gridColumn: "1 / 5",
            gridRow: "2 / 3",
          }}
        />
        <div
          style={{
            gridColumn: "5 / 6",
            gridRow: "2 / 3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          :
        </div>
        <input
          type="text"
          className="time-picker-input"
          value={minute.toString().padStart(2, "0")}
          onChange={(event) => setMinute(event.target.value)}
          style={{
            gridColumn: "6 / 10",
            gridRow: "2 / 3",
          }}
        />
        <button
          className="time-picker-button"
          onClick={(event) => decrementHour()}
          style={{
            gridColumn: "1 / 5",
            gridRow: "3 / 4",
          }}
        >
          -
        </button>
        <div
          style={{
            gridColumn: "5 / 6",
          }}
        />
        <button
          className="time-picker-button"
          onClick={(event) => decrementMinute()}
          style={{
            gridColumn: "6 / 10",
            gridRow: "3 / 4",
          }}
        >
          -
        </button>
        {props.format === "12h" ? (
          <div
            style={{
              gridColumn: "10 / 11",
              gridRow: "1 / 4",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "2px",
            }}
          >
            <button
              className="time-picker-period-button"
              onClick={(event) => togglePeriod()}
              style={{
                color:
                  period === "AM"
                    ? "var(--accent-color)"
                    : "var(--button-color)",
              }}
            >
              AM
            </button>
            <button
              className="time-picker-period-button"
              onClick={(event) => togglePeriod()}
              style={{
                color:
                  period === "PM"
                    ? "var(--accent-color)"
                    : "var(--button-color)",
              }}
            >
              PM
            </button>
          </div>
        ) : null}
      </div>

      <style>{`
    .time-picker {
      --button-color: var(--time-picker-button-color);
      --button-font-size: var(--time-picker-button-font-size);
      --button-hover-color: var(--time-picker-button-hover-color);
      --accent-color: var(--time-picker-accent-color);
    }
    .time-picker-button {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--button-color);
      font-size: var(--button-font-size);
      font-weight: bold;
      opacity: 0.5;
      transition: opacity 0.3s;
    }
    .time-picker-button:hover {
      opacity: 1;
    }
    .time-picker-input {
      text-align: center;
      border: none;
      background: none;
      color: inherit;
      font-size: inherit;
      font-weight: bold;
      width: 100%;
      padding: 0;
    }
    .time-picker-period-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 1px;
      font-size: var(--button-font-size);
      font-weight: bold;
      transition: color 0.3s;
    }
    .time-picker-period-button:hover {
      color: var(--button-hover-color);
    }

`}</style>
    </>
  );
}

export default TimePicker;
