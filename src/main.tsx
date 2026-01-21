import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App.tsx';
import { theme } from './mantineTheme.ts';
import '@mantine/core/styles.css';

ReactDom.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <App />
        </MantineProvider>
    </React.StrictMode>,
);
