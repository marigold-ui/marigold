import { ReactNode } from 'react';
import { Box, MarigoldProvider } from '@marigold/components';
import { useThemeSwitch } from './ThemeSwitch';
import { useComponentStyles } from '@marigold/system';

export interface DemoProps {
  code: boolean;
  children: ReactNode;
}

export const Demo = ({ children }: DemoProps) => {
  const { current, themes } = useThemeSwitch();
  const theme = (current && themes[current]) || themes.b2b2;
  const styles = useComponentStyles('Demo', {});
  return (
    <Box css={styles}>
      <MarigoldProvider theme={theme} normalizeDocument selector="[data-demo]">
        <Box
          css={{
            ...theme.root?.body,
            width: '100%',
            p: 20,
            borderRadius: '10px',
          }}
          data-demo
        >
          {children}
        </Box>
      </MarigoldProvider>
    </Box>
  );
};
