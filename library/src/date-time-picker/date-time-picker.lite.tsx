import { useStore, useStyle } from '@builder.io/mitosis';
import TimePicker from '../time-picker/time-picker.lite';
import Calendar from '../calendar/calendar.lite';

export interface DateTimePickerProps {
  value?: Date;
  onChange?: (event: { target: { value: Date } }) => void;
  format?: '12h' | '24h';
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  showBorder?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export default function DateTimePicker(props: DateTimePickerProps) {
  const state = useStore({
    selectedDateTime: props.value || new Date(),
    isCalendarOpen: false,
    backgroundColor: props.backgroundColor || '#ffffff',
    textColor: props.textColor || '#333333',
    accentColor: props.accentColor || '#007bff',
    fontSize: props.size === 'small' ? '12px' : props.size === 'large' ? '18px' : '14px',
    borderStyle: props.showBorder ? `1px solid ${props.accentColor || '#007bff'}` : 'none',

    updateDateTime() {
      props.onChange?.({ target: { value: state.selectedDateTime } });
    },

    setDate(event: { target: { value: Date } }) {
      state.selectedDateTime = new Date(
        event.target.value.getFullYear(),
        event.target.value.getMonth(),
        event.target.value.getDate(),
        state.selectedDateTime.getHours(),
        state.selectedDateTime.getMinutes()
      );
      state.updateDateTime();
    },

    setTime(event: { target: { value: Date } }) {
      state.selectedDateTime = new Date(
        state.selectedDateTime.getFullYear(),
        state.selectedDateTime.getMonth(),
        state.selectedDateTime.getDate(),
        event.target.value.getHours(),
        event.target.value.getMinutes()
      );
      state.updateDateTime();
    },

    toggleCalendar() {
      state.isCalendarOpen = !state.isCalendarOpen;
    },

    formatDate() {
      return state.selectedDateTime.toLocaleDateString();
    }
  });

  useStyle(`
    .date-time-picker {
      font-family: 'Roboto', sans-serif;
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
  `);

  return (
    <div 
      class="date-time-picker"
      style={{
        '--date-time-picker-background-color': state.backgroundColor,
        '--date-time-picker-text-color': state.textColor,
        '--date-time-picker-accent-color': state.accentColor,
        '--date-time-picker-font-size': state.fontSize,
        '--date-time-picker-border': state.borderStyle,
      }}
    >
      <div class="date-display">
        <span>{state.formatDate()}</span>
        <button class="toggle-button" onClick={() => state.toggleCalendar()}>
          {state.isCalendarOpen ? '▲' : '▼'}
        </button>
      </div>
      {state.isCalendarOpen && (
        <Calendar
          value={state.selectedDateTime}
          onChange={(event) => state.setDate(event)}
          minDate={props.minDate}
          maxDate={props.maxDate}
          accentColor={state.accentColor}
          fontSize={state.fontSize}
          backgroundColor={state.backgroundColor}
          textColor={state.textColor}
        />
      )}
      <TimePicker
        value={state.selectedDateTime}
        onChange={(event) => state.setTime(event)}
        format={props.format}
        size={props.size}
        backgroundColor={state.backgroundColor}
        textColor={state.textColor}
        accentColor={state.accentColor}
        showBorder={false}
      />
    </div>
  );
}