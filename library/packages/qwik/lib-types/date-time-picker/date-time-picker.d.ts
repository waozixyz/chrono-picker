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
export declare const updateDateTime: (props: any, state: any) => void;
export declare const setDate: (props: any, state: any, event: {
    target: {
        value: Date;
    };
}) => void;
export declare const setTime: (props: any, state: any, event: {
    target: {
        value: Date;
    };
}) => void;
export declare const toggleCalendar: (props: any, state: any) => void;
export declare const formatDate: (props: any, state: any) => any;
export declare const DateTimePicker: import("@builder.io/qwik").Component<DateTimePickerProps>;
export default DateTimePicker;
export declare const STYLES = "\n.date-time-picker {\n  font-family: \"Roboto\", sans-serif;\n  width: 300px;\n  background-color: var(--date-time-picker-background-color);\n  color: var(--date-time-picker-text-color);\n  border: var(--date-time-picker-border);\n  border-radius: 8px;\n  padding: 10px;\n}\n.date-display {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.date-display span {\n  flex-grow: 1;\n  text-align: center;\n}\n.toggle-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: var(--date-time-picker-accent-color);\n  font-size: var(--date-time-picker-font-size);\n}\n";
