<template>
  <div
    class="date-time-picker"
    :style="{
      '--date-time-picker-background-color': backgroundColor,
      '--date-time-picker-text-color': textColor,
      '--date-time-picker-accent-color': accentColor,
      '--date-time-picker-font-size': fontSize,
      '--date-time-picker-border': borderStyle,
    }"
  >
    <div class="date-display">
      <span>{{ formatDate() }}</span
      ><button class="toggle-button" @click="toggleCalendar()">
        <template v-if="isCalendarOpen"> ▲ </template>

        <template v-else> ▼ </template>
      </button>
    </div>
    <template v-if="isCalendarOpen">
      <Calendar
        :value="selectedDateTime"
        :onChange="(event) => setDate(event)"
        :minDate="minDate"
        :maxDate="maxDate"
        :accentColor="accentColor"
        :fontSize="fontSize"
        :backgroundColor="backgroundColor"
        :textColor="textColor"
      ></Calendar>
    </template>

    <TimePicker
      :value="selectedDateTime"
      :onChange="(event) => setTime(event)"
      :format="format"
      :size="size"
      :backgroundColor="backgroundColor"
      :textColor="textColor"
      :accentColor="accentColor"
      :showBorder="false"
    ></TimePicker>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import TimePicker from "../time-picker/time-picker.vue";
import Calendar from "../calendar/calendar.vue";

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

export default defineComponent({
  name: "date-time-picker",
  components: { Calendar: Calendar, TimePicker: TimePicker },
  props: [
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
  ],

  data() {
    return {
      selectedDateTime: this.value || new Date(),
      isCalendarOpen: false,
      backgroundColor: this.backgroundColor || "#ffffff",
      textColor: this.textColor || "#333333",
      accentColor: this.accentColor || "#007bff",
      fontSize:
        this.size === "small"
          ? "12px"
          : this.size === "large"
          ? "18px"
          : "14px",
      borderStyle: this.showBorder
        ? `1px solid ${this.accentColor || "#007bff"}`
        : "none",
    };
  },

  methods: {
    updateDateTime() {
      this.onChange?.({
        target: {
          value: this.selectedDateTime,
        },
      });
    },
    setDate(event: {
      target: {
        value: Date;
      };
    }) {
      this.selectedDateTime = new Date(
        event.target.value.getFullYear(),
        event.target.value.getMonth(),
        event.target.value.getDate(),
        this.selectedDateTime.getHours(),
        this.selectedDateTime.getMinutes()
      );
      this.updateDateTime();
    },
    setTime(event: {
      target: {
        value: Date;
      };
    }) {
      this.selectedDateTime = new Date(
        this.selectedDateTime.getFullYear(),
        this.selectedDateTime.getMonth(),
        this.selectedDateTime.getDate(),
        event.target.value.getHours(),
        event.target.value.getMinutes()
      );
      this.updateDateTime();
    },
    toggleCalendar() {
      this.isCalendarOpen = !this.isCalendarOpen;
    },
    formatDate() {
      return this.selectedDateTime.toLocaleDateString();
    },
  },
});
</script>

<style scoped>
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
</style>