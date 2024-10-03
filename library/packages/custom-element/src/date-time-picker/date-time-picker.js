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

import TimePicker from "../time-picker/time-picker";
import Calendar from "../calendar/calendar";

/**
 * Usage:
 *
 *  <date-time-picker></date-time-picker>
 *
 */
class DateTimePicker extends HTMLElement {
  get _root() {
    return this.shadowRoot || this;
  }

  constructor() {
    super();
    const self = this;

    this.state = {
      selectedDateTime: self.props.value || new Date(),
      isCalendarOpen: false,
      backgroundColor: self.props.backgroundColor || "#ffffff",
      textColor: self.props.textColor || "#333333",
      accentColor: self.props.accentColor || "#007bff",
      fontSize:
        self.props.size === "small"
          ? "12px"
          : self.props.size === "large"
          ? "18px"
          : "14px",
      borderStyle: self.props.showBorder
        ? `1px solid ${self.props.accentColor || "#007bff"}`
        : "none",
      updateDateTime() {
        self.props.onChange?.({
          target: {
            value: self.state.selectedDateTime,
          },
        });
      },
      setDate(event: {
        target: {
          value: Date;
        };
      }) {
        self.state.selectedDateTime = new Date(
          event.target.value.getFullYear(),
          event.target.value.getMonth(),
          event.target.value.getDate(),
          self.state.selectedDateTime.getHours(),
          self.state.selectedDateTime.getMinutes()
        );
        self.update();
        self.state.updateDateTime();
      },
      setTime(event: {
        target: {
          value: Date;
        };
      }) {
        self.state.selectedDateTime = new Date(
          self.state.selectedDateTime.getFullYear(),
          self.state.selectedDateTime.getMonth(),
          self.state.selectedDateTime.getDate(),
          event.target.value.getHours(),
          event.target.value.getMinutes()
        );
        self.update();
        self.state.updateDateTime();
      },
      toggleCalendar() {
        self.state.isCalendarOpen = !self.state.isCalendarOpen;
        self.update();
      },
      formatDate() {
        return self.state.selectedDateTime.toLocaleDateString();
      },
    };
    if (!this.props) {
      this.props = {};
    }

    this.componentProps = [
      "value",
      "backgroundColor",
      "textColor",
      "accentColor",
      "size",
      "showBorder",
      "onChange",
      "minDate",
      "maxDate",
      "format",
    ];

    // used to keep track of all nodes created by show/for
    this.nodesToDestroy = [];
    // batch updates
    this.pendingUpdate = false;

    // Event handler for 'click' event on button-date-time-picker-1
    this.onButtonDateTimePicker1Click = (event) => {
      this.state.toggleCalendar();
    };

    // Event handler for 'change' event on calendar-date-time-picker
    this.onCalendarDateTimePickerChange = (event) => {
      this.state.setDate(event);
    };

    // Event handler for 'change' event on time-picker-date-time-picker
    this.onTimePickerDateTimePickerChange = (event) => {
      this.state.setTime(event);
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
      <div class="date-time-picker" data-el="div-date-time-picker-1">
        <div class="date-display">
          <span>
            <template data-el="div-date-time-picker-2">
              <!-- state.formatDate() -->
            </template>
          </span>
          <button class="toggle-button" data-el="button-date-time-picker-1">
            <template data-el="show-date-time-picker">▲</template>
          </button>
        </div>
        <template data-el="show-date-time-picker-2">
          <calendar data-el="calendar-date-time-picker"></calendar>
        </template>
        <time-picker data-el="time-picker-date-time-picker"></time-picker>
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

  onMount() {}

  onUpdate() {}

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
    // re-rendering needs to ensure that all nodes generated by for/show are refreshed
    this.destroyAnyNodes();
    this.updateBindings();
  }

  updateBindings() {
    this._root
      .querySelectorAll("[data-el='div-date-time-picker-1']")
      .forEach((el) => {
        Object.assign(el.style, {
          "--date-time-picker-background-color": this.state.backgroundColor,
          "--date-time-picker-text-color": this.state.textColor,
          "--date-time-picker-accent-color": this.state.accentColor,
          "--date-time-picker-font-size": this.state.fontSize,
          "--date-time-picker-border": this.state.borderStyle,
        });
      });

    this._root
      .querySelectorAll("[data-el='div-date-time-picker-2']")
      .forEach((el) => {
        this.renderTextNode(el, this.state.formatDate());
      });

    this._root
      .querySelectorAll("[data-el='button-date-time-picker-1']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonDateTimePicker1Click);
        el.addEventListener("click", this.onButtonDateTimePicker1Click);
      });

    this._root
      .querySelectorAll("[data-el='show-date-time-picker']")
      .forEach((el) => {
        const whenCondition = this.state.isCalendarOpen;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='show-date-time-picker-2']")
      .forEach((el) => {
        const whenCondition = this.state.isCalendarOpen;
        if (whenCondition) {
          this.showContent(el);
        }
      });

    this._root
      .querySelectorAll("[data-el='calendar-date-time-picker']")
      .forEach((el) => {
        el.value = this.state.selectedDateTime;
        if (el.props) {
          el.props.value = this.state.selectedDateTime;
          if (el.update) {
            el.update();
          }
        } else {
          el.props = {};
          el.props.value = this.state.selectedDateTime;
        }
        el.removeEventListener("change", this.onCalendarDateTimePickerChange);
        el.addEventListener("change", this.onCalendarDateTimePickerChange);
        el.setAttribute("minDate", this.props.minDate);
        el.minDate = this.props.minDate;
        if (el.props) {
          el.props.minDate = this.props.minDate;
          if (el.update) {
            el.update();
          }
        } else {
          el.props = {};
          el.props.minDate = this.props.minDate;
        }
        el.setAttribute("maxDate", this.props.maxDate);
        el.maxDate = this.props.maxDate;
        if (el.props) {
          el.props.maxDate = this.props.maxDate;
          if (el.update) {
            el.update();
          }
        } else {
          el.props = {};
          el.props.maxDate = this.props.maxDate;
        }
        el.setAttribute("accentColor", this.state.accentColor);
        el.accentColor = this.state.accentColor;
        if (el.props) {
          el.props.accentColor = this.state.accentColor;
          if (el.update) {
            el.update();
          }
        } else {
          el.props = {};
          el.props.accentColor = this.state.accentColor;
        }
        el.setAttribute("fontSize", this.state.fontSize);
        el.fontSize = this.state.fontSize;
        if (el.props) {
          el.props.fontSize = this.state.fontSize;
          if (el.update) {
            el.update();
          }
        } else {
          el.props = {};
          el.props.fontSize = this.state.fontSize;
        }
        el.setAttribute("backgroundColor", this.state.backgroundColor);
        el.backgroundColor = this.state.backgroundColor;
        if (el.props) {
          el.props.backgroundColor = this.state.backgroundColor;
          if (el.update) {
            el.update();
          }
        } else {
          el.props = {};
          el.props.backgroundColor = this.state.backgroundColor;
        }
        el.setAttribute("textColor", this.state.textColor);
        el.textColor = this.state.textColor;
        if (el.props) {
          el.props.textColor = this.state.textColor;
          if (el.update) {
            el.update();
          }
        } else {
          el.props = {};
          el.props.textColor = this.state.textColor;
        }
      });

    this._root
      .querySelectorAll("[data-el='time-picker-date-time-picker']")
      .forEach((el) => {
        el.value = this.state.selectedDateTime;
        if (el.props) {
          el.props.value = this.state.selectedDateTime;
          if (el.update) {
            el.update();
          }
        } else {
          el.props = {};
          el.props.value = this.state.selectedDateTime;
        }
        el.removeEventListener("change", this.onTimePickerDateTimePickerChange);
        el.addEventListener("change", this.onTimePickerDateTimePickerChange);
        el.setAttribute("format", this.props.format);
        el.format = this.props.format;
        if (el.props) {
          el.props.format = this.props.format;
          if (el.update) {
            el.update();
          }
        } else {
          el.props = {};
          el.props.format = this.props.format;
        }
        el.setAttribute("size", this.props.size);
        el.size = this.props.size;
        if (el.props) {
          el.props.size = this.props.size;
          if (el.update) {
            el.update();
          }
        } else {
          el.props = {};
          el.props.size = this.props.size;
        }
        el.setAttribute("backgroundColor", this.state.backgroundColor);
        el.backgroundColor = this.state.backgroundColor;
        if (el.props) {
          el.props.backgroundColor = this.state.backgroundColor;
          if (el.update) {
            el.update();
          }
        } else {
          el.props = {};
          el.props.backgroundColor = this.state.backgroundColor;
        }
        el.setAttribute("textColor", this.state.textColor);
        el.textColor = this.state.textColor;
        if (el.props) {
          el.props.textColor = this.state.textColor;
          if (el.update) {
            el.update();
          }
        } else {
          el.props = {};
          el.props.textColor = this.state.textColor;
        }
        el.setAttribute("accentColor", this.state.accentColor);
        el.accentColor = this.state.accentColor;
        if (el.props) {
          el.props.accentColor = this.state.accentColor;
          if (el.update) {
            el.update();
          }
        } else {
          el.props = {};
          el.props.accentColor = this.state.accentColor;
        }
        el.setAttribute("showBorder", false);
        el.showBorder = false;
        if (el.props) {
          el.props.showBorder = false;
          if (el.update) {
            el.update();
          }
        } else {
          el.props = {};
          el.props.showBorder = false;
        }
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

customElements.define("date-time-picker", DateTimePicker);
