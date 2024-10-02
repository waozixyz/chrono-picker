<script context="module" lang="ts">
  export interface TimePickerProps {
    value?: Date;
    onChange?: (time: Date) => void;
    format?: "12h" | "24h";
    size?: "small" | "medium" | "large";
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";

  export let value: TimePickerProps["value"] = undefined;
  export let format: TimePickerProps["format"] = undefined;
  export let onChange: TimePickerProps["onChange"] = undefined;
  export let size: TimePickerProps["size"] = undefined;
  export let backgroundColor: TimePickerProps["backgroundColor"] = undefined;
  export let textColor: TimePickerProps["textColor"] = undefined;
  export let accentColor: TimePickerProps["accentColor"] = undefined;
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
    onChange?.(newDate);
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
    gridTemplateColumns: `repeat(5, ${
      size === "small" ? "30px" : size === "large" ? "50px" : "40px"
    })`,
    gridTemplateRows: `${
      size === "small" ? "15px" : size === "large" ? "25px" : "20px"
    } ${size === "small" ? "30px" : size === "large" ? "50px" : "40px"} ${
      size === "small" ? "15px" : size === "large" ? "25px" : "20px"
    }`,
    gap: "2px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: backgroundColor || "#ffffff",
    color: textColor || "#333333",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Roboto', sans-serif",
    fontSize: `${
      size === "small" ? "15px" : size === "large" ? "25px" : "20px"
    }`,
  })}
  class={`time-picker ${size || "medium"}`}
>
  <button
    style={stringifyStyles({
      gridColumn: "1 / 3",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: accentColor || "#007bff",
      fontSize: `${
        size === "small" ? "10px" : size === "large" ? "16px" : "13px"
      }`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s",
    })}
    on:click={(event) => {
      incrementHour();
    }}>▲</button
  >
  <div
    style={stringifyStyles({
      gridColumn: "3 / 4",
    })}
  />
  <button
    style={stringifyStyles({
      gridColumn: "4 / 6",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: accentColor || "#007bff",
      fontSize: `${
        size === "small" ? "10px" : size === "large" ? "16px" : "13px"
      }`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s",
    })}
    on:click={(event) => {
      incrementMinute();
    }}>▲</button
  >
  <div
    style={stringifyStyles({
      gridColumn: "1 / 3",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
    })}
  >
    {hour.toString().padStart(2, "0")}
  </div>
  <div
    style={stringifyStyles({
      gridColumn: "3 / 4",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    })}
  >
    :
  </div>
  <div
    style={stringifyStyles({
      gridColumn: "4 / 6",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
    })}
  >
    {minute.toString().padStart(2, "0")}
  </div>
  <button
    style={stringifyStyles({
      gridColumn: "1 / 3",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: accentColor || "#007bff",
      fontSize: `${
        size === "small" ? "10px" : size === "large" ? "16px" : "13px"
      }`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s",
    })}
    on:click={(event) => {
      decrementHour();
    }}>▼</button
  >
  <div
    style={stringifyStyles({
      gridColumn: "3 / 4",
    })}
  />
  <button
    style={stringifyStyles({
      gridColumn: "4 / 6",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: accentColor || "#007bff",
      fontSize: `${
        size === "small" ? "10px" : size === "large" ? "16px" : "13px"
      }`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.3s",
    })}
    on:click={(event) => {
      decrementMinute();
    }}>▼</button
  >
  {#if format === "12h"}
    <div
      style={stringifyStyles({
        gridColumn: "6 / 7",
        gridRow: "1 / 4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "10px",
      })}
    >
      <button
        style={stringifyStyles({
          background: "none",
          border: "none",
          color: period === "AM" ? accentColor || "#007bff" : "inherit",
          cursor: "pointer",
          padding: "5px",
          fontSize: `${
            size === "small" ? "10px" : size === "large" ? "16px" : "13px"
          }`,
          fontWeight: "bold",
        })}
        on:click={(event) => {
          togglePeriod();
        }}
      >
        AM
      </button><button
        style={stringifyStyles({
          background: "none",
          border: "none",
          color: period === "PM" ? accentColor || "#007bff" : "inherit",
          cursor: "pointer",
          padding: "5px",
          fontSize: `${
            size === "small" ? "10px" : size === "large" ? "16px" : "13px"
          }`,
          fontWeight: "bold",
        })}
        on:click={(event) => {
          togglePeriod();
        }}
      >
        PM
      </button>
    </div>
  {/if}
</div>