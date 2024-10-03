import { DateTime } from "luxon";
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
export declare const changeMonth: (props: any, state: any, delta: number) => void;
export declare const selectDate: (props: any, state: any, day: number) => void;
export declare const getEmptyCells: (props: any, state: any) => any[];
export declare const getDayCells: (props: any, state: any) => any[];
export declare const isSelected: (props: any, state: any, day: number) => any;
export declare const isDateInRange: (props: any, state: any, date: DateTime<true>) => boolean;
export declare const isDisabled: (props: any, state: any, day: number) => boolean;
export declare const getWeekdays: (props: any, state: any) => string[];
export declare const formatMonth: (props: any, state: any) => any;
export declare const Calendar: import("@builder.io/qwik").Component<CalendarProps>;
export default Calendar;
export declare const STYLES = "\n.calendar {\n  font-family: \"Roboto\", sans-serif;\n  background-color: var(--calendar-background-color);\n  color: var(--calendar-text-color);\n  padding: 10px;\n  border-radius: 8px;\n}\n.calendar-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.calendar-grid {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 5px;\n}\n.calendar-day {\n  text-align: center;\n  padding: 5px;\n  cursor: pointer;\n  border-radius: 50%;\n}\n.calendar-day:hover:not(.disabled),\n.calendar-day.selected {\n  background-color: var(--calendar-accent-color);\n  color: white;\n}\n.calendar-day.disabled {\n  color: #ccc;\n  cursor: not-allowed;\n}\n.calendar-weekday {\n  text-align: center;\n  font-weight: bold;\n  margin-bottom: 5px;\n}\n.calendar-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: var(--calendar-accent-color);\n  font-size: var(--calendar-font-size);\n}\n";
