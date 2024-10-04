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

export interface TimePickerProps {
  value?: Date;
  onChange$?: PropFunction<(event: { target: { value: Date } }) => void>;
  format?: "12h" | "24h";
  size?: "small" | "medium" | "large";
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  showBorder?: boolean;
}
export const updateTime = function updateTime(props, state) {
  let newHour = state.hour;
  if (props.format === "12h") {
    newHour = state.period === "PM" ? (newHour % 12) + 12 : newHour % 12;
    if (newHour === 0) newHour = 12;
  }
  const newDate = new Date(props.value || new Date());
  newDate.setHours(newHour);
  newDate.setMinutes(state.minute);
  props.onChange?.({
    target: {
      value: newDate,
    },
  });
};
export const setHour = function setHour(props, state, value: string) {
  const hourInt = parseInt(value, 10);
  if (isNaN(hourInt)) return;
  const maxHour = props.format === "24h" ? 23 : 12;
  state.hour = Math.max(0, Math.min(hourInt, maxHour));
  updateTime(props, state);
};
export const setMinute = function setMinute(props, state, value: string) {
  const minuteInt = parseInt(value, 10);
  if (isNaN(minuteInt)) return;
  state.minute = Math.max(0, Math.min(minuteInt, 59));
  updateTime(props, state);
};
export const incrementHour = function incrementHour(props, state) {
  state.hour = (state.hour + 1) % (props.format === "24h" ? 24 : 12);
  if (state.hour === 0 && props.format === "12h") state.hour = 12;
  updateTime(props, state);
};
export const decrementHour = function decrementHour(props, state) {
  state.hour =
    (state.hour - 1 + (props.format === "24h" ? 24 : 12)) %
    (props.format === "24h" ? 24 : 12);
  if (state.hour === 0 && props.format === "12h") state.hour = 12;
  updateTime(props, state);
};
export const incrementMinute = function incrementMinute(props, state) {
  state.minute = (state.minute + 1) % 60;
  updateTime(props, state);
};
export const decrementMinute = function decrementMinute(props, state) {
  state.minute = (state.minute - 1 + 60) % 60;
  updateTime(props, state);
};
export const togglePeriod = function togglePeriod(props, state) {
  state.period = state.period === "AM" ? "PM" : "AM";
  updateTime(props, state);
};
export const TimePicker = component$((props: TimePickerProps) => {
  useStylesScoped$(STYLES);

  const state = useStore<any>({
    accentColor: props.accentColor || "#007bff",
    backgroundColor: props.backgroundColor || "#ffffff",
    borderStyle: props.showBorder
      ? `1px solid ${props.accentColor || "#007bff"}`
      : "none",
    buttonColor: "#666666",
    buttonFontSize:
      props.size === "small"
        ? "10px"
        : props.size === "large"
        ? "16px"
        : "13px",
    buttonHoverColor: "#333333",
    cellHeight:
      props.size === "small"
        ? "24px"
        : props.size === "large"
        ? "38px"
        : "30px",
    cellWidth:
      props.size === "small"
        ? "10px"
        : props.size === "large"
        ? "16px"
        : "13px",
    fontSize:
      props.size === "small"
        ? "12px"
        : props.size === "large"
        ? "20px"
        : "16px",
    hour: 0,
    minute: 0,
    period: "AM",
    smallCellHeight:
      props.size === "small"
        ? "12px"
        : props.size === "large"
        ? "19px"
        : "15px",
    textColor: props.textColor || "#333333",
  });
  useVisibleTask$(() => {
    const val = props.value || new Date();
    state.hour = val.getHours() % (props.format === "12h" ? 12 : 24);
    if (state.hour === 0 && props.format === "12h") state.hour = 12;
    state.minute = val.getMinutes();
    state.period = val.getHours() >= 12 ? "PM" : "AM";
  });
  useTask$(({ track }) => {
    track(() => props.value);
    const val = props.value || new Date();
    state.hour = val.getHours() % (props.format === "12h" ? 12 : 24);
    if (state.hour === 0 && props.format === "12h") state.hour = 12;
    state.minute = val.getMinutes();
    state.period = val.getHours() >= 12 ? "PM" : "AM";
  });

  return (
    <div
      class="time-picker"
      style={{
        display: "inline-grid",
        gridTemplateColumns: `repeat(9, ${state.cellWidth})`,
        gridTemplateRows: `${state.smallCellHeight} ${state.cellHeight} ${state.smallCellHeight}`,
        gap: "1px",
        padding: "3px",
        borderRadius: "6px",
        backgroundColor: state.backgroundColor,
        color: state.textColor,
        border: state.borderStyle,
        fontFamily: "'Roboto', sans-serif",
        fontSize: state.fontSize,
        "--time-picker-button-color": state.buttonColor,
        "--time-picker-button-font-size": state.buttonFontSize,
        "--time-picker-button-hover-color": state.buttonHoverColor,
        "--time-picker-accent-color": state.accentColor,
      }}
    >
      <button
        class="time-picker-button"
        onClick$={$((event) => incrementHour(props, state))}
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
      ></div>
      <button
        class="time-picker-button"
        onClick$={$((event) => incrementMinute(props, state))}
        style={{
          gridColumn: "6 / 10",
          gridRow: "1 / 2",
        }}
      >
        +
      </button>
      <input
        type="text"
        class="time-picker-input"
        value={state.hour.toString().padStart(2, "0")}
        onChange$={$((event) => setHour(props, state, event.target.value))}
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
        class="time-picker-input"
        value={state.minute.toString().padStart(2, "0")}
        onChange$={$((event) => setMinute(props, state, event.target.value))}
        style={{
          gridColumn: "6 / 10",
          gridRow: "2 / 3",
        }}
      />
      <button
        class="time-picker-button"
        onClick$={$((event) => decrementHour(props, state))}
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
      ></div>
      <button
        class="time-picker-button"
        onClick$={$((event) => decrementMinute(props, state))}
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
            class="time-picker-period-button"
            onClick$={$((event) => togglePeriod(props, state))}
            style={{
              color:
                state.period === "AM"
                  ? "var(--accent-color)"
                  : "var(--button-color)",
            }}
          >
            AM
          </button>
          <button
            class="time-picker-period-button"
            onClick$={$((event) => togglePeriod(props, state))}
            style={{
              color:
                state.period === "PM"
                  ? "var(--accent-color)"
                  : "var(--button-color)",
            }}
          >
            PM
          </button>
        </div>
      ) : null}
    </div>
  );
});

export default TimePicker;

export const STYLES = `
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
`;
