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
export declare const updateTime: (props: any, state: any) => void;
export declare const setHour: (props: any, state: any, value: string) => void;
export declare const setMinute: (props: any, state: any, value: string) => void;
export declare const incrementHour: (props: any, state: any) => void;
export declare const decrementHour: (props: any, state: any) => void;
export declare const incrementMinute: (props: any, state: any) => void;
export declare const decrementMinute: (props: any, state: any) => void;
export declare const togglePeriod: (props: any, state: any) => void;
export declare const TimePicker: import("@builder.io/qwik").Component<TimePickerProps>;
export default TimePicker;
export declare const STYLES = "\n.time-picker {\n  --button-color: var(--time-picker-button-color);\n  --button-font-size: var(--time-picker-button-font-size);\n  --button-hover-color: var(--time-picker-button-hover-color);\n  --accent-color: var(--time-picker-accent-color);\n}\n.time-picker-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: var(--button-color);\n  font-size: var(--button-font-size);\n  font-weight: bold;\n  opacity: 0.5;\n  transition: opacity 0.3s;\n}\n.time-picker-button:hover {\n  opacity: 1;\n}\n.time-picker-input {\n  text-align: center;\n  border: none;\n  background: none;\n  color: inherit;\n  font-size: inherit;\n  font-weight: bold;\n  width: 100%;\n  padding: 0;\n}\n.time-picker-period-button {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 1px;\n  font-size: var(--button-font-size);\n  font-weight: bold;\n  transition: color 0.3s;\n}\n.time-picker-period-button:hover {\n  color: var(--button-hover-color);\n}\n";
