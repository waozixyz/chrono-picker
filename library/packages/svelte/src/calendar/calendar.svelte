<script context="module" lang="ts">
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
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import { DateTime, Info } from "luxon";

  export let value: CalendarProps["value"] = undefined;
  export let minDate: CalendarProps["minDate"] = undefined;
  export let maxDate: CalendarProps["maxDate"] = undefined;
  export let backgroundColor: CalendarProps["backgroundColor"] = undefined;
  export let textColor: CalendarProps["textColor"] = undefined;
  export let accentColor: CalendarProps["accentColor"] = undefined;
  export let fontSize: CalendarProps["fontSize"] = undefined;
  export let locale: CalendarProps["locale"] = undefined;
  export let onChange: CalendarProps["onChange"] = undefined;
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

  function changeMonth(delta: number) {
    currentMonth = currentMonth
      .plus({
        months: delta,
      })
      .startOf("month") as DateTime<true>;
  }
  function selectDate(day: number) {
    const newDate = currentMonth.set({
      day,
    }) as DateTime<true>;
    if (isDateInRange(newDate)) {
      selectedDate = newDate;
      onChange?.({
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

  let currentMonth = DateTime.local().startOf("month");
  let selectedDate = DateTime.local();
  let minDate = minDate
    ? DateTime.fromJSDate(minDate)
    : DateTime.local().minus({
        years: 100,
      });
  let maxDate = maxDate
    ? DateTime.fromJSDate(maxDate)
    : DateTime.local().plus({
        years: 100,
      });
  let backgroundColor = backgroundColor || "#ffffff";
  let textColor = textColor || "#333333";
  let accentColor = accentColor || "#007bff";
  let fontSize = fontSize || "14px";
  let locale = locale || "en";

  onMount(() => {
    currentMonth = (
      value ? DateTime.fromJSDate(value) : DateTime.local()
    ).startOf("month") as DateTime<true>;
    selectedDate = (
      value ? DateTime.fromJSDate(value) : DateTime.local()
    ) as DateTime<true>;
  });

  function onUpdateFn_0(..._args: any[]) {
    if (value) {
      selectedDate = DateTime.fromJSDate(value) as DateTime<true>;
      currentMonth = selectedDate.startOf("month") as DateTime<true>;
    }
  }

  $: onUpdateFn_0(...[value]);
</script>

<div
  style={stringifyStyles({
    "--calendar-background-color": backgroundColor,
    "--calendar-text-color": textColor,
    "--calendar-accent-color": accentColor,
    "--calendar-font-size": fontSize,
  })}
  class="calendar"
>
  <div class="calendar-header">
    <button
      class="calendar-button"
      on:click={(event) => {
        changeMonth(-1);
      }}>&lt;</button
    ><span>{formatMonth()}</span><button
      class="calendar-button"
      on:click={(event) => {
        changeMonth(1);
      }}>&gt;</button
    >
  </div>
  <div class="calendar-grid">
    {#each getWeekdays() as day}
      <div class="calendar-weekday">{day}</div>
    {/each}

    {#each getEmptyCells() as _, i (`empty-${i}`)}
      <div />
    {/each}

    {#each getDayCells() as _, i (`day-${i + 1}`)}
      <div
        class={`calendar-day ${isSelected(i + 1) ? "selected" : ""} ${
          isDisabled(i + 1) ? "disabled" : ""
        }`}
        on:click={(event) => {
          selectDate(i + 1);
        }}
      >
        {i + 1}
      </div>
    {/each}
  </div>
</div>

<style>
  .calendar {
    font-family: "Roboto", sans-serif;
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
  .calendar-day:hover:not(.disabled),
  .calendar-day.selected {
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
</style>