import {
  $,
  Fragment,
  PropFunction,
  component$,
  h,
  useStore,
  useStylesScoped$,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";

import { DateTime, Info } from "luxon";

export interface CalendarProps {
  value?: Date;
  onChange$?: PropFunction<(event: { target: { value: Date } }) => void>;
  
  minDate?: Date;
  maxDate?: Date;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  fontSize?: string;
  locale?: string;
}
export const changeMonth = function changeMonth(props, state, delta: number) {
  const currentMonth = DateTime.fromISO(state.currentMonthISO);
  state.currentMonthISO =
    currentMonth
      .plus({
        months: delta,
      })
      .startOf("month")
      .toISO() || "";
};
export const selectDate = function selectDate(props, state, day: number) {
  const currentMonth = DateTime.fromISO(state.currentMonthISO);
  const newDate = currentMonth.set({
    day,
  });
  if (newDate.isValid && isDateInRange(props, state, newDate)) {
    state.selectedDateISO = newDate.toISO() || "";
    props.onChange?.({
      target: {
        value: newDate.toJSDate(),
      },
    });
  }
};
export const getEmptyCells = function getEmptyCells(props, state) {
  const currentMonth = DateTime.fromISO(state.currentMonthISO);
  return Array(currentMonth.isValid ? currentMonth.weekday % 7 : 0).fill(null);
};
export const getDayCells = function getDayCells(props, state) {
  const currentMonth = DateTime.fromISO(state.currentMonthISO);
  return Array(currentMonth.isValid ? currentMonth.daysInMonth : 0).fill(null);
};
export const isSelected = function isSelected(props, state, day: number) {
  const currentMonth = DateTime.fromISO(state.currentMonthISO);
  const selectedDate = DateTime.fromISO(state.selectedDateISO);
  return (
    currentMonth.isValid &&
    selectedDate.isValid &&
    selectedDate.hasSame(
      currentMonth.set({
        day,
      }),
      "day"
    )
  );
};
export const isDateInRange = function isDateInRange(
  props,
  state,
  date: DateTime
) {
  const minDate = DateTime.fromISO(state.minDateISO);
  const maxDate = DateTime.fromISO(state.maxDateISO);
  return (
    date.isValid &&
    minDate.isValid &&
    maxDate.isValid &&
    date >= minDate &&
    date <= maxDate
  );
};
export const isDisabled = function isDisabled(props, state, day: number) {
  const currentMonth = DateTime.fromISO(state.currentMonthISO);
  return (
    !currentMonth.isValid ||
    !isDateInRange(
      props,
      state,
      currentMonth.set({
        day,
      })
    )
  );
};
export const getWeekdays = function getWeekdays(props, state) {
  return Info.weekdays("short", {
    locale: state.locale,
  });
};
export const formatMonth = function formatMonth(props, state) {
  const currentMonth = DateTime.fromISO(state.currentMonthISO);
  return currentMonth.isValid
    ? currentMonth.toLocaleString({
        month: "long",
        year: "numeric",
      })
    : "";
};
export const Calendar = component$((props: CalendarProps) => {
  useStylesScoped$(STYLES);

  const state = useStore<any>({
    accentColor: props.accentColor || "#007bff",
    backgroundColor: props.backgroundColor || "#ffffff",
    currentMonthISO: DateTime.local().startOf("month").toISO() || "",
    fontSize: props.fontSize || "14px",
    locale: props.locale || "en",
    maxDateISO:
      (props.maxDate
        ? DateTime.fromJSDate(props.maxDate)
        : DateTime.local().plus({
            years: 100,
          })
      ).toISO() || "",
    minDateISO:
      (props.minDate
        ? DateTime.fromJSDate(props.minDate)
        : DateTime.local().minus({
            years: 100,
          })
      ).toISO() || "",
    selectedDateISO: DateTime.local().toISO() || "",
    textColor: props.textColor || "#333333",
  });
  useVisibleTask$(() => {
    const initialDate = props.value
      ? DateTime.fromJSDate(props.value)
      : DateTime.local();
    state.currentMonthISO = initialDate.startOf("month").toISO() || "";
    state.selectedDateISO = initialDate.toISO() || "";
  });
  useTask$(({ track }) => {
    track(() => props.value);
    if (props.value) {
      const selectedDate = DateTime.fromJSDate(props.value);
      if (selectedDate.isValid) {
        state.selectedDateISO = selectedDate.toISO() || "";
        state.currentMonthISO = selectedDate.startOf("month").toISO() || "";
      }
    }
  });

  return (
    <div
      class="calendar"
      style={{
        "--calendar-background-color": state.backgroundColor,
        "--calendar-text-color": state.textColor,
        "--calendar-accent-color": state.accentColor,
        "--calendar-font-size": state.fontSize,
      }}
    >
      <div class="calendar-header">
        <button
          class="calendar-button"
          onClick$={$((event) => changeMonth(props, state, -1))}
        >
          &lt;
        </button>
        <span>{formatMonth(props, state)}</span>
        <button
          class="calendar-button"
          onClick$={$((event) => changeMonth(props, state, 1))}
        >
          &gt;
        </button>
      </div>
      <div class="calendar-grid">
        {(getWeekdays(props, state) || []).map((day) => {
          return <div class="calendar-weekday">{day}</div>;
        })}
        {(getEmptyCells(props, state) || []).map((_, i) => {
          return <div key={`empty-${i}`}></div>;
        })}
        {(getDayCells(props, state) || []).map((_, i) => {
          return (
            <div
              key={`day-${i + 1}`}
              class={`calendar-day ${
                isSelected(props, state, i + 1) ? "selected" : ""
              } ${isDisabled(props, state, i + 1) ? "disabled" : ""}`}
              onClick$={$((event) => selectDate(props, state, i + 1))}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Calendar;

export const STYLES = `
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
`;
