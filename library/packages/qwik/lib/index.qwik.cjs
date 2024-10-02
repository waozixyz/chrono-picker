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
  qwik.useStylesScopedQrl(/* @__PURE__ */ qwik.inlinedQrl(STYLES$2, "AutoComplete_component_useStylesScoped_o3cUATH7B2E"));
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
const STYLES$2 = `
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
const addItem = function addItem2(props, state) {
  if (!state.newItemName)
    return;
  state.list = [
    ...state.list,
    state.newItemName
  ];
};
const deleteItem = function deleteItem2(props, state, idx) {
  state.list = state.list.filter((x, i) => i !== idx);
};
const TodoApp = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  qwik.useStylesScopedQrl(/* @__PURE__ */ qwik.inlinedQrl(STYLES$1, "TodoApp_component_useStylesScoped_D323uXhI4Xg"));
  const state = qwik.useStore({
    list: [
      "hello",
      "world"
    ],
    newItemName: ""
  });
  return /* @__PURE__ */ qwik._jsxQ("div", null, {
    class: "div-TodoApp"
  }, [
    /* @__PURE__ */ qwik._jsxQ("span", null, null, "TO-DO list:", 3, null),
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      class: "div-TodoApp-2"
    }, [
      /* @__PURE__ */ qwik._jsxQ("input", {
        onChange$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [state2] = qwik.useLexicalScope();
          return state2.newItemName = event.target.value;
        }, "TodoApp_component_div_div_input_onChange_EDoWKHshsJY", [
          state
        ])
      }, {
        class: "input-TodoApp",
        placeholder: "Add a new item",
        value: qwik._fnSignal((p0) => p0.newItemName, [
          state
        ], "p0.newItemName")
      }, null, 2, null),
      /* @__PURE__ */ qwik._jsxQ("button", {
        onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [props2, state2] = qwik.useLexicalScope();
          return addItem(props2, state2);
        }, "TodoApp_component_div_div_button_onClick_pMeCyrG2irg", [
          props,
          state
        ])
      }, {
        class: "button-TodoApp"
      }, "Add", 2, null)
    ], 1, null),
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      class: "div-TodoApp-3"
    }, /* @__PURE__ */ qwik._jsxQ("ul", null, {
      class: "ul-TodoApp"
    }, (state.list || []).map((item, idx) => {
      return /* @__PURE__ */ qwik._jsxQ("li", null, {
        class: "li-TodoApp"
      }, [
        /* @__PURE__ */ qwik._jsxQ("span", null, null, item, 1, null),
        /* @__PURE__ */ qwik._jsxQ("button", {
          onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
            const [idx2, props2, state2] = qwik.useLexicalScope();
            deleteItem(props2, state2, idx2);
          }, "TodoApp_component_div_div_ul_li_button_onClick_2YGNhDPIg0Y", [
            idx,
            props,
            state
          ])
        }, {
          class: "button-TodoApp-2"
        }, "Delete", 2, null)
      ], 1, idx);
    }), 1, null), 1, null)
  ], 1, "Tb_0");
}, "TodoApp_component_UPaRR0BKsJM"));
const STYLES$1 = `
.div-TodoApp {
  padding: 10px;
  max-width: 700px;
}
.div-TodoApp-2 {
  display: flex;
  width: 100%;
  gap: 16px;
  align-items: stretch;
}
.input-TodoApp {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  flex-grow: 1;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.button-TodoApp {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  font-weight: 700;
  color: #ffffff;
  background-color: #3b82f6;
  cursor: pointer;
}
.div-TodoApp-3 {
  margin-top: 1rem;
}
.ul-TodoApp {
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: unset;
  padding: unset;
}
.li-TodoApp {
  display: flex;
  padding: 0.625rem;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #e5e7eb;
  gap: 16px;
}
.button-TodoApp-2 {
  cursor: pointer;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
  color: #ffffff;
  background-color: #ef4444;
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
  if (props.format === "12h")
    newHour = state.period === "PM" ? newHour % 12 + 12 : newHour % 12;
  const newDate = new Date(props.value || /* @__PURE__ */ new Date());
  newDate.setHours(newHour);
  newDate.setMinutes(state.minute);
  props.onChange?.(newDate);
};
const animateValue = function animateValue2(props, state, element, oldValue, newValue, direction) {
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
};
const handleHourChange = function handleHourChange2(props, state, event) {
  const input = event.target;
  let newHour = parseInt(input.value, 10);
  if (isNaN(newHour))
    return;
  if (props.format === "12h") {
    newHour = newHour % 12;
    if (newHour === 0)
      newHour = 12;
  } else
    newHour = newHour % 24;
  const oldValue = state.hour.toString().padStart(2, "0");
  const newValue = newHour.toString().padStart(2, "0");
  animateValue(props, state, input, oldValue, newValue, newHour > state.hour ? "up" : "down");
  state.hour = newHour;
  updateTime(props, state);
};
const handleMinuteChange = function handleMinuteChange2(props, state, event) {
  const input = event.target;
  let newMinute = parseInt(input.value, 10);
  if (isNaN(newMinute))
    return;
  newMinute = newMinute % 60;
  const oldValue = state.minute.toString().padStart(2, "0");
  const newValue = newMinute.toString().padStart(2, "0");
  animateValue(props, state, input, oldValue, newValue, newMinute > state.minute ? "up" : "down");
  state.minute = newMinute;
  updateTime(props, state);
};
const incrementHour = function incrementHour2(props, state) {
  const input = document.querySelector(`#${state.id} .time-unit.hour input`);
  if (!input)
    return;
  const oldValue = state.hour.toString().padStart(2, "0");
  state.hour = (state.hour + 1) % (props.format === "24h" ? 24 : 12);
  if (state.hour === 0 && props.format === "12h")
    state.hour = 12;
  const newValue = state.hour.toString().padStart(2, "0");
  animateValue(props, state, input, oldValue, newValue, "up");
  updateTime(props, state);
};
const decrementHour = function decrementHour2(props, state) {
  const input = document.querySelector(`#${state.id} .time-unit.hour input`);
  if (!input)
    return;
  const oldValue = state.hour.toString().padStart(2, "0");
  state.hour = (state.hour - 1 + (props.format === "24h" ? 24 : 12)) % (props.format === "24h" ? 24 : 12);
  if (state.hour === 0 && props.format === "12h")
    state.hour = 12;
  const newValue = state.hour.toString().padStart(2, "0");
  animateValue(props, state, input, oldValue, newValue, "down");
  updateTime(props, state);
};
const incrementMinute = function incrementMinute2(props, state) {
  const input = document.querySelector(`#${state.id} .time-unit.minute input`);
  if (!input)
    return;
  const oldValue = state.minute.toString().padStart(2, "0");
  state.minute = (state.minute + 1) % 60;
  const newValue = state.minute.toString().padStart(2, "0");
  animateValue(props, state, input, oldValue, newValue, "up");
  updateTime(props, state);
};
const decrementMinute = function decrementMinute2(props, state) {
  const input = document.querySelector(`#${state.id} .time-unit.minute input`);
  if (!input)
    return;
  const oldValue = state.minute.toString().padStart(2, "0");
  state.minute = (state.minute - 1 + 60) % 60;
  const newValue = state.minute.toString().padStart(2, "0");
  animateValue(props, state, input, oldValue, newValue, "down");
  updateTime(props, state);
};
const togglePeriod = function togglePeriod2(props, state) {
  state.period = state.period === "AM" ? "PM" : "AM";
  updateTime(props, state);
};
const TimePicker = /* @__PURE__ */ qwik.componentQrl(/* @__PURE__ */ qwik.inlinedQrl((props) => {
  qwik.useStylesScopedQrl(/* @__PURE__ */ qwik.inlinedQrl(STYLES, "TimePicker_component_useStylesScoped_tAVqQNaeX0E"));
  const state = qwik.useStore({
    hour: 0,
    id: Math.random().toString(36).substr(2, 9),
    minute: 0,
    period: "AM"
  });
  qwik.useVisibleTaskQrl(/* @__PURE__ */ qwik.inlinedQrl(() => {
    const [props2, state2] = qwik.useLexicalScope();
    const val = props2.value || /* @__PURE__ */ new Date();
    state2.hour = val.getHours();
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
    state2.hour = val.getHours();
    state2.minute = val.getMinutes();
    state2.period = val.getHours() >= 12 ? "PM" : "AM";
  }, "TimePicker_component_useTask_0FdrkOrkgYE", [
    props,
    state
  ]));
  return /* @__PURE__ */ qwik._jsxQ("div", null, {
    class: qwik._fnSignal((p0) => `time-picker ${p0.theme || "light"} ${p0.size || "medium"}`, [
      props
    ], '`time-picker ${p0.theme||"light"} ${p0.size||"medium"}`'),
    id: qwik._fnSignal((p0) => p0.id, [
      state
    ], "p0.id"),
    style: qwik._fnSignal((p0) => p0.customTheme, [
      props
    ], "p0.customTheme")
  }, /* @__PURE__ */ qwik._jsxQ("div", null, {
    class: "time-display"
  }, [
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      class: "time-unit hour"
    }, [
      /* @__PURE__ */ qwik._jsxQ("button", {
        onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [props2, state2] = qwik.useLexicalScope();
          return incrementHour(props2, state2);
        }, "TimePicker_component_div_div_div_button_onClick_P8iQgU7ofUc", [
          props,
          state
        ])
      }, {
        class: "arrow up"
      }, /* @__PURE__ */ qwik._jsxQ("svg", null, {
        viewBox: "0 0 24 24"
      }, /* @__PURE__ */ qwik._jsxQ("path", null, {
        d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
      }, null, 3, null), 3, null), 2, null),
      /* @__PURE__ */ qwik._jsxQ("div", null, {
        class: "number-wrapper"
      }, /* @__PURE__ */ qwik._jsxQ("input", {
        onChange$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [props2, state2] = qwik.useLexicalScope();
          return handleHourChange(props2, state2, event);
        }, "TimePicker_component_div_div_div_div_input_onChange_h0TP4uV096A", [
          props,
          state
        ])
      }, {
        type: "text",
        value: qwik._fnSignal((p0) => p0.hour.toString().padStart(2, "0"), [
          state
        ], 'p0.hour.toString().padStart(2,"0")')
      }, null, 2, null), 1, null),
      /* @__PURE__ */ qwik._jsxQ("button", {
        onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [props2, state2] = qwik.useLexicalScope();
          return decrementHour(props2, state2);
        }, "TimePicker_component_div_div_div_button_onClick_1_9zgM1sRrGy4", [
          props,
          state
        ])
      }, {
        class: "arrow down"
      }, /* @__PURE__ */ qwik._jsxQ("svg", null, {
        viewBox: "0 0 24 24"
      }, /* @__PURE__ */ qwik._jsxQ("path", null, {
        d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
      }, null, 3, null), 3, null), 2, null)
    ], 1, null),
    /* @__PURE__ */ qwik._jsxQ("span", null, {
      class: "separator"
    }, ":", 3, null),
    /* @__PURE__ */ qwik._jsxQ("div", null, {
      class: "time-unit minute"
    }, [
      /* @__PURE__ */ qwik._jsxQ("button", {
        onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [props2, state2] = qwik.useLexicalScope();
          return incrementMinute(props2, state2);
        }, "TimePicker_component_div_div_div_button_onClick_2_sLYpq0L3hAc", [
          props,
          state
        ])
      }, {
        class: "arrow up"
      }, /* @__PURE__ */ qwik._jsxQ("svg", null, {
        viewBox: "0 0 24 24"
      }, /* @__PURE__ */ qwik._jsxQ("path", null, {
        d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
      }, null, 3, null), 3, null), 2, null),
      /* @__PURE__ */ qwik._jsxQ("div", null, {
        class: "number-wrapper"
      }, /* @__PURE__ */ qwik._jsxQ("input", {
        onChange$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [props2, state2] = qwik.useLexicalScope();
          return handleMinuteChange(props2, state2, event);
        }, "TimePicker_component_div_div_div_div_input_onChange_1_aq1Oh0BXGaY", [
          props,
          state
        ])
      }, {
        type: "text",
        value: qwik._fnSignal((p0) => p0.minute.toString().padStart(2, "0"), [
          state
        ], 'p0.minute.toString().padStart(2,"0")')
      }, null, 2, null), 1, null),
      /* @__PURE__ */ qwik._jsxQ("button", {
        onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
          const [props2, state2] = qwik.useLexicalScope();
          return decrementMinute(props2, state2);
        }, "TimePicker_component_div_div_div_button_onClick_3_DQtAcLvL0KU", [
          props,
          state
        ])
      }, {
        class: "arrow down"
      }, /* @__PURE__ */ qwik._jsxQ("svg", null, {
        viewBox: "0 0 24 24"
      }, /* @__PURE__ */ qwik._jsxQ("path", null, {
        d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
      }, null, 3, null), 3, null), 2, null)
    ], 1, null),
    props.format === "12h" ? /* @__PURE__ */ qwik._jsxQ("div", null, {
      class: "time-unit period"
    }, /* @__PURE__ */ qwik._jsxQ("button", {
      onClick$: /* @__PURE__ */ qwik.inlinedQrl((event) => {
        const [props2, state2] = qwik.useLexicalScope();
        return togglePeriod(props2, state2);
      }, "TimePicker_component_div_div_div_button_onClick_4_flo2BQhuXw0", [
        props,
        state
      ])
    }, null, qwik._fnSignal((p0) => p0.period, [
      state
    ], "p0.period"), 2, null), 1, "fg_0") : null
  ], 1, null), 1, "fg_1");
}, "TimePicker_component_z1USFqM21dw"));
const STYLES = `
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
`;
exports.AutoComplete = AutoComplete;
exports.Greet = Greet;
exports.TimePicker = TimePicker;
exports.Todos = TodoApp;
