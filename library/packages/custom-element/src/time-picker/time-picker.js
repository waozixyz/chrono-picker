export interface TimePickerProps {
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
}

/**
 * Usage:
 *
 *  <time-picker></time-picker>
 *
 */
class TimePicker extends HTMLElement {
  get _root() {
    return this.shadowRoot || this;
  }

  constructor() {
    super();
    const self = this;

    this.state = {
      hour: 0,
      minute: 0,
      period: "AM",
      cellWidth:
        self.props.size === "small"
          ? "10px"
          : self.props.size === "large"
          ? "16px"
          : "13px",
      cellHeight:
        self.props.size === "small"
          ? "24px"
          : self.props.size === "large"
          ? "38px"
          : "30px",
      smallCellHeight:
        self.props.size === "small"
          ? "12px"
          : self.props.size === "large"
          ? "19px"
          : "15px",
      fontSize:
        self.props.size === "small"
          ? "12px"
          : self.props.size === "large"
          ? "20px"
          : "16px",
      buttonFontSize:
        self.props.size === "small"
          ? "10px"
          : self.props.size === "large"
          ? "16px"
          : "13px",
      accentColor: self.props.accentColor || "#007bff",
      textColor: self.props.textColor || "#333333",
      backgroundColor: self.props.backgroundColor || "#ffffff",
      borderStyle: self.props.showBorder
        ? `1px solid ${self.props.accentColor || "#007bff"}`
        : "none",
      buttonColor: "#666666",
      buttonHoverColor: "#333333",
      updateTime() {
        let newHour = self.state.hour;
        if (self.props.format === "12h") {
          newHour =
            self.state.period === "PM" ? (newHour % 12) + 12 : newHour % 12;
          if (newHour === 0) newHour = 12;
        }
        const newDate = new Date(self.props.value || new Date());
        newDate.setHours(newHour);
        newDate.setMinutes(self.state.minute);
        self.props.onChange?.({
          target: {
            value: newDate,
          },
        });
      },
      setHour(value: string) {
        const hourInt = parseInt(value, 10);
        if (isNaN(hourInt)) return;
        const maxHour = self.props.format === "24h" ? 23 : 12;
        self.state.hour = Math.max(0, Math.min(hourInt, maxHour));
        self.update();
        self.state.updateTime();
      },
      setMinute(value: string) {
        const minuteInt = parseInt(value, 10);
        if (isNaN(minuteInt)) return;
        self.state.minute = Math.max(0, Math.min(minuteInt, 59));
        self.update();
        self.state.updateTime();
      },
      incrementHour() {
        self.state.hour =
          (self.state.hour + 1) % (self.props.format === "24h" ? 24 : 12);
        self.update();
        if (self.state.hour === 0 && self.props.format === "12h") {
          self.state.hour = 12;
          self.update();
          self.update();
        }
        self.state.updateTime();
      },
      decrementHour() {
        self.state.hour =
          (self.state.hour - 1 + (self.props.format === "24h" ? 24 : 12)) %
          (self.props.format === "24h" ? 24 : 12);
        self.update();
        if (self.state.hour === 0 && self.props.format === "12h") {
          self.state.hour = 12;
          self.update();
          self.update();
        }
        self.state.updateTime();
      },
      incrementMinute() {
        self.state.minute = (self.state.minute + 1) % 60;
        self.update();
        self.state.updateTime();
      },
      decrementMinute() {
        self.state.minute = (self.state.minute - 1 + 60) % 60;
        self.update();
        self.state.updateTime();
      },
      togglePeriod() {
        self.state.period = self.state.period === "AM" ? "PM" : "AM";
        self.update();
        self.state.updateTime();
      },
    };
    if (!this.props) {
      this.props = {};
    }

    this.componentProps = [
      "value",
      "format",
      "size",
      "accentColor",
      "textColor",
      "backgroundColor",
      "showBorder",
      "onChange",
    ];

    this.updateDeps = [[this.props.value]];

    // used to keep track of all nodes created by show/for
    this.nodesToDestroy = [];
    // batch updates
    this.pendingUpdate = false;

    // Event handler for 'click' event on button-time-picker-1
    this.onButtonTimePicker1Click = (event) => {
      this.state.incrementHour();
    };

    // Event handler for 'click' event on button-time-picker-2
    this.onButtonTimePicker2Click = (event) => {
      this.state.incrementMinute();
    };

    // Event handler for 'input' event on input-time-picker-1
    this.onInputTimePicker1Input = (event) => {
      this.state.setHour(event.target.value);
    };

    // Event handler for 'input' event on input-time-picker-2
    this.onInputTimePicker2Input = (event) => {
      this.state.setMinute(event.target.value);
    };

    // Event handler for 'click' event on button-time-picker-3
    this.onButtonTimePicker3Click = (event) => {
      this.state.decrementHour();
    };

    // Event handler for 'click' event on button-time-picker-4
    this.onButtonTimePicker4Click = (event) => {
      this.state.decrementMinute();
    };

    // Event handler for 'click' event on button-time-picker-5
    this.onButtonTimePicker5Click = (event) => {
      this.state.togglePeriod();
    };

    // Event handler for 'click' event on button-time-picker-6
    this.onButtonTimePicker6Click = (event) => {
      this.state.togglePeriod();
    };

    if (undefined) {
      this.attachShadow({ mode: "open" });
    }
  }

