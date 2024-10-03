<script context="module" lang="ts">
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
</script>

<script lang="ts">
  import { onMount } from "svelte";

  export let value: TimePickerProps["value"] = undefined;
  export let format: TimePickerProps["format"] = undefined;
  export let size: TimePickerProps["size"] = undefined;
  export let accentColor: TimePickerProps["accentColor"] = undefined;
  export let textColor: TimePickerProps["textColor"] = undefined;
  export let backgroundColor: TimePickerProps["backgroundColor"] = undefined;
  export let showBorder: TimePickerProps["showBorder"] = undefined;
  export let onChange: TimePickerProps["onChange"] = undefined;
  function stringifyStyles(stylesObj) {
    let styles = "";
    for (let key in stylesObj) {
      const dashedKey = key.replace(/[A-Z]/g, function (match) {
        return "-" + match.toLowerCase();
      });
      styles += dashedKey + ":" + stylesObj[key] + ";";
    }
    return styles;
  }

  function updateTime() {
    let newHour = hour;
    if (format === "12h") {
      newHour = period === "PM" ? (newHour % 12) + 12 : newHour % 12;
      if (newHour === 0) newHour = 12;
    }
    const newDate = new Date(value || new Date());
    newDate.setHours(newHour);
    newDate.setMinutes(minute);
    onChange?.({
      target: {
        value: newDate,
      },
    });
  }
  function setHour(value: string) {
    const hourInt = parseInt(value, 10);
    if (isNaN(hourInt)) return;
    const maxHour = format === "24h" ? 23 : 12;
    hour = Math.max(0, Math.min(hourInt, maxHour));
    updateTime();
  }
  function setMinute(value: string) {
    const minuteInt = parseInt(value, 10);
    if (isNaN(minuteInt)) return;
    minute = Math.max(0, Math.min(minuteInt, 59));
    updateTime();
  }
  function incrementHour() {
    hour = (hour + 1) % (format === "24h" ? 24 : 12);
    if (hour === 0 && format === "12h") hour = 12;
    updateTime();
  }
  function decrementHour() {
    hour =
      (hour - 1 + (format === "24h" ? 24 : 12)) % (format === "24h" ? 24 : 12);
    if (hour === 0 && format === "12h") hour = 12;
    updateTime();
  }
  function incrementMinute() {
    minute = (minute + 1) % 60;
    updateTime();
  }
  function decrementMinute() {
    minute = (minute - 1 + 60) % 60;
    updateTime();
  }
  function togglePeriod() {
    period = period === "AM" ? "PM" : "AM";
    updateTime();
  }

  let hour = 0;
  let minute = 0;
  let period = "AM";
  let cellWidth =
    size === "small" ? "10px" : size === "large" ? "16px" : "13px";
  let cellHeight =
    size === "small" ? "24px" : size === "large" ? "38px" : "30px";
  let smallCellHeight =
    size === "small" ? "12px" : size === "large" ? "19px" : "15px";
  let fontSize = size === "small" ? "12px" : size === "large" ? "20px" : "16px";
  let buttonFontSize =
    size === "small" ? "10px" : size === "large" ? "16px" : "13px";
  let accentColor = accentColor || "#007bff";
  let textColor = textColor || "#333333";
  let backgroundColor = backgroundColor || "#ffffff";
  let borderStyle = showBorder
    ? `1px solid ${accentColor || "#007bff"}`
    : "none";
  let buttonColor = "#666666";
  let buttonHoverColor = "#333333";

  onMount(() => {
    const val = value || new Date();
    hour = val.getHours() % (format === "12h" ? 12 : 24);
    if (hour === 0 && format === "12h") hour = 12;
    minute = val.getMinutes();
    period = val.getHours() >= 12 ? "PM" : "AM";
  });

  function onUpdateFn_0(..._args: any[]) {
    const val = value || new Date();
    hour = val.getHours() % (format === "12h" ? 12 : 24);
    if (hour === 0 && format === "12h") hour = 12;
    minute = val.getMinutes();
    period = val.getHours() >= 12 ? "PM" : "AM";
  }

  $: onUpdateFn_0(...[value]);
</script>

<div
  style={stringifyStyles({
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
  })}
  class="time-picker"
>
  <button
    style={stringifyStyles({
      gridColumn: "1 / 5",
      gridRow: "1 / 2",
    })}
    class="time-picker-button"
    on:click={(event) => {
      incrementHour();
    }}>+</button
  >
  <div
    style={stringifyStyles({
      gridColumn: "5 / 6",
    })}
  />
  <button
    style={stringifyStyles({
      gridColumn: "6 / 10",
      gridRow: "1 / 2",
    })}
    class="time-picker-button"
    on:click={(event) => {
      incrementMinute();
    }}>+</button
  ><input
    style={stringifyStyles({
      gridColumn: "1 / 5",
      gridRow: "2 / 3",
    })}
    type="text"
    class="time-picker-input"
    value={hour.toString().padStart(2, "0")}
    on:change={(event) => {
      setHour(event.target.value);
    }}
  />
  <div
    style={stringifyStyles({
      gridColumn: "5 / 6",
      gridRow: "2 / 3",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    })}
  >
    :
  </div>
  <input
    style={stringifyStyles({
      gridColumn: "6 / 10",
      gridRow: "2 / 3",
    })}
    type="text"
    class="time-picker-input"
    value={minute.toString().padStart(2, "0")}
    on:change={(event) => {
      setMinute(event.target.value);
    }}
  /><button
    style={stringifyStyles({
      gridColumn: "1 / 5",
      gridRow: "3 / 4",
    })}
    class="time-picker-button"
    on:click={(event) => {
      decrementHour();
    }}>-</button
  >
  <div
    style={stringifyStyles({
      gridColumn: "5 / 6",
    })}
  />
  <button
    style={stringifyStyles({
      gridColumn: "6 / 10",
      gridRow: "3 / 4",
    })}
    class="time-picker-button"
    on:click={(event) => {
      decrementMinute();
    }}>-</button
  >
  {#if format === "12h"}
    <div
      style={stringifyStyles({
        gridColumn: "10 / 11",
        gridRow: "1 / 4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "2px",
      })}
    >
      <button
        style={stringifyStyles({
          color:
            period === "AM" ? "var(--accent-color)" : "var(--button-color)",
        })}
        class="time-picker-period-button"
        on:click={(event) => {
          togglePeriod();
        }}
      >
        AM
      </button><button
        style={stringifyStyles({
          color:
            period === "PM" ? "var(--accent-color)" : "var(--button-color)",
        })}
        class="time-picker-period-button"
        on:click={(event) => {
          togglePeriod();
        }}
      >
        PM
      </button>
    </div>
  {/if}
</div>

<style>
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
</style>