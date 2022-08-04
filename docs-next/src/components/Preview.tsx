import { ReactNode } from 'react';
import { Box, MarigoldProvider } from '@marigold/components';
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
      <MarigoldProvider
        theme={theme}
        normalizeDocument
        selector="[data-preview]"
      >
        <Box
          css={{
            ...theme.root?.body,
            width: '100%',
            p: 20,
            borderRadius: '10px',
          }}
          data-preview
        >
          {children}
        </Box>
      </MarigoldProvider>
    </Box>
  );
};
