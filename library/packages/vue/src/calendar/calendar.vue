<template>
  <div
    class="calendar"
    :style="{
      '--calendar-background-color': backgroundColor,
      '--calendar-text-color': textColor,
      '--calendar-accent-color': accentColor,
      '--calendar-font-size': fontSize,
    }"
  >
    <div class="calendar-header">
      <button class="calendar-button" @click="changeMonth(-1)">&lt;</button
      ><span>{{ formatMonth() }}</span
      ><button class="calendar-button" @click="changeMonth(1)">&gt;</button>
    </div>
    <div class="calendar-grid">
      <template :key="index" v-for="(day, index) in getWeekdays()">
        <div class="calendar-weekday">{{ day }}</div> </template
      ><template :key="`empty-${i}`" v-for="(_, index) in getEmptyCells()">
        <div></div> </template
      ><template :key="`day-${i + 1}`" v-for="(_, index) in getDayCells()">
        <div
          :class="`calendar-day ${isSelected(i + 1) ? 'selected' : ''} ${
            isDisabled(i + 1) ? 'disabled' : ''
          }`"
          @click="selectDate(i + 1)"
        >
          {{ i + 1 }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { DateTime, Info } from "luxon";

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

export default defineComponent({
  name: "calendar",

  props: [
    "value",
    "minDate",
    "maxDate",
    "backgroundColor",
    "textColor",
    "accentColor",
    "fontSize",
    "locale",
    "onChange",
  ],

  data() {
    return {
      currentMonth: DateTime.local().startOf("month"),
      selectedDate: DateTime.local(),
      minDate: this.minDate
        ? DateTime.fromJSDate(this.minDate)
        : DateTime.local().minus({
            years: 100,
          }),
      maxDate: this.maxDate
        ? DateTime.fromJSDate(this.maxDate)
        : DateTime.local().plus({
            years: 100,
          }),
      backgroundColor: this.backgroundColor || "#ffffff",
      textColor: this.textColor || "#333333",
      accentColor: this.accentColor || "#007bff",
      fontSize: this.fontSize || "14px",
      locale: this.locale || "en",
    };
  },

  mounted() {
    this.currentMonth = (
      this.value ? DateTime.fromJSDate(this.value) : DateTime.local()
    ).startOf("month") as DateTime<true>;
    this.selectedDate = (
      this.value ? DateTime.fromJSDate(this.value) : DateTime.local()
    ) as DateTime<true>;
  },

  watch: {
    onUpdateHook0: {
      handler() {
        if (this.value) {
          this.selectedDate = DateTime.fromJSDate(this.value) as DateTime<true>;
          this.currentMonth = this.selectedDate.startOf(
            "month"
          ) as DateTime<true>;
        }
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
    changeMonth(delta: number) {
      this.currentMonth = this.currentMonth
        .plus({
          months: delta,
        })
        .startOf("month") as DateTime<true>;
    },
    selectDate(day: number) {
      const newDate = this.currentMonth.set({
        day,
      }) as DateTime<true>;
      if (this.isDateInRange(newDate)) {
        this.selectedDate = newDate;
        this.onChange?.({
          target: {
            value: newDate.toJSDate(),
          },
        });
      }
    },
    getEmptyCells() {
      return Array(this.currentMonth.weekday % 7).fill(null);
    },
    getDayCells() {
      return Array(this.currentMonth.daysInMonth).fill(null);
    },
    isSelected(day: number) {
      return this.selectedDate.hasSame(
        this.currentMonth.set({
          day,
        }) as DateTime<true>,
        "day"
      );
    },
    isDateInRange(date: DateTime<true>) {
      return date >= this.minDate && date <= this.maxDate;
    },
    isDisabled(day: number) {
      return !this.isDateInRange(
        this.currentMonth.set({
          day,
        }) as DateTime<true>
      );
    },
    getWeekdays() {
      return Info.weekdays("short", {
        locale: this.locale,
      });
    },
    formatMonth() {
      return this.currentMonth.toLocaleString({
        month: "long",
        year: "numeric",
      });
    },
  },
});
</script>

<style scoped>
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
</style>