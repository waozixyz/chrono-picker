export interface TimePickerProps {
    value?: Date;
    onChange?: (time: Date) => void;
    format?: '12h' | '24h';
    theme?: 'light' | 'dark' | 'custom';
    customTheme?: {
        backgroundColor: string;
        textColor: string;
        accentColor: string;
    };
    size?: 'small' | 'medium' | 'large';
}
