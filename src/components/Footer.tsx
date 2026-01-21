import styled from '@emotion/styled';
import type { AnchorProps } from '@mantine/core';
import { Anchor, Container, createPolymorphicComponent, Group, Stack, Text } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

const FooterSection = styled.footer`
    background: var(--mantine-color-dark-7);
    border-top: 1px solid rgba(139, 92, 246, 0.2);
`;

const _StyledAnchor = styled(Anchor)`
    text-decoration: none;
`;

const StyledAnchor = createPolymorphicComponent<'a', AnchorProps>(_StyledAnchor);

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <FooterSection style={{ padding: 60 }}>
            <Container size="xl">
                <Stack gap="xl" align="center" pos="relative">
                    <Group gap="xl">
                        <StyledAnchor
                            href="'https://github.com/douglasg14b'"
                            c="dimmed"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IconBrandGithub size={24} />
                        </StyledAnchor>
                    </Group>

                    <Text c="dimmed" size="sm" ta="center">
                        © {currentYear} Douglas Gaskell
                    </Text>
                </Stack>
            </Container>
        </FooterSection>
    );
}
