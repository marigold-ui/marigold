import { render, screen } from '@testing-library/react';
import { Button, Tabs } from '@marigold/components';
import { Theme } from '../types/theme';
import { cva } from '../utils/className.utils';
import { StylesProps, extendTheme } from './extendTheme';
import { ThemeProvider } from './useTheme';

const styles: StylesProps = {
  Button: cva({
    base: 'align-center flex',
    variants: {
      size: {
        medium: 'size-15',
      },
    },
  }),
};

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva({
      base: 'align-center flex disabled:bg-gray-600',
      variants: {
        variant: {
          primary: 'text-primary-500',
          secondary: 'text-secondary-800',
          tertiary: 'text-green-300',
        },
        size: {
          large: 'w-50 h-50',
        },
      },
    }),
    Tabs: {
      container: cva({ base: 'flex' }),
      tabpanel: cva({ base: 'border-3 border-solid border-red-400' }),
      tabsList: cva({ base: 'mb-2.5' }),
      tab: cva({
        base: [
          'selected:border-red-500  selected:border-b-8  selected:border-solid ',
        ],
        variants: {
          size: {
            small: 'px-1 pb-1',
            medium: 'px-2 pb-2 text-lg',
            large: 'px-4 pb-4 text-2xl',
          },
        },
      }),
    },
  },
};

test('Accepting a new variant', () => {
  const newTheme = extendTheme(styles, theme);
  render(
    <ThemeProvider theme={newTheme}>
      <Button variant="tertiary">button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText('button');

  expect(button.className).toMatchInlineSnapshot(
    `"align-center disabled:bg-gray-600 text-green-300 align-center flex"`
  );
});

test('Accepting styles for component with multiple slots', () => {
  const newTheme = extendTheme(
    {
      Tabs: {
        tabpanel: cva({ base: 'bg-bg-accent rounded-md p-3 text-white' }),
      },
    },
    theme
  );
  render(
    <ThemeProvider theme={newTheme}>
      <Tabs disabledKeys={['2']}>
        <Tabs.List data-testid="tabs-container">
          <Tabs.Item id="1">tab1</Tabs.Item>
          <Tabs.Item id="2">tab2</Tabs.Item>
        </Tabs.List>
        <Tabs.TabPanel id="1">tab-1 content</Tabs.TabPanel>
        <Tabs.TabPanel id="2">tab-2 content</Tabs.TabPanel>
      </Tabs>
    </ThemeProvider>
  );

  const tabPanel = screen.getByText('tab-1 content');

  expect(tabPanel.className).toMatchInlineSnapshot(
    `"border-3 border-solid border-red-400 bg-bg-accent rounded-md p-3 text-white"`
  );
});

test('Not supporting adding styles for a new component', () => {
  const newTheme = extendTheme(
    {
      MultiSelect: 'bg-red-300',
    } as any,
    theme
  );
  expect(newTheme).toEqual(theme);
});

test('Should support new variant and existing size', () => {
  const newTheme = extendTheme(
    {
      Tabs: {
        container: cva({ base: 'flex' }),
        tabpanel: cva({ base: 'border-3 border-solid border-red-400' }),
        tabsList: cva({ base: 'mb-2.5' }),
        tab: cva({
          base: [
            'selected:border-red-500  selected:border-b-8  selected:border-solid ',
          ],
          variants: {
            variant: {
              sunken: 'bg-slate-400 font-bold',
            },
          },
        }),
      },
    },
    theme
  );
  render(
    <ThemeProvider theme={newTheme}>
      <Tabs disabledKeys={['2']} variant="sunken" size="medium">
        <Tabs.List data-testid="tabs-container">
          <Tabs.Item id="1">tab1</Tabs.Item>
          <Tabs.Item id="2">tab2</Tabs.Item>
        </Tabs.List>
        <Tabs.TabPanel id="1">tab-1 content</Tabs.TabPanel>
        <Tabs.TabPanel id="2">tab-2 content</Tabs.TabPanel>
      </Tabs>
    </ThemeProvider>
  );

  const tab = screen.getByText('tab1');

  expect(tab.className).toContain('px-2 pb-2 text-lg');
});
