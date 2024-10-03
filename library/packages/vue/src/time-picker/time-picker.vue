<template>
  <div
    class="time-picker"
    :style="{
      display: 'inline-grid',
      gridTemplateColumns: `repeat(9, ${cellWidth})`,
      gridTemplateRows: `${smallCellHeight} ${cellHeight} ${smallCellHeight}`,
      gap: '1px',
      padding: '3px',
      borderRadius: '6px',
      backgroundColor: backgroundColor,
      color: textColor,
      border: borderStyle,
      fontFamily: '\'Roboto\', sans-serif',
      fontSize: fontSize,
      '--time-picker-button-color': buttonColor,
      '--time-picker-button-font-size': buttonFontSize,
      '--time-picker-button-hover-color': buttonHoverColor,
      '--time-picker-accent-color': accentColor,
    }"
  >
    <button
      class="time-picker-button"
      @click="incrementHour()"
      :style="{
        gridColumn: '1 / 5',
        gridRow: '1 / 2',
      }"
    >
      +
    </button>
    <div
      :style="{
        gridColumn: '5 / 6',
      }"
    ></div>
    <button
      class="time-picker-button"
      @click="incrementMinute()"
      :style="{
        gridColumn: '6 / 10',
        gridRow: '1 / 2',
      }"
    >
      +</button
    ><input
      type="text"
      class="time-picker-input"
      :value="hour.toString().padStart(2, '0')"
      @change="setHour($event.target.value)"
      :style="{
        gridColumn: '1 / 5',
        gridRow: '2 / 3',
      }"
    />
    <div
      :style="{
        gridColumn: '5 / 6',
        gridRow: '2 / 3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }"
    >
      :
    </div>
    <input
      type="text"
      class="time-picker-input"
      :value="minute.toString().padStart(2, '0')"
      @change="setMinute($event.target.value)"
      :style="{
        gridColumn: '6 / 10',
        gridRow: '2 / 3',
      }"
    /><button
      class="time-picker-button"
      @click="decrementHour()"
      :style="{
        gridColumn: '1 / 5',
        gridRow: '3 / 4',
      }"
    >
      -
    </button>
    <div
      :style="{
        gridColumn: '5 / 6',
      }"
    ></div>
    <button
      class="time-picker-button"
      @click="decrementMinute()"
      :style="{
        gridColumn: '6 / 10',
        gridRow: '3 / 4',
      }"
    >
      -
    </button>
    <template v-if="format === '12h'">
      <div
        :style="{
          gridColumn: '10 / 11',
          gridRow: '1 / 4',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: '2px',
        }"
      >
        <button
          class="time-picker-period-button"
          @click="togglePeriod()"
          :style="{
            color:
              period === 'AM' ? 'var(--accent-color)' : 'var(--button-color)',
          }"
        >
          AM</button
        ><button
          class="time-picker-period-button"
          @click="togglePeriod()"
          :style="{
            color:
              period === 'PM' ? 'var(--accent-color)' : 'var(--button-color)',
          }"
        >
          PM
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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

export default defineComponent({
  name: "time-picker",

  props: [
    "value",
    "format",
    "size",
    "accentColor",
    "textColor",
    "backgroundColor",
    "showBorder",
    "onChange",
  ],

  data() {
    return {
      hour: 0,
      minute: 0,
      period: "AM",
      cellWidth:
        this.size === "small"
          ? "10px"
          : this.size === "large"
          ? "16px"
          : "13px",
      cellHeight:
        this.size === "small"
          ? "24px"
          : this.size === "large"
          ? "38px"
          : "30px",
      smallCellHeight:
        this.size === "small"
          ? "12px"
          : this.size === "large"
          ? "19px"
          : "15px",
      fontSize:
        this.size === "small"
          ? "12px"
          : this.size === "large"
          ? "20px"
          : "16px",
      buttonFontSize:
        this.size === "small"
          ? "10px"
          : this.size === "large"
          ? "16px"
          : "13px",
      accentColor: this.accentColor || "#007bff",
      textColor: this.textColor || "#333333",
      backgroundColor: this.backgroundColor || "#ffffff",
      borderStyle: this.showBorder
        ? `1px solid ${this.accentColor || "#007bff"}`
        : "none",
      buttonColor: "#666666",
      buttonHoverColor: "#333333",
    };
  },

  mounted() {
    const val = this.value || new Date();
    this.hour = val.getHours() % (this.format === "12h" ? 12 : 24);
    if (this.hour === 0 && this.format === "12h") this.hour = 12;
    this.minute = val.getMinutes();
    this.period = val.getHours() >= 12 ? "PM" : "AM";
  },

  watch: {
    onUpdateHook0: {
      handler() {
        const val = this.value || new Date();
        this.hour = val.getHours() % (this.format === "12h" ? 12 : 24);
        if (this.hour === 0 && this.format === "12h") this.hour = 12;
        this.minute = val.getMinutes();
        this.period = val.getHours() >= 12 ? "PM" : "AM";
      },
      immediate: true,
    },
  },

  computed: {
    onUpdateHook0() {
      return {
        0: this.value,
      };
    },
  },

  methods: {
    updateTime() {
      let newHour = this.hour;
      if (this.format === "12h") {
        newHour = this.period === "PM" ? (newHour % 12) + 12 : newHour % 12;
        if (newHour === 0) newHour = 12;
      }
      const newDate = new Date(this.value || new Date());
      newDate.setHours(newHour);
      newDate.setMinutes(this.minute);
      this.onChange?.({
        target: {
          value: newDate,
        },
      });
    },
    setHour(value: string) {
      const hourInt = parseInt(value, 10);
      if (isNaN(hourInt)) return;
      const maxHour = this.format === "24h" ? 23 : 12;
      this.hour = Math.max(0, Math.min(hourInt, maxHour));
      this.updateTime();
    },
    setMinute(value: string) {
      const minuteInt = parseInt(value, 10);
      if (isNaN(minuteInt)) return;
      this.minute = Math.max(0, Math.min(minuteInt, 59));
      this.updateTime();
    },
    incrementHour() {
      this.hour = (this.hour + 1) % (this.format === "24h" ? 24 : 12);
      if (this.hour === 0 && this.format === "12h") this.hour = 12;
      this.updateTime();
    },
    decrementHour() {
      this.hour =
        (this.hour - 1 + (this.format === "24h" ? 24 : 12)) %
        (this.format === "24h" ? 24 : 12);
      if (this.hour === 0 && this.format === "12h") this.hour = 12;
      this.updateTime();
    },
    incrementMinute() {
      this.minute = (this.minute + 1) % 60;
      this.updateTime();
    },
    decrementMinute() {
      this.minute = (this.minute - 1 + 60) % 60;
      this.updateTime();
    },
    togglePeriod() {
      this.period = this.period === "AM" ? "PM" : "AM";
      this.updateTime();
    },
  },
});
</script>

<style scoped>
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
</style>