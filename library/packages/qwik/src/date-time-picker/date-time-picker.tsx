import Calendar from "../calendar/calendar.jsx";

import TimePicker from "../time-picker/time-picker.jsx";

import {
  $,
  Fragment,
  component$,
  h,
  useStore,
  useStylesScoped$,
  PropFunction
} from "@builder.io/qwik";

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
export const updateDateTime = function updateDateTime(props, state) {
  props.onChange?.({
    target: {
      value: state.selectedDateTime,
    },
  });
};
export const setDate = function setDate(
  props,
  state,
  event: {
    target: {
      value: Date;
    };
  }
) {
  state.selectedDateTime = new Date(
    event.target.value.getFullYear(),
    event.target.value.getMonth(),
    event.target.value.getDate(),
    state.selectedDateTime.getHours(),
    state.selectedDateTime.getMinutes()
  );
  updateDateTime(props, state);
};
export const setTime = function setTime(
  props,
  state,
  event: {
    target: {
      value: Date;
    };
  }
) {
  state.selectedDateTime = new Date(
    state.selectedDateTime.getFullYear(),
    state.selectedDateTime.getMonth(),
    state.selectedDateTime.getDate(),
    event.target.value.getHours(),
    event.target.value.getMinutes()
  );
  updateDateTime(props, state);
};
export const toggleCalendar = function toggleCalendar(props, state) {
  state.isCalendarOpen = !state.isCalendarOpen;
};
export const formatDate = function formatDate(props, state) {
  return state.selectedDateTime.toLocaleDateString();
};
export const DateTimePicker = component$((props: DateTimePickerProps) => {
  useStylesScoped$(STYLES);

  const state = useStore<any>({
    accentColor: props.accentColor || "#007bff",
    backgroundColor: props.backgroundColor || "#ffffff",
    borderStyle: props.showBorder
      ? `1px solid ${props.accentColor || "#007bff"}`
      : "none",
    fontSize:
      props.size === "small"
        ? "12px"
        : props.size === "large"
        ? "18px"
        : "14px",
    isCalendarOpen: false,
    selectedDateTime: props.value || new Date(),
    textColor: props.textColor || "#333333",
  });

  return (
    <div
      class="date-time-picker"
      style={{
        "--date-time-picker-background-color": state.backgroundColor,
        "--date-time-picker-text-color": state.textColor,
        "--date-time-picker-accent-color": state.accentColor,
        "--date-time-picker-font-size": state.fontSize,
        "--date-time-picker-border": state.borderStyle,
      }}
    >
      <div class="date-display">
        <span>{formatDate(props, state)}</span>
        <button
          class="toggle-button"
          onClick$={$((event) => toggleCalendar(props, state))}
        >
          {state.isCalendarOpen ? <>▲</> : <>▼</>}
        </button>
      </div>
      {state.isCalendarOpen ? (
        <Calendar
          value={state.selectedDateTime}
          onChange$={$((event) => setDate(props, state, event))}
          minDate={props.minDate}
          maxDate={props.maxDate}
          accentColor={state.accentColor}
          fontSize={state.fontSize}
          backgroundColor={state.backgroundColor}
          textColor={state.textColor}
        ></Calendar>
      ) : null}
      <TimePicker
        value={state.selectedDateTime}
        onChange$={$((event) => setTime(props, state, event))}
        format={props.format}
        size={props.size}
        backgroundColor={state.backgroundColor}
        textColor={state.textColor}
        accentColor={state.accentColor}
        showBorder={false}
      ></TimePicker>
    </div>
  );
});

export default DateTimePicker;

export const STYLES = `
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
`;
