<script context="module" lang="ts">
  export interface TimePickerProps {
    value?: Date;
    onChange?: (time: Date) => void;
    format?: "12h" | "24h";
    theme?: "light" | "dark" | "custom";
    customTheme?: {
      backgroundColor: string;
      textColor: string;
      accentColor: string;
    };
    size?: "small" | "medium" | "large";
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";

  export let value: TimePickerProps["value"] = undefined;
  export let format: TimePickerProps["format"] = undefined;
  export let onChange: TimePickerProps["onChange"] = undefined;
  export let theme: TimePickerProps["theme"] = undefined;
  export let size: TimePickerProps["size"] = undefined;
  export let customTheme: TimePickerProps["customTheme"] = undefined;
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
    }
    const newDate = new Date(value || new Date());
    newDate.setHours(newHour);
    newDate.setMinutes(minute);
    onChange?.(newDate);
  }
  function animateValue(element, oldValue, newValue, direction) {
    const oldSpan = document.createElement("span");
    oldSpan.textContent = oldValue;
    oldSpan.className = `time-number slide-out-${direction}`;
    const newSpan = document.createElement("span");
    newSpan.textContent = newValue;
    newSpan.className = `time-number slide-in-${direction}`;
    element.innerHTML = "";
    element.appendChild(oldSpan);
    element.appendChild(newSpan);
    setTimeout(() => {
      element.innerHTML = newValue;
    }, 300);
  }
  function handleHourChange(event) {
    const input = event.target;
    let newHour = parseInt(input.value, 10);
    if (isNaN(newHour)) return;
    if (format === "12h") {
      newHour = newHour % 12;
      if (newHour === 0) newHour = 12;
    } else {
      newHour = newHour % 24;
    }
    const oldValue = hour.toString().padStart(2, "0");
    const newValue = newHour.toString().padStart(2, "0");
    animateValue(input, oldValue, newValue, newHour > hour ? "up" : "down");
    hour = newHour;
    updateTime();
  }
  function handleMinuteChange(event) {
    const input = event.target;
    let newMinute = parseInt(input.value, 10);
    if (isNaN(newMinute)) return;
    newMinute = newMinute % 60;
    const oldValue = minute.toString().padStart(2, "0");
    const newValue = newMinute.toString().padStart(2, "0");
    animateValue(input, oldValue, newValue, newMinute > minute ? "up" : "down");
    minute = newMinute;
    updateTime();
  }
  function incrementHour() {
    const input = document.querySelector(`#${id} .time-unit.hour input`);
    if (!input) return;
    const oldValue = hour.toString().padStart(2, "0");
    hour = (hour + 1) % (format === "24h" ? 24 : 12);
    if (hour === 0 && format === "12h") hour = 12;
    const newValue = hour.toString().padStart(2, "0");
    animateValue(input, oldValue, newValue, "up");
    updateTime();
  }
  function decrementHour() {
    const input = document.querySelector(`#${id} .time-unit.hour input`);
    if (!input) return;
    const oldValue = hour.toString().padStart(2, "0");
    hour =
      (hour - 1 + (format === "24h" ? 24 : 12)) % (format === "24h" ? 24 : 12);
    if (hour === 0 && format === "12h") hour = 12;
    const newValue = hour.toString().padStart(2, "0");
    animateValue(input, oldValue, newValue, "down");
    updateTime();
  }
  function incrementMinute() {
    const input = document.querySelector(`#${id} .time-unit.minute input`);
    if (!input) return;
    const oldValue = minute.toString().padStart(2, "0");
    minute = (minute + 1) % 60;
    const newValue = minute.toString().padStart(2, "0");
    animateValue(input, oldValue, newValue, "up");
    updateTime();
  }
  function decrementMinute() {
    const input = document.querySelector(`#${id} .time-unit.minute input`);
    if (!input) return;
    const oldValue = minute.toString().padStart(2, "0");
    minute = (minute - 1 + 60) % 60;
    const newValue = minute.toString().padStart(2, "0");
    animateValue(input, oldValue, newValue, "down");
    updateTime();
  }
  function togglePeriod() {
    period = period === "AM" ? "PM" : "AM";
    updateTime();
  }

  let id = Math.random().toString(36).substr(2, 9);
  let hour = 0;
  let minute = 0;
  let period = "AM";

  onMount(() => {
    const val = value || new Date();
    hour = val.getHours();
    minute = val.getMinutes();
    period = val.getHours() >= 12 ? "PM" : "AM";
  });

  function onUpdateFn_0(..._args: any[]) {
    const val = value || new Date();
    hour = val.getHours();
    minute = val.getMinutes();
    period = val.getHours() >= 12 ? "PM" : "AM";
  }

  $: onUpdateFn_0(...[value]);