  destroyAnyNodes() {
    // destroy current view template refs before rendering again
    this.nodesToDestroy.forEach((el) => el.remove());
    this.nodesToDestroy = [];
  }

  connectedCallback() {
    this.getAttributeNames().forEach((attr) => {
      const jsVar = attr.replace(/-/g, "");
      const regexp = new RegExp(jsVar, "i");
      this.componentProps.forEach((prop) => {
        if (regexp.test(prop)) {
          const attrValue = this.getAttribute(attr);
          if (this.props[prop] !== attrValue) {
            this.props[prop] = attrValue;
          }
        }
      });
    });

    this._root.innerHTML = `
      <div class="time-picker" data-el="div-time-picker-1">
        <button class="time-picker-button" data-el="button-time-picker-1">+</button>
        <div data-el="div-time-picker-2"></div>
        <button class="time-picker-button" data-el="button-time-picker-2">+</button>
        <input
          type="text"
          class="time-picker-input"
          data-el="input-time-picker-1"
          data-dom-state="TimePicker-input-time-picker-1"
        />
        <div data-el="div-time-picker-3">:</div>
        <input
          type="text"
          class="time-picker-input"
          data-el="input-time-picker-2"
          data-dom-state="TimePicker-input-time-picker-2"
        />
        <button class="time-picker-button" data-el="button-time-picker-3">-</button>
        <div data-el="div-time-picker-4"></div>
        <button class="time-picker-button" data-el="button-time-picker-4">-</button>
        <template data-el="show-time-picker">
          <div data-el="div-time-picker-5">
            <button class="time-picker-period-button" data-el="button-time-picker-5">
              AM
            </button>
            <button class="time-picker-period-button" data-el="button-time-picker-6">
              PM
            </button>
          </div>
        </template>
      </div>
      <style>
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
      </style>`;
    this.pendingUpdate = true;

    this.render();
    this.onMount();
    this.pendingUpdate = false;
    this.update();
  }

  showContent(el) {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content
    // grabs the content of a node that is between <template> tags
    // iterates through child nodes to register all content including text elements
    // attaches the content after the template

    const elementFragment = el.content.cloneNode(true);
    const children = Array.from(elementFragment.childNodes);
    children.forEach((child) => {
      if (el?.scope) {
        child.scope = el.scope;
      }
      if (el?.context) {
        child.context = el.context;
      }
      this.nodesToDestroy.push(child);
    });
    el.after(elementFragment);
  }

  onMount() {
    // onMount
    const val = this.props.value || new Date();
    this.state.hour = val.getHours() % (this.props.format === "12h" ? 12 : 24);
    this.update();
    if (this.state.hour === 0 && this.props.format === "12h") {
      this.state.hour = 12;
      this.update();
      this.update();
    }
    this.state.minute = val.getMinutes();
    this.update();
    this.state.period = val.getHours() >= 12 ? "PM" : "AM";
    this.update();
  }

  onUpdate() {
    const self = this;

    (function (__prev, __next) {
      const __hasChange = __prev.find((val, index) => val !== __next[index]);
      if (__hasChange !== undefined) {
        const val = self.props.value || new Date();
        self.state.hour =
          val.getHours() % (self.props.format === "12h" ? 12 : 24);
        if (self.state.hour === 0 && self.props.format === "12h")
          self.state.hour = 12;
        self.state.minute = val.getMinutes();
        self.state.period = val.getHours() >= 12 ? "PM" : "AM";
        self.updateDeps[0] = __next;
      }
    })(self.updateDeps[0], [self.props.value]);
  }

  update() {
    if (this.pendingUpdate === true) {
      return;
    }
    this.pendingUpdate = true;
    this.render();
    this.onUpdate();
    this.pendingUpdate = false;
  }

  render() {
    // grab previous input state
    const preStateful = this.getStateful(this._root);
    const preValues = this.prepareHydrate(preStateful);

    // re-rendering needs to ensure that all nodes generated by for/show are refreshed
    this.destroyAnyNodes();
    this.updateBindings();

    // hydrate input state
    if (preValues.length) {
      const nextStateful = this.getStateful(this._root);
      this.hydrateDom(preValues, nextStateful);
    }
  }

