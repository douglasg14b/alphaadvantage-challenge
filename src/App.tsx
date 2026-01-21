import { AppShell, Center, Text, useMantineTheme } from '@mantine/core';
import { Footer } from './components';
import { StockCardsList } from './pages/StockCardsList';

function App() {
    return (
        <AppShell padding="md">
            <AppShell.Header mb="md">
                <Center>
                    <Text fw={600} size="lg">
                        Stock Ticker Dashboard
                    </Text>
                </Center>
            </AppShell.Header>
            <AppShell.Main h="100%">
                <StockCardsList />
            </AppShell.Main>
            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
}

export default App;
