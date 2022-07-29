import { ReactNode } from 'react';
import { Box, MarigoldProvider } from '@marigold/components';
import { useThemeSwitch } from './ThemeSwitch';

export interface DemoProps {
  code: boolean;
  children: ReactNode;
}

export const Demo = ({ children, code = false }: DemoProps) => {
  const { current, themes } = useThemeSwitch();
  const theme = (current && themes[current]) || themes.b2b2;

  return (
    <Box css={{ border: '1px solid', borderColor: 'text.regular' }}>
      <MarigoldProvider theme={theme} normalizeDocument selector="[data-demo]">
        <Box css={{ ...theme.root?.body, width: '100%', p: 16 }} data-demo>
          {children}
        </Box>
      </MarigoldProvider>
    </Box>
  );
};
