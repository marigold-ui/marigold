import { ReactNode } from 'react';
import { Box, Card, MarigoldProvider } from '@marigold/components';
import { useThemeSwitch } from './ThemeSwitch';
import { useComponentStyles } from '@marigold/system';

export interface Preview {
  code: boolean;
  children: ReactNode;
}

export const Preview = ({ children }: Preview) => {
  const { current, themes } = useThemeSwitch();
  const theme = (current && themes[current]) || themes.b2b2;
  const styles = useComponentStyles('Preview');
  return (
    <Box css={styles}>
      <Card>
        <MarigoldProvider
          theme={theme}
          normalizeDocument
          selector="[data-preview]"
        >
          <Box
            css={{
              ...theme.root?.body,
              width: '100%',
              borderRadius: '1rem',
              p: 20,
            }}
            data-preview
          >
            {children}
          </Box>
        </MarigoldProvider>
      </Card>
    </Box>
  );
};
