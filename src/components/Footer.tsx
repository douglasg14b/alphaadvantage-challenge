import styled from '@emotion/styled';
import type { AnchorProps } from '@mantine/core';
import { Anchor, Container, createPolymorphicComponent, Group, Text } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

const FooterSection = styled.footer`
    display: flex;
    align-items: center;
    height: 100%;
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
        <FooterSection>
            <Container size="lg" px="md">
                <Group justify="center" align="center" gap="md">
                    <StyledAnchor
                        href="https://github.com/douglasg14b"
                        c="dimmed"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <IconBrandGithub size={24} />
                    </StyledAnchor>

                    <Text c="dimmed" size="sm">
                        © {currentYear} Douglas Gaskell
                    </Text>
                </Group>
            </Container>
        </FooterSection>
    );
}