  getStateful(el) {
    const stateful = el.querySelectorAll("[data-dom-state]");
    return stateful ? Array.from(stateful) : [];
  }
  prepareHydrate(stateful) {
    return stateful.map((el) => {
      return {
        id: el.dataset.domState,
        value: el.value,
        active: document.activeElement === el,
        selectionStart: el.selectionStart,
      };
    });
  }
  hydrateDom(preValues, stateful) {
    return stateful.map((el, index) => {
      const prev = preValues.find((prev) => el.dataset.domState === prev.id);
      if (prev) {
        el.value = prev.value;
        if (prev.active) {
          el.focus();
          el.selectionStart = prev.selectionStart;
        }
      }
    });
  }

  updateBindings() {
    this._root
      .querySelectorAll("[data-el='div-time-picker-1']")
      .forEach((el) => {
        Object.assign(el.style, {
          display: "inline-grid",
          gridTemplateColumns: `repeat(9, ${this.state.cellWidth})`,
          gridTemplateRows: `${this.state.smallCellHeight} ${this.state.cellHeight} ${this.state.smallCellHeight}`,
          gap: "1px",
          padding: "3px",
          borderRadius: "6px",
          backgroundColor: this.state.backgroundColor,
          color: this.state.textColor,
          border: this.state.borderStyle,
          fontFamily: "'Roboto', sans-serif",
          fontSize: this.state.fontSize,
          "--time-picker-button-color": this.state.buttonColor,
          "--time-picker-button-font-size": this.state.buttonFontSize,
          "--time-picker-button-hover-color": this.state.buttonHoverColor,
          "--time-picker-accent-color": this.state.accentColor,
        });
      });

    this._root
      .querySelectorAll("[data-el='button-time-picker-1']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonTimePicker1Click);
        el.addEventListener("click", this.onButtonTimePicker1Click);
        Object.assign(el.style, {
          gridColumn: "1 / 5",
          gridRow: "1 / 2",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-time-picker-2']")
      .forEach((el) => {
        Object.assign(el.style, {
          gridColumn: "5 / 6",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-time-picker-2']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonTimePicker2Click);
        el.addEventListener("click", this.onButtonTimePicker2Click);
        Object.assign(el.style, {
          gridColumn: "6 / 10",
          gridRow: "1 / 2",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-time-picker-1']")
      .forEach((el) => {
        el.value = this.state.hour.toString().padStart(2, "0");
        el.removeEventListener("input", this.onInputTimePicker1Input);
        el.addEventListener("input", this.onInputTimePicker1Input);
        Object.assign(el.style, {
          gridColumn: "1 / 5",
          gridRow: "2 / 3",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-time-picker-3']")
      .forEach((el) => {
        Object.assign(el.style, {
          gridColumn: "5 / 6",
          gridRow: "2 / 3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        });
      });

    this._root
      .querySelectorAll("[data-el='input-time-picker-2']")
      .forEach((el) => {
        el.value = this.state.minute.toString().padStart(2, "0");
        el.removeEventListener("input", this.onInputTimePicker2Input);
        el.addEventListener("input", this.onInputTimePicker2Input);
        Object.assign(el.style, {
          gridColumn: "6 / 10",
          gridRow: "2 / 3",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-time-picker-3']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonTimePicker3Click);
        el.addEventListener("click", this.onButtonTimePicker3Click);
        Object.assign(el.style, {
          gridColumn: "1 / 5",
          gridRow: "3 / 4",
        });
      });

    this._root
      .querySelectorAll("[data-el='div-time-picker-4']")
      .forEach((el) => {
        Object.assign(el.style, {
          gridColumn: "5 / 6",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-time-picker-4']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonTimePicker4Click);
        el.addEventListener("click", this.onButtonTimePicker4Click);
        Object.assign(el.style, {
          gridColumn: "6 / 10",
          gridRow: "3 / 4",
        });
      });

    this._root
      .querySelectorAll("[data-el='show-time-picker']")
      .forEach((el) => {
        const whenCondition = this.props.format === "12h";
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='div-time-picker-5']")
      .forEach((el) => {
        Object.assign(el.style, {
          gridColumn: "10 / 11",
          gridRow: "1 / 4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "2px",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-time-picker-5']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonTimePicker5Click);
        el.addEventListener("click", this.onButtonTimePicker5Click);
        Object.assign(el.style, {
          color:
            this.state.period === "AM"
              ? "var(--accent-color)"
              : "var(--button-color)",
        });
      });

    this._root
      .querySelectorAll("[data-el='button-time-picker-6']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonTimePicker6Click);
        el.addEventListener("click", this.onButtonTimePicker6Click);
        Object.assign(el.style, {
          color:
            this.state.period === "PM"
              ? "var(--accent-color)"
              : "var(--button-color)",
        });
      });
  }

  // Helper to render content
  renderTextNode(el, text) {
    const textNode = document.createTextNode(text);
    if (el?.scope) {
      textNode.scope = el.scope;
    }
    if (el?.context) {
      textNode.context = el.context;
    }
    el.after(textNode);
    this.nodesToDestroy.push(el.nextSibling);
  }
}

customElements.define("time-picker", TimePicker);
