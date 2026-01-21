import { Grid } from '@mantine/core';
import { StockCard } from './StockCard';

export function StockCardsList() {
    return (
        <Grid gutter="md" >
            {[...Array(14)].map((_, index) => (
                <Grid.Col key={index} span={{ base: 12, md: 4, lg: 4, sm: 6, xs: 12 }}>
                    <StockCard />
                </Grid.Col>
            ))}
        </Grid>
    );
}
