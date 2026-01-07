'use client';

import { List } from '@marigold/components';
import { ThemeProvider, useTheme } from '@marigold/system';

export default () => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full overflow-auto">
        {Object.entries(theme).map(([key, value]) => (
          <List key={key}>
            <strong>{key}</strong>
            {Object.keys(value).map(item => (
              <List.Item key={crypto.randomUUID()}>
                {item}
                <br />
              </List.Item>
            ))}
          </List>
        ))}
      </div>
    </ThemeProvider>
  );
};
