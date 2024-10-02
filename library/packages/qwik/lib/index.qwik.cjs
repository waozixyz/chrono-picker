"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const qwik = require("@builder.io/qwik");
const setInputValue = function setInputValue2(props, state, value) {
  state.inputVal = value;
};
const handleClick = function handleClick2(props, state, item) {
  setInputValue(props, state, transform(props, state, item));
  state.showSuggestions = false;
};
const fetchVals = function fetchVals2(props, state, city) {
  if (props.getValues)
    return props.getValues(city);
  return fetch(`http://universities.hipolabs.com/search?name=${city}&country=united+states`).then((x) => x.json());
};
const transform = function transform2(props, state, x) {
  return props.transformData ? props.transformData(x) : x.name;
};
const AutoComplete = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  qwik.useStylesScopedQrl(/* @__PURE__ */ qwik.inlinedQrl(STYLES, "AutoComplete_component_useStylesScoped_o3cUATH7B2E"));
  const state = qwik.useStore({
    inputVal: "",
    showSuggestions: false,
    suggestions: []
  });
  qwik.useTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(({ track }) => {
    const [props2, state2] = qwik.useLexicalScope();
    track(() => state2.inputVal);
    track(() => props2.getValues);
    fetchVals(props2, state2, state2.inputVal).then((newVals) => {
      if (!newVals?.filter) {
        console.error("Invalid response from getValues:", newVals);
        return;
      }
      state2.suggestions = newVals.filter((data) => transform(props2, state2, data).toLowerCase().includes(state2.inputVal.toLowerCase()));
    });
  }, "AutoComplete_component_useTask_l7YiPqvcpV8", [
    props,
    state
  ]));
  return /* @__PURE__ */ qwik._jsxQ("div", null, {
    class: "div-AutoComplete"
  }, [
    "Autocomplete:",
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      class: "div-AutoComplete-2"
    }, [
      /* @__PURE__ */ qwik._jsxQ("input", {
        onChange$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [state2] = qwik.useLexicalScope();
          return state2.inputVal = event.target.value;
        }, "AutoComplete_component_div_div_input_onChange_6mXcLXfuvEY", [
          state
        ]),
        onFocus$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [state2] = qwik.useLexicalScope();
          return state2.showSuggestions = true;
        }, "AutoComplete_component_div_div_input_onFocus_hiv3EZxZ30k", [
          state
        ])
      }, {
        class: "input-AutoComplete",
        placeholder: "Search for a U.S. university",
        value: qwik._fnSignal((p0) => p0.inputVal, [
          state
        ], "p0.inputVal")
      }, null, 2, null),
      /* @__PURE__ */ qwik._jsxQ("button", {
        onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [state2] = qwik.useLexicalScope();
          state2.inputVal = "";
          state2.showSuggestions = false;
        }, "AutoComplete_component_div_div_button_onClick_6cLGIshtFQo", [
          state
        ])
      }, {
        class: "button-AutoComplete"
      }, "X", 2, null)
    ], 1, null),
    state.suggestions.length > 0 && state.showSuggestions ? /* @__PURE__ */ qwik._jsxQ("ul", null, {
      class: "ul-AutoComplete"
    }, (state.suggestions || []).map((item, idx) => {
      return /* @__PURE__ */ qwik._jsxQ("li", {
        onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [item2, props2, state2] = qwik.useLexicalScope();
          return handleClick(props2, state2, item2);
        }, "AutoComplete_component_div_ul_li_onClick_aX7z0Lyjr9E", [
          item,
          props,
          state
        ])
      }, {
        class: "li-AutoComplete"
      }, props.renderChild ? /* @__PURE__ */ qwik._jsxC(props.renderChild, {
        item
      }, 3, "tU_0") : /* @__PURE__ */ qwik._jsxQ("span", null, null, transform(props, state, item), 1, null), 0, idx);
    }), 1, "tU_1") : null
  ], 1, "tU_2");
}, "AutoComplete_component_2b0Y8LQOXVI"));
const STYLES = `
.div-AutoComplete {
  padding: 10px;
  max-width: 700px;
}
.div-AutoComplete-2 {
  position: relative;
  display: flex;
  gap: 16px;
  align-items: stretch;
}
.input-AutoComplete {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  border-width: 1px;
  border-color: #000000;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.button-AutoComplete {
  cursor: pointer;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  color: #ffffff;
  background-color: #ef4444;
}
.ul-AutoComplete {
  border-radius: 0.25rem;
  height: 10rem;
  margin: unset;
  padding: unset;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.li-AutoComplete {
  display: flex;
  padding: 0.5rem;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #e5e7eb;
  cursor: pointer;
}
.li-AutoComplete:hover {
  background-color: #f3f4f6;
}
`;
const Greet = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  const state = qwik.useStore({
    name: ""
  });
  return /* @__PURE__ */ qwik._jsxQ("div", null, null, [
    /* @__PURE__ */ qwik._jsxQ("input", {
      onChange$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
        const [state2] = qwik.useLexicalScope();
        return state2.name = event.target.value;
      }, "Greet_component_div_input_onChange_UXiqnZXQV34", [
        state
      ])
    }, {
      placeholder: "Your name",
      value: qwik._fnSignal((p0) => p0.name, [
        state
      ], "p0.name")
    }, null, 2, null),
    /* @__PURE__ */ qwik._jsxQ("div", null, null, [
      "Hello, ",
      qwik._fnSignal((p0) => p0.name, [
        state
      ], "p0.name"),
      "!"
    ], 3, null)
  ], 1, "Zt_0");
}, "Greet_component_NoxKRhmUmS8"));
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
  const state = qwik.useStore({
    hour: 0,
    minute: 0,
    period: "AM"
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
      gridTemplateColumns: `repeat(5, ${props.size === "small" ? "30px" : props.size === "large" ? "50px" : "40px"})`,
      gridTemplateRows: `${props.size === "small" ? "15px" : props.size === "large" ? "25px" : "20px"} ${props.size === "small" ? "30px" : props.size === "large" ? "50px" : "40px"} ${props.size === "small" ? "15px" : props.size === "large" ? "25px" : "20px"}`,
      gap: "2px",
      padding: "10px",
      borderRadius: "8px",
      backgroundColor: props.backgroundColor || "#ffffff",
      color: props.textColor || "#333333",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Roboto', sans-serif",
      fontSize: `${props.size === "small" ? "15px" : props.size === "large" ? "25px" : "20px"}`
    }
  }, {
    class: qwik._fnSignal((p0) => `time-picker ${p0.size || "medium"}`, [
      props
    ], '`time-picker ${p0.size||"medium"}`')
  }, [
    /* @__PURE__ */ qwik._jsxQ("button", {
      onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
        const [props2, state2] = qwik.useLexicalScope();
        return incrementHour(props2, state2);
      }, "TimePicker_component_div_button_onClick_Eytk0fGoBvQ", [
        props,
        state
      ]),
      style: {
        gridColumn: "1 / 3",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: props.accentColor || "#007bff",
        fontSize: `${props.size === "small" ? "10px" : props.size === "large" ? "16px" : "13px"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s"
      }
    }, null, "▲", 2, null),
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      style: {
        gridColumn: "3 / 4"
      }
    }, null, 3, null),
    /* @__PURE__ */ qwik._jsxQ("button", {
      onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
        const [props2, state2] = qwik.useLexicalScope();
        return incrementMinute(props2, state2);
      }, "TimePicker_component_div_button_onClick_1_WLLbkFC79Tw", [
        props,
        state
      ]),
      style: {
        gridColumn: "4 / 6",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: props.accentColor || "#007bff",
        fontSize: `${props.size === "small" ? "10px" : props.size === "large" ? "16px" : "13px"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s"
      }
    }, null, "▲", 2, null),
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      style: {
        gridColumn: "1 / 3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold"
      }
    }, state.hour.toString().padStart(2, "0"), 1, null),
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      style: {
        gridColumn: "3 / 4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
    }, ":", 3, null),
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      style: {
        gridColumn: "4 / 6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold"
      }
    }, state.minute.toString().padStart(2, "0"), 1, null),
    /* @__PURE__ */ qwik._jsxQ("button", {
      onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
        const [props2, state2] = qwik.useLexicalScope();
        return decrementHour(props2, state2);
      }, "TimePicker_component_div_button_onClick_2_QK0Ps0wke9A", [
        props,
        state
      ]),
      style: {
        gridColumn: "1 / 3",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: props.accentColor || "#007bff",
        fontSize: `${props.size === "small" ? "10px" : props.size === "large" ? "16px" : "13px"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s"
      }
    }, null, "▼", 2, null),
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      style: {
        gridColumn: "3 / 4"
      }
    }, null, 3, null),
    /* @__PURE__ */ qwik._jsxQ("button", {
      onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
        const [props2, state2] = qwik.useLexicalScope();
        return decrementMinute(props2, state2);
      }, "TimePicker_component_div_button_onClick_3_aiCod7OSrYQ", [
        props,
        state
      ]),
      style: {
        gridColumn: "4 / 6",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: props.accentColor || "#007bff",
        fontSize: `${props.size === "small" ? "10px" : props.size === "large" ? "16px" : "13px"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s"
      }
    }, null, "▼", 2, null),
    props.format === "12h" ? /* @__PURE__ */ qwik._jsxQ("div", null, {
      style: {
        gridColumn: "6 / 7",
        gridRow: "1 / 4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "10px"
      }
    }, [
      /* @__PURE__ */ qwik._jsxQ("button", {
        onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [props2, state2] = qwik.useLexicalScope();
          return togglePeriod(props2, state2);
        }, "TimePicker_component_div_div_button_onClick_fkoud6A90yE", [
          props,
          state
        ]),
        style: {
          background: "none",
          border: "none",
          color: state.period === "AM" ? props.accentColor || "#007bff" : "inherit",
          cursor: "pointer",
          padding: "5px",
          fontSize: `${props.size === "small" ? "10px" : props.size === "large" ? "16px" : "13px"}`,
          fontWeight: "bold"
        }
      }, null, "AM", 2, null),
      /* @__PURE__ */ qwik._jsxQ("button", {
        onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [props2, state2] = qwik.useLexicalScope();
          return togglePeriod(props2, state2);
        }, "TimePicker_component_div_div_button_onClick_1_XeSpx4L00R8", [
          props,
          state
        ]),
        style: {
          background: "none",
          border: "none",
          color: state.period === "PM" ? props.accentColor || "#007bff" : "inherit",
          cursor: "pointer",
          padding: "5px",
          fontSize: `${props.size === "small" ? "10px" : props.size === "large" ? "16px" : "13px"}`,
          fontWeight: "bold"
        }
      }, null, "PM", 2, null)
    ], 1, "fg_0") : null
  ], 1, "fg_1");
}, "TimePicker_component_z1USFqM21dw"));
exports.AutoComplete = AutoComplete;
exports.Greet = Greet;
exports.TimePicker = TimePicker;
