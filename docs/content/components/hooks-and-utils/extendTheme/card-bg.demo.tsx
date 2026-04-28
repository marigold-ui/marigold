import { Card, MarigoldProvider } from '@marigold/components';
import { cva, extendTheme, useTheme } from '@marigold/system';

export default () => {
  const currentTheme = useTheme();
  const theme = extendTheme(
    {
      Card: {
        container: cva({ base: 'bg-slate-200' }),
      },
    },
    currentTheme
  );
  return (
    <MarigoldProvider theme={theme}>
      <Card>
        <Card.Body>Some content</Card.Body>
      </Card>
    </MarigoldProvider>
  );
};
