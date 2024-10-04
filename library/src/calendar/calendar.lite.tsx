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
    currentMonthISO: DateTime.local().startOf('month').toISO() || '',
    selectedDateISO: DateTime.local().toISO() || '',
    minDateISO: (props.minDate ? DateTime.fromJSDate(props.minDate) : DateTime.local().minus({ years: 100 })).toISO() || '',
    maxDateISO: (props.maxDate ? DateTime.fromJSDate(props.maxDate) : DateTime.local().plus({ years: 100 })).toISO() || '',
    backgroundColor: props.backgroundColor || '#ffffff',
    textColor: props.textColor || '#333333',
    accentColor: props.accentColor || '#007bff',
    fontSize: props.fontSize || '14px',
    locale: props.locale || 'en',

    changeMonth(delta: number) {
      const currentMonth = DateTime.fromISO(state.currentMonthISO);
      state.currentMonthISO = currentMonth.plus({ months: delta }).startOf('month').toISO() || '';
    },

    selectDate(day: number) {
      const currentMonth = DateTime.fromISO(state.currentMonthISO);
      const newDate = currentMonth.set({ day });
      if (newDate.isValid && state.isDateInRange(newDate)) {
        state.selectedDateISO = newDate.toISO() || '';
        props.onChange?.({ target: { value: newDate.toJSDate() } });
      }
    },

    getEmptyCells() {
      const currentMonth = DateTime.fromISO(state.currentMonthISO);
      return Array(currentMonth.isValid ? currentMonth.weekday % 7 : 0).fill(null);
    },

    getDayCells() {
      const currentMonth = DateTime.fromISO(state.currentMonthISO);
      return Array(currentMonth.isValid ? currentMonth.daysInMonth : 0).fill(null);
    },

    isSelected(day: number) {
      const currentMonth = DateTime.fromISO(state.currentMonthISO);
      const selectedDate = DateTime.fromISO(state.selectedDateISO);
      return currentMonth.isValid && selectedDate.isValid && selectedDate.hasSame(currentMonth.set({ day }), 'day');
    },

    isDateInRange(date: DateTime) {
      const minDate = DateTime.fromISO(state.minDateISO);
      const maxDate = DateTime.fromISO(state.maxDateISO);
      return date.isValid && minDate.isValid && maxDate.isValid && date >= minDate && date <= maxDate;
    },

    isDisabled(day: number) {
      const currentMonth = DateTime.fromISO(state.currentMonthISO);
      return !currentMonth.isValid || !state.isDateInRange(currentMonth.set({ day }));
    },

    getWeekdays() {
      return Info.weekdays('short', { locale: state.locale });
    },

    formatMonth() {
      const currentMonth = DateTime.fromISO(state.currentMonthISO);
      return currentMonth.isValid ? currentMonth.toLocaleString({ month: 'long', year: 'numeric' }) : '';
    }
  });

  onMount(() => {
    const initialDate = props.value ? DateTime.fromJSDate(props.value) : DateTime.local();
    state.currentMonthISO = initialDate.startOf('month').toISO() || '';
    state.selectedDateISO = initialDate.toISO() || '';
  });

  onUpdate(() => {
    if (props.value) {
      const selectedDate = DateTime.fromJSDate(props.value);
      if (selectedDate.isValid) {
        state.selectedDateISO = selectedDate.toISO() || '';
        state.currentMonthISO = selectedDate.startOf('month').toISO() || '';
      }
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