<script context="module" lang="ts">
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
</script>

<script lang="ts">
  import TimePicker from "../time-picker/time-picker.svelte";
  import Calendar from "../calendar/calendar.svelte";

  export let value: DateTimePickerProps["value"] = undefined;
  export let backgroundColor: DateTimePickerProps["backgroundColor"] =
    undefined;
  export let textColor: DateTimePickerProps["textColor"] = undefined;
  export let accentColor: DateTimePickerProps["accentColor"] = undefined;
  export let size: DateTimePickerProps["size"] = undefined;
  export let showBorder: DateTimePickerProps["showBorder"] = undefined;
  export let onChange: DateTimePickerProps["onChange"] = undefined;
  export let minDate: DateTimePickerProps["minDate"] = undefined;
  export let maxDate: DateTimePickerProps["maxDate"] = undefined;
  export let format: DateTimePickerProps["format"] = undefined;
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

  function updateDateTime() {
    onChange?.({
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
    selectedDateTime = new Date(
      event.target.value.getFullYear(),
      event.target.value.getMonth(),
      event.target.value.getDate(),
      selectedDateTime.getHours(),
      selectedDateTime.getMinutes()
    );
    updateDateTime();
  }
  function setTime(event: {
    target: {
      value: Date;
    };
  }) {
    selectedDateTime = new Date(
      selectedDateTime.getFullYear(),
      selectedDateTime.getMonth(),
      selectedDateTime.getDate(),
      event.target.value.getHours(),
      event.target.value.getMinutes()
    );
    updateDateTime();
  }
  function toggleCalendar() {
    isCalendarOpen = !isCalendarOpen;
  }
  function formatDate() {
    return selectedDateTime.toLocaleDateString();
  }

  let selectedDateTime = value || new Date();
  let isCalendarOpen = false;
  let backgroundColor = backgroundColor || "#ffffff";
  let textColor = textColor || "#333333";
  let accentColor = accentColor || "#007bff";
  let fontSize = size === "small" ? "12px" : size === "large" ? "18px" : "14px";
  let borderStyle = showBorder
    ? `1px solid ${accentColor || "#007bff"}`
    : "none";
</script>

<div
  style={stringifyStyles({
    "--date-time-picker-background-color": backgroundColor,
    "--date-time-picker-text-color": textColor,
    "--date-time-picker-accent-color": accentColor,
    "--date-time-picker-font-size": fontSize,
    "--date-time-picker-border": borderStyle,
  })}
  class="date-time-picker"
>
  <div class="date-display">
    <span>{formatDate()}</span><button
      class="toggle-button"
      on:click={(event) => {
        toggleCalendar();
      }}
    >
      {#if isCalendarOpen}
        ▲
      {:else}
        ▼
      {/if}</button
    >
  </div>
  {#if isCalendarOpen}
    <Calendar
      value={selectedDateTime}
      onChange={(event) => setDate(event)}
      {minDate}
      {maxDate}
      {accentColor}
      {fontSize}
      {backgroundColor}
      {textColor}
    />
  {/if}<TimePicker
    value={selectedDateTime}
    onChange={(event) => setTime(event)}
    {format}
    {size}
    {backgroundColor}
    {textColor}
    {accentColor}
    showBorder={false}
  />
</div>

<style>
  .date-time-picker {
    font-family: "Roboto", sans-serif;
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
</style>