import { AppShell, Center, Text } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApiKeyModal, Footer } from './components';
import { useApiKey } from './hooks';
import { StockCardsList } from './pages/StockCardsList';
import { StockDetails } from './pages/StockDetails';

function App() {
    const { hasKey, saveApiKey } = useApiKey();

    return (
        <>
            <ApiKeyModal opened={!hasKey} onSubmit={saveApiKey} />
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <AppShell header={{ height: 35 }} footer={{ height: 50 }} padding="md">
                    <AppShell.Header>
                        <Center h="100%">
                            <Text fw={600} size="lg">
                                Stock Ticker Dashboard
                            </Text>
                        </Center>
                    </AppShell.Header>
                    <AppShell.Main>
                        {hasKey && (
                            <Routes>
                                <Route path="/" element={<StockCardsList />} />
                                <Route path="/ticker/:ticker" element={<StockDetails />} />
                            </Routes>
                        )}
                    </AppShell.Main>
                    <AppShell.Footer>
                        <Footer />
                    </AppShell.Footer>
                </AppShell>
            </BrowserRouter>
        </>
    );
}

export default App;
