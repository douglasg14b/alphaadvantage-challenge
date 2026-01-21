import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDom from 'react-dom/client';
import App from './App.tsx';
import { theme } from './mantineTheme.ts';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes (matches our cache TTL)
            refetchOnWindowFocus: false,
        },
    },
});

ReactDom.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <Notifications position="top-right" autoClose={3000} />
            <App />
        </MantineProvider>
    </QueryClientProvider>,
);
