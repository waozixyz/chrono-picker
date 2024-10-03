import { useStore, onMount, onUpdate, useStyle, For } from '@builder.io/mitosis';
import { DateTime, Info } from 'luxon';

export interface CalendarProps {
  value?: Date;
  onChange?: (event: { target: { value: Date } }) => void;
  minDate?: Date;
  maxDate?: Date;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  fontSize?: string;
  locale?: string;
}

export default function Calendar(props: CalendarProps) {
  const state = useStore({
    currentMonth: DateTime.local().startOf('month') as DateTime<true>,
    selectedDate: DateTime.local() as DateTime<true>,
    minDate: (props.minDate ? DateTime.fromJSDate(props.minDate) : DateTime.local().minus({ years: 100 })) as DateTime<true>,
    maxDate: (props.maxDate ? DateTime.fromJSDate(props.maxDate) : DateTime.local().plus({ years: 100 })) as DateTime<true>,
    backgroundColor: props.backgroundColor || '#ffffff',
    textColor: props.textColor || '#333333',
    accentColor: props.accentColor || '#007bff',
    fontSize: props.fontSize || '14px',
    locale: props.locale || 'en',

    changeMonth(delta: number) {
      state.currentMonth = state.currentMonth.plus({ months: delta }).startOf('month') as DateTime<true>;
    },

    selectDate(day: number) {
      const newDate = state.currentMonth.set({ day }) as DateTime<true>;
      if (state.isDateInRange(newDate)) {
        state.selectedDate = newDate;
        props.onChange?.({ target: { value: newDate.toJSDate() } });
      }
    },

    getEmptyCells() {
      return Array(state.currentMonth.weekday % 7).fill(null);
    },

    getDayCells() {
      return Array(state.currentMonth.daysInMonth).fill(null);
    },

    isSelected(day: number) {
      return state.selectedDate.hasSame(state.currentMonth.set({ day }) as DateTime<true>, 'day');
    },

    isDateInRange(date: DateTime<true>) {
      return date >= state.minDate && date <= state.maxDate;
    },

    isDisabled(day: number) {
      return !state.isDateInRange(state.currentMonth.set({ day }) as DateTime<true>);
    },

    getWeekdays() {
      return Info.weekdays('short', { locale: state.locale });
    },

    formatMonth() {
      return state.currentMonth.toLocaleString({ month: 'long', year: 'numeric' });
    }
  });

  onMount(() => {
    state.currentMonth = (props.value ? DateTime.fromJSDate(props.value) : DateTime.local()).startOf('month') as DateTime<true>;
    state.selectedDate = (props.value ? DateTime.fromJSDate(props.value) : DateTime.local()) as DateTime<true>;
  });

  onUpdate(() => {
    if (props.value) {
      state.selectedDate = DateTime.fromJSDate(props.value) as DateTime<true>;
      state.currentMonth = state.selectedDate.startOf('month') as DateTime<true>;
    }
  }, [props.value]);

  useStyle(`
    .calendar {
      font-family: 'Roboto', sans-serif;
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
    .calendar-day:hover:not(.disabled), .calendar-day.selected {
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
  `);

  return (
    <div
      class="calendar"
      style={{
        '--calendar-background-color': state.backgroundColor,
        '--calendar-text-color': state.textColor,
        '--calendar-accent-color': state.accentColor,
        '--calendar-font-size': state.fontSize,
      }}
    >
      <div class="calendar-header">
        <button class="calendar-button" onClick={() => state.changeMonth(-1)}>&lt;</button>
        <span>{state.formatMonth()}</span>
        <button class="calendar-button" onClick={() => state.changeMonth(1)}>&gt;</button>
      </div>
      <div class="calendar-grid">
        <For each={state.getWeekdays()}>
          {(day) => <div class="calendar-weekday">{day}</div>}
        </For>
        <For each={state.getEmptyCells()}>
          {(_, i) => <div key={`empty-${i}`}></div>}
        </For>
        <For each={state.getDayCells()}>
          {(_, i) => (
            <div
              key={`day-${i + 1}`}
              class={`calendar-day ${state.isSelected(i + 1) ? 'selected' : ''} ${state.isDisabled(i + 1) ? 'disabled' : ''}`}
              onClick={() => state.selectDate(i + 1)}
            >
              {i + 1}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}