</script>

<div
  style={stringifyStyles(customTheme)}
  {id}
  class={`time-picker ${theme || "light"} ${size || "medium"}`}
>
  <div class="time-display">
    <div class="time-unit hour">
      <button
        class="arrow up"
        on:click={(event) => {
          incrementHour();
        }}
        ><svg viewBox="0 0 24 24"
          ><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></svg
        ></button
      >
      <div class="number-wrapper">
        <input
          type="text"
          value={hour.toString().padStart(2, "0")}
          on:change={(event) => {
            handleHourChange(event);
          }}
        />
      </div>
      <button
        class="arrow down"
        on:click={(event) => {
          decrementHour();
        }}
        ><svg viewBox="0 0 24 24"
          ><path
            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
          /></svg
        ></button
      >
    </div>
    <span class="separator">:</span>
    <div class="time-unit minute">
      <button
        class="arrow up"
        on:click={(event) => {
          incrementMinute();
        }}
        ><svg viewBox="0 0 24 24"
          ><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></svg
        ></button
      >
      <div class="number-wrapper">
        <input
          type="text"
          value={minute.toString().padStart(2, "0")}
          on:change={(event) => {
            handleMinuteChange(event);
          }}
        />
      </div>
      <button
        class="arrow down"
        on:click={(event) => {
          decrementMinute();
        }}
        ><svg viewBox="0 0 24 24"
          ><path
            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
          /></svg
        ></button
      >
    </div>
    {#if format === "12h"}
      <div class="time-unit period">
        <button
          on:click={(event) => {
            togglePeriod();
          }}>{period}</button
        >
      </div>
    {/if}
  </div>
</div>

<style>
  .time-picker {
    font-family: Arial, sans-serif;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .time-picker.small {
    width: 180px;
    font-size: 14px;
  }

  .time-picker.medium {
    width: 220px;
    font-size: 16px;
  }

  .time-picker.large {
    width: 260px;
    font-size: 18px;
  }

  .time-picker.light {
    background-color: #ffffff;
    color: #333333;
  }

  .time-picker.dark {
    background-color: #333333;
    color: #ffffff;
  }

  .time-display {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px; /* Add some top margin */
  }

  .time-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .number-wrapper {
    height: 2em; /* Increase height */
    overflow: hidden;
    position: relative;
  }

  .time-unit input {
    width: 2em;
    text-align: center;
    font-size: 2.5em; /* Increase font size */
    border: none;
    background: transparent;
    color: inherit;
    padding: 0;
    margin: 0;
  }

  .time-unit input:focus {
    outline: none;
    background-color: rgba(0, 123, 255, 0.1);
  }

  .separator {
    font-size: 2em;
    margin: 0 0.5em;
  }

  .arrow {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    padding: 10px; /* Increase padding */
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  .arrow:hover {
    opacity: 1;
  }

  .arrow svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  .period button {
    background: none;
    border: none;
    color: inherit;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    margin-left: 10px;
    transition: all 0.3s ease;
  }

  .period button:hover {
    background-color: rgba(0, 123, 255, 0.1);
  }

  @keyframes slideOutUp {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideOutDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  @keyframes slideInDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .slide-out-up {
    animation: slideOutUp 0.3s ease forwards;
  }
  .slide-in-up {
    animation: slideInUp 0.3s ease forwards;
  }
  .slide-out-down {
    animation: slideOutDown 0.3s ease forwards;
  }
  .slide-in-down {
    animation: slideInDown 0.3s ease forwards;
  }

  .time-number {
    position: absolute;
    width: 100%;
    text-align: center;
  }
</style>