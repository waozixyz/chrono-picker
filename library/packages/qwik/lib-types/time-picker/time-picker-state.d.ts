import { TimePickerProps } from './time-picker-types';
export declare function createTimePickerState(props: TimePickerProps): {
    id: string;
    hour: number;
    minute: number;
    period: string;
    updateTime(): void;
    animateValue(element: any, oldValue: any, newValue: any, direction: any): void;
    handleHourChange(event: any): void;
    handleMinuteChange(event: any): void;
    incrementHour: () => void;
    decrementHour: () => void;
    incrementMinute: () => void;
    decrementMinute: () => void;
    togglePeriod: () => void;
};
