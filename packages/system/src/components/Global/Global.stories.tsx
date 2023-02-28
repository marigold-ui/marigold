import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Global } from './Global';
import { ThemeProvider } from '../../hooks';

const meta = {
  title: 'System/Global',
  component: Global,
  argTypes: {
    selector: {
      control: {
        type: 'text',
      },
      description: 'The CSS selector to apply to the styles (default document)',
    },
    normalizeDocument: {
      control: {
        type: 'boolean',
      },
      description: 'Normalize the document?',
    },
  },
} satisfies Meta<typeof Global>;

export default meta;
type Story = StoryObj<typeof meta>;

const theme = {
  root: {
    body: {
      m: 0,
      p: 0,
      fontFamily: 'Webdings',
    },
    button: {
      color: '#fff0f6',
      border: '1px solid #a61e4d',
      background: '#d6336c',
    },
  },
};

export const Basic: Story = {
  render: args => (
    <ThemeProvider theme={theme}>
      <Global {...args} />
      <div>
        <button>Button</button>
      </div>
    </ThemeProvider>
  ),
};

export const Custom: Story = {
  render: () => (
    <ThemeProvider theme={theme}>
      <Global selector="#custom" />
      <p>
        Element normalization and globals styles are only applied to the "Inside
        Button"
      </p>
      <div style={{ paddingBottom: 10 }}>
        <button>Outside Button</button>
      </div>
      <div id="custom">
        <button>Inside Button</button>
      </div>
    </ThemeProvider>
  ),
};
