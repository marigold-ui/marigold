import { Button, MarigoldProvider } from '@marigold/components';
import { cva, extendTheme, useTheme } from '@marigold/system';

export default () => {
  const currentTheme = useTheme();
  const theme = extendTheme(
    {
      Button: cva('p-3', {
        variants: {
          variant: {
            tertiary: 'bg-bg-success text-white',
          },
          size: {
            medium: 'px-6 leading-10',
          },
        },
      }),
    },
    currentTheme
  );
  return (
    <MarigoldProvider theme={theme}>
      <Button size="medium" variant="tertiary">
        Click Me
      </Button>
    </MarigoldProvider>
  );
};
