import { createTheme } from "@mantine/core";

export const theme = createTheme({
    primaryColor: 'violet',
    colors: {
        dark: [
            '#C1C2C5',
            '#A6A7AB',
            '#909296',
            '#5c5f66',
            '#373A40',
            '#2C2E33',
            '#25262b',
            '#1A1B1E',
            '#141517',
            '#101113',
        ],
    },
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    headings: {
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        fontWeight: '700',
    },
    defaultRadius: 'md',
});