import { Card, MarigoldProvider } from '@marigold/components';
import { cva, extendTheme, useTheme } from '@marigold/system';

export default () => {
  const currentTheme = useTheme();
  const theme = extendTheme(
    {
      Card: cva({ base: 'text-text-base bg-slate-200' }),
    },
    currentTheme
  );
  return (
    <MarigoldProvider theme={theme}>
      <Card>Some content</Card>
    </MarigoldProvider>
  );
};
