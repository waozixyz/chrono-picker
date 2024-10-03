"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const qwik = require("@builder.io/qwik");
const updateTime = function updateTime2(props, state) {
  let newHour = state.hour;
  if (props.format === "12h") {
    newHour = state.period === "PM" ? newHour % 12 + 12 : newHour % 12;
    if (newHour === 0)
      newHour = 12;
  }
  const newDate = new Date(props.value || /* @__PURE__ */ new Date());
  newDate.setHours(newHour);
  newDate.setMinutes(state.minute);
  props.onChange?.(newDate);
};
const setHour = function setHour2(props, state, value) {
  const hourInt = parseInt(value, 10);
  if (isNaN(hourInt))
    return;
  const maxHour = props.format === "24h" ? 23 : 12;
  state.hour = Math.max(0, Math.min(hourInt, maxHour));
  updateTime(props, state);
};
const setMinute = function setMinute2(props, state, value) {
  const minuteInt = parseInt(value, 10);
  if (isNaN(minuteInt))
    return;
  state.minute = Math.max(0, Math.min(minuteInt, 59));
  updateTime(props, state);
};
const incrementHour = function incrementHour2(props, state) {
  state.hour = (state.hour + 1) % (props.format === "24h" ? 24 : 12);
  if (state.hour === 0 && props.format === "12h")
    state.hour = 12;
  updateTime(props, state);
};
const decrementHour = function decrementHour2(props, state) {
  state.hour = (state.hour - 1 + (props.format === "24h" ? 24 : 12)) % (props.format === "24h" ? 24 : 12);
  if (state.hour === 0 && props.format === "12h")
    state.hour = 12;
  updateTime(props, state);
};
const incrementMinute = function incrementMinute2(props, state) {
  state.minute = (state.minute + 1) % 60;
  updateTime(props, state);
};
const decrementMinute = function decrementMinute2(props, state) {
  state.minute = (state.minute - 1 + 60) % 60;
  updateTime(props, state);
};
const togglePeriod = function togglePeriod2(props, state) {
  state.period = state.period === "AM" ? "PM" : "AM";
  updateTime(props, state);
};
const TimePicker = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  qwik.useStylesScopedQrl(/* @__PURE__ */ qwik.inlinedQrl(STYLES, "TimePicker_component_useStylesScoped_tAVqQNaeX0E"));
  const state = qwik.useStore({
    accentColor: props.accentColor || "#007bff",
    backgroundColor: props.backgroundColor || "#ffffff",
    borderStyle: props.showBorder ? `1px solid ${props.accentColor || "#007bff"}` : "none",
    buttonColor: "#666666",
    buttonFontSize: props.size === "small" ? "10px" : props.size === "large" ? "16px" : "13px",
    buttonHoverColor: "#333333",
    cellHeight: props.size === "small" ? "24px" : props.size === "large" ? "38px" : "30px",
    cellWidth: props.size === "small" ? "10px" : props.size === "large" ? "16px" : "13px",
    fontSize: props.size === "small" ? "12px" : props.size === "large" ? "20px" : "16px",
    hour: 0,
    minute: 0,
    period: "AM",
    smallCellHeight: props.size === "small" ? "12px" : props.size === "large" ? "19px" : "15px",
    textColor: props.textColor || "#333333"
  });
  qwik.useVisibleTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [props2, state2] = qwik.useLexicalScope();
    const val = props2.value || /* @__PURE__ */ new Date();
    state2.hour = val.getHours() % (props2.format === "12h" ? 12 : 24);
    if (state2.hour === 0 && props2.format === "12h")
      state2.hour = 12;
    state2.minute = val.getMinutes();
    state2.period = val.getHours() >= 12 ? "PM" : "AM";
  }, "TimePicker_component_useVisibleTask_mXivY0dnA58", [
    props,
    state
  ]));
  qwik.useTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(({ track }) => {
    const [props2, state2] = qwik.useLexicalScope();
    track(() => props2.value);
    const val = props2.value || /* @__PURE__ */ new Date();
    state2.hour = val.getHours() % (props2.format === "12h" ? 12 : 24);
    if (state2.hour === 0 && props2.format === "12h")
      state2.hour = 12;
    state2.minute = val.getMinutes();
    state2.period = val.getHours() >= 12 ? "PM" : "AM";
  }, "TimePicker_component_useTask_0FdrkOrkgYE", [
    props,
    state
  ]));
  return /* @__PURE__ */ qwik._jsxQ("div", {
    style: {
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
      "--time-picker-accent-color": state.accentColor
    }
  }, {
    class: "time-picker"
  }, [
    /* @__PURE__ */ qwik._jsxQ("button", {
      onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
        const [props2, state2] = qwik.useLexicalScope();
        return incrementHour(props2, state2);
      }, "TimePicker_component_div_button_onClick_Eytk0fGoBvQ", [
        props,
        state
      ])
    }, {
      class: "time-picker-button",
      style: {
        gridColumn: "1 / 5",
        gridRow: "1 / 2"
      }
    }, "+", 2, null),
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      style: {
        gridColumn: "5 / 6"
      }
    }, null, 3, null),
    /* @__PURE__ */ qwik._jsxQ("button", {
      onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
        const [props2, state2] = qwik.useLexicalScope();
        return incrementMinute(props2, state2);
      }, "TimePicker_component_div_button_onClick_1_WLLbkFC79Tw", [
        props,
        state
      ])
    }, {
      class: "time-picker-button",
      style: {
        gridColumn: "6 / 10",
        gridRow: "1 / 2"
      }
    }, "+", 2, null),
    /* @__PURE__ */ qwik._jsxQ("input", {
      onChange$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
        const [props2, state2] = qwik.useLexicalScope();
        return setHour(props2, state2, event.target.value);
      }, "TimePicker_component_div_input_onChange_E9W6dmdesA8", [
        props,
        state
      ])
    }, {
      class: "time-picker-input",
      style: {
        gridColumn: "1 / 5",
        gridRow: "2 / 3"
      },
      type: "text",
      value: qwik._fnSignal((p0) => p0.hour.toString().padStart(2, "0"), [
        state
      ], 'p0.hour.toString().padStart(2,"0")')
    }, null, 2, null),
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      style: {
        gridColumn: "5 / 6",
        gridRow: "2 / 3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
    }, ":", 3, null),
    /* @__PURE__ */ qwik._jsxQ("input", {
      onChange$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
        const [props2, state2] = qwik.useLexicalScope();
        return setMinute(props2, state2, event.target.value);
      }, "TimePicker_component_div_input_onChange_1_uJYlkrkl08Q", [
        props,
        state
      ])
    }, {
      class: "time-picker-input",
      style: {
        gridColumn: "6 / 10",
        gridRow: "2 / 3"
      },
      type: "text",
      value: qwik._fnSignal((p0) => p0.minute.toString().padStart(2, "0"), [
        state
      ], 'p0.minute.toString().padStart(2,"0")')
    }, null, 2, null),
    /* @__PURE__ */ qwik._jsxQ("button", {
      onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
        const [props2, state2] = qwik.useLexicalScope();
        return decrementHour(props2, state2);
      }, "TimePicker_component_div_button_onClick_2_QK0Ps0wke9A", [
        props,
        state
      ])
    }, {
      class: "time-picker-button",
      style: {
        gridColumn: "1 / 5",
        gridRow: "3 / 4"
      }
    }, "-", 2, null),
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      style: {
        gridColumn: "5 / 6"
      }
    }, null, 3, null),
    /* @__PURE__ */ qwik._jsxQ("button", {
      onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
        const [props2, state2] = qwik.useLexicalScope();
        return decrementMinute(props2, state2);
      }, "TimePicker_component_div_button_onClick_3_aiCod7OSrYQ", [
        props,
        state
      ])
    }, {
      class: "time-picker-button",
      style: {
        gridColumn: "6 / 10",
        gridRow: "3 / 4"
      }
    }, "-", 2, null),
    props.format === "12h" ? /* @__PURE__ */ qwik._jsxQ("div", null, {
      style: {
        gridColumn: "10 / 11",
        gridRow: "1 / 4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "2px"
      }
    }, [
      /* @__PURE__ */ qwik._jsxQ("button", {
        onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [props2, state2] = qwik.useLexicalScope();
          return togglePeriod(props2, state2);
        }, "TimePicker_component_div_div_button_onClick_fkoud6A90yE", [
          props,
          state
        ])
      }, {
        class: "time-picker-period-button",
        style: qwik._fnSignal((p0) => ({
          color: p0.period === "AM" ? "var(--accent-color)" : "var(--button-color)"
        }), [
          state
        ], '{color:p0.period==="AM"?"var(--accent-color)":"var(--button-color)"}')
      }, "AM", 2, null),
      /* @__PURE__ */ qwik._jsxQ("button", {
        onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [props2, state2] = qwik.useLexicalScope();
          return togglePeriod(props2, state2);
        }, "TimePicker_component_div_div_button_onClick_1_XeSpx4L00R8", [
          props,
          state
        ])
      }, {
        class: "time-picker-period-button",
        style: qwik._fnSignal((p0) => ({
          color: p0.period === "PM" ? "var(--accent-color)" : "var(--button-color)"
        }), [
          state
        ], '{color:p0.period==="PM"?"var(--accent-color)":"var(--button-color)"}')
      }, "PM", 2, null)
    ], 1, "fg_0") : null
  ], 1, "fg_1");
}, "TimePicker_component_z1USFqM21dw"));
const STYLES = `
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
exports.TimePicker = TimePicker;
