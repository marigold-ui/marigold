import { List } from '@marigold/components';
import { Box, ThemeProvider, useTheme } from '@marigold/system';

export const getTheme = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box overflow="scroll" width="100%">
        {Object.entries(theme).map(([key, value]) => (
          <List key={key}>
            <strong>{key}</strong>
            <List.Item>{Object.keys(value) + ','}</List.Item>
          </List>
        ))}
      </Box>
    </ThemeProvider>
  );
};
