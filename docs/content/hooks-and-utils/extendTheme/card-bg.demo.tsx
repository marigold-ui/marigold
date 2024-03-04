import { Card, MarigoldProvider } from '@marigold/components';
import { cva, extendTheme, useTheme } from '@marigold/system';

export default () => {
  const currentTheme = useTheme();
  const theme = extendTheme(
    {
      Card: cva('bg-orange-400 text-white'),
    },
    currentTheme
  );
  return (
    <MarigoldProvider theme={theme}>
      <Card>Some content</Card>
    </MarigoldProvider>
  );
};
