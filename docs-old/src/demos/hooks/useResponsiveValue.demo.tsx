import { Box, ThemeProvider, useResponsiveValue } from '@marigold/system';

export const ResponsiveValue = () => {
  const theme = {
    breakpoints: ['40em', '50em', '60em', '70em'],
  };
  const SomeComponent = () => {
    const value = useResponsiveValue(
      [
        'no breakpoint',
        'larger than 40em',
        'larger than 50em',
        'larger than 60em',
        'larger than 70em',
      ],
      2
    );
    return <strong>{value}</strong>;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box css={{ bg: ['red', 'blue', 'green', 'yellow', 'hotpink'] }}>
        <SomeComponent />
      </Box>
    </ThemeProvider>
  );
};
