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

import { DateTime, Info } from "luxon";

/**
 * Usage:
 *
 *  <calendar></calendar>
 *
 */
class Calendar extends HTMLElement {
  get _root() {
    return this.shadowRoot || this;
  }

  constructor() {
    super();
    const self = this;

    this.state = {
      currentMonth: DateTime.local().startOf("month"),
      selectedDate: DateTime.local(),
      minDate: self.props.minDate
        ? DateTime.fromJSDate(self.props.minDate)
        : DateTime.local().minus({
            years: 100,
          }),
      maxDate: self.props.maxDate
        ? DateTime.fromJSDate(self.props.maxDate)
        : DateTime.local().plus({
            years: 100,
          }),
      backgroundColor: self.props.backgroundColor || "#ffffff",
      textColor: self.props.textColor || "#333333",
      accentColor: self.props.accentColor || "#007bff",
      fontSize: self.props.fontSize || "14px",
      locale: self.props.locale || "en",
      changeMonth(delta: number) {
        self.state.currentMonth = self.state.currentMonth
          .plus({
            months: delta,
          })
          .startOf("month") as DateTime<true>;
        self.update();
      },
      selectDate(day: number) {
        const newDate = self.state.currentMonth.set({
          day,
        }) as DateTime<true>;
        if (self.state.isDateInRange(newDate)) {
          self.state.selectedDate = newDate;
          self.update();
          self.props.onChange?.({
            target: {
              value: newDate.toJSDate(),
            },
          });
        }
      },
      getEmptyCells() {
        return Array(self.state.currentMonth.weekday % 7).fill(null);
      },
      getDayCells() {
        return Array(self.state.currentMonth.daysInMonth).fill(null);
      },
      isSelected(day: number) {
        return self.state.selectedDate.hasSame(
          self.state.currentMonth.set({
            day,
          }) as DateTime<true>,
          "day"
        );
      },
      isDateInRange(date: DateTime<true>) {
        return date >= self.state.minDate && date <= self.state.maxDate;
      },
      isDisabled(day: number) {
        return !self.state.isDateInRange(
          self.state.currentMonth.set({
            day,
          }) as DateTime<true>
        );
      },
      getWeekdays() {
        return Info.weekdays("short", {
          locale: self.state.locale,
        });
      },
      formatMonth() {
        return self.state.currentMonth.toLocaleString({
          month: "long",
          year: "numeric",
        });
      },
    };
    if (!this.props) {
      this.props = {};
    }

    this.componentProps = [
      "value",
      "minDate",
      "maxDate",
      "backgroundColor",
      "textColor",
      "accentColor",
      "fontSize",
      "locale",
      "onChange",
    ];

    this.updateDeps = [[this.props.value]];

    // used to keep track of all nodes created by show/for
    this.nodesToDestroy = [];
    // batch updates
    this.pendingUpdate = false;

    // Event handler for 'click' event on button-calendar-1
    this.onButtonCalendar1Click = (event) => {
      this.state.changeMonth(-1);
    };

    // Event handler for 'click' event on button-calendar-2
    this.onButtonCalendar2Click = (event) => {
      this.state.changeMonth(1);
    };

    // Event handler for 'click' event on div-calendar-5
    this.onDivCalendar5Click = (event) => {
      const i = this.getScope(event.currentTarget, "i");
      this.state.selectDate(i + 1);
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
      <div class="calendar" data-el="div-calendar-1">
        <div class="calendar-header">
          <button class="calendar-button" data-el="button-calendar-1">&lt;</button>
          <span>
            <template data-el="div-calendar-2"><!-- state.formatMonth() --></template>
          </span>
          <button class="calendar-button" data-el="button-calendar-2">&gt;</button>
        </div>
        <div class="calendar-grid">
          <template data-el="for-calendar">
            <div class="calendar-weekday">
              <template data-el="div-calendar-3"><!-- day --></template>
            </div>
          </template>
      
          <template data-el="for-calendar-2">
            <div data-el="div-calendar-4"></div>
          </template>
      
          <template data-el="for-calendar-3">
            <div data-el="div-calendar-5">
              <template data-el="div-calendar-6"><!-- i + 1 --></template>
            </div>
          </template>
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
      </style>`;
    this.pendingUpdate = true;

    this.render();
    this.onMount();
    this.pendingUpdate = false;
    this.update();
  }

  onMount() {
    // onMount
    this.state.currentMonth = (
      this.props.value
        ? DateTime.fromJSDate(this.props.value)
        : DateTime.local()
    ).startOf("month") as DateTime<true>;
    this.update();
    this.state.selectedDate = (
      this.props.value
        ? DateTime.fromJSDate(this.props.value)
        : DateTime.local()
    ) as DateTime<true>;
    this.update();
  }

  onUpdate() {
    const self = this;

    (function (__prev, __next) {
      const __hasChange = __prev.find((val, index) => val !== __next[index]);
      if (__hasChange !== undefined) {
        if (self.props.value) {
          self.state.selectedDate = DateTime.fromJSDate(
            self.props.value
          ) as DateTime<true>;
          self.state.currentMonth = self.state.selectedDate.startOf(
            "month"
          ) as DateTime<true>;
        }
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
    // re-rendering needs to ensure that all nodes generated by for/show are refreshed
    this.destroyAnyNodes();
    this.updateBindings();
  }

  updateBindings() {
    this._root.querySelectorAll("[data-el='div-calendar-1']").forEach((el) => {
      Object.assign(el.style, {
        "--calendar-background-color": this.state.backgroundColor,
        "--calendar-text-color": this.state.textColor,
        "--calendar-accent-color": this.state.accentColor,
        "--calendar-font-size": this.state.fontSize,
      });
    });

    this._root
      .querySelectorAll("[data-el='button-calendar-1']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonCalendar1Click);
        el.addEventListener("click", this.onButtonCalendar1Click);
      });

    this._root.querySelectorAll("[data-el='div-calendar-2']").forEach((el) => {
      this.renderTextNode(el, this.state.formatMonth());
    });

    this._root
      .querySelectorAll("[data-el='button-calendar-2']")
      .forEach((el) => {
        el.removeEventListener("click", this.onButtonCalendar2Click);
        el.addEventListener("click", this.onButtonCalendar2Click);
      });

    this._root.querySelectorAll("[data-el='for-calendar']").forEach((el) => {
      let array = this.state.getWeekdays();
      this.renderLoop(el, array, "day");
    });

    this._root.querySelectorAll("[data-el='div-calendar-3']").forEach((el) => {
      const day = this.getScope(el, "day");
      this.renderTextNode(el, day);
    });

    this._root.querySelectorAll("[data-el='for-calendar-2']").forEach((el) => {
      let array = this.state.getEmptyCells();
      this.renderLoop(el, array, "_", "i");
    });

    this._root.querySelectorAll("[data-el='div-calendar-4']").forEach((el) => {
      el.key = `empty-${i}`;
    });

    this._root.querySelectorAll("[data-el='for-calendar-3']").forEach((el) => {
      let array = this.state.getDayCells();
      this.renderLoop(el, array, "_", "i");
    });

    this._root.querySelectorAll("[data-el='div-calendar-5']").forEach((el) => {
      const i = this.getScope(el, "i");
      el.key = `day-${i + 1}`;
      el.className = `calendar-day ${
        this.state.isSelected(i + 1) ? "selected" : ""
      } ${this.state.isDisabled(i + 1) ? "disabled" : ""}`;
      el.removeEventListener("click", this.onDivCalendar5Click);
      el.addEventListener("click", this.onDivCalendar5Click);
    });

    this._root.querySelectorAll("[data-el='div-calendar-6']").forEach((el) => {
      const i = this.getScope(el, "i");
      this.renderTextNode(el, i + 1);
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

  // scope helper
  getScope(el, name) {
    do {
      let value = el?.scope?.[name];
      if (value !== undefined) {
        return value;
      }
    } while ((el = el.parentNode));
  }

  // Helper to render loops
  renderLoop(template, array, itemName, itemIndex, collectionName) {
    const collection = [];
    for (let [index, value] of array.entries()) {
      const elementFragment = template.content.cloneNode(true);
      const children = Array.from(elementFragment.childNodes);
      const localScope = {};
      let scope = localScope;
      if (template?.scope) {
        const getParent = {
          get(target, prop, receiver) {
            if (prop in target) {
              return target[prop];
            }
            if (prop in template.scope) {
              return template.scope[prop];
            }
            return target[prop];
          },
        };
        scope = new Proxy(localScope, getParent);
      }
      children.forEach((child) => {
        if (itemName !== undefined) {
          scope[itemName] = value;
        }
        if (itemIndex !== undefined) {
          scope[itemIndex] = index;
        }
        if (collectionName !== undefined) {
          scope[collectionName] = array;
        }
        child.scope = scope;
        if (template.context) {
          child.context = context;
        }
        this.nodesToDestroy.push(child);
        collection.unshift(child);
      });
    }
    collection.forEach((child) => template.after(child));
  }
}

customElements.define("calendar", Calendar);
