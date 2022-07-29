import { ReactNode } from 'react';
import { Box, ThemeProvider } from '@marigold/system';
import { useThemeSwitch } from './ThemeSwitch';

export interface DemoProps {
  code: boolean;
  children: ReactNode;
}

export const Demo = ({ children, code = false }: DemoProps) => {
  const { current, themes } = useThemeSwitch();

  return (
    <Box css={{ width: '100%' }}>
      <ThemeProvider theme={(current && themes[current]) || themes.b2b}>
        {children}
      </ThemeProvider>
    </Box>
  );
};
