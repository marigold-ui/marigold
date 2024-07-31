import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';

import { RouterProvider } from './RouterProvider';

const meta = {
  title: 'Components/RouterProvider',
  component: RouterProvider,
  argTypes: {
    navigate: {
      control: {
        type: 'text',
      },
      description: 'path to navigate too',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: './start' },
      },
    },
  },
  args: {},
} satisfies Meta<typeof RouterProvider>;

export default meta;
type Story = StoryObj<typeof RouterProvider>;

function CustomTab(props: any) {
  return (
    <Tab
      {...props}
      style={({ isSelected }) => ({
        borderBottom: '2px solid ' + (isSelected ? 'slateblue' : 'transparent'),
      })}
    />
  );
}

export const Basic: Story = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [url, setUrl] = useState<string>('/FoR');
    return (
      <>
        <RouterProvider {...args} navigate={setUrl}>
          <Tabs selectedKey={url}>
            <TabList
              aria-label="History of Ancient Rome"
              style={{ display: 'flex', gap: 8 }}
            >
              <CustomTab id="/FoR" href="/FoR">
                Founding of Rome
              </CustomTab>
              <CustomTab id="/MaR" href="/MaR">
                Monarchy and Republic
              </CustomTab>
              <CustomTab id="/Emp" href="/Emp">
                Empire
              </CustomTab>
            </TabList>
            <TabPanel id="/FoR">
              Arma virumque cano, Troiae qui primus ab oris.
            </TabPanel>
            <TabPanel id="/MaR">Senatus Populusque Romanus.</TabPanel>
            <TabPanel id="/Emp">Alea jacta est.</TabPanel>
          </Tabs>
        </RouterProvider>
        <pre>
          <strong>URL:</strong>
          {url}
        </pre>
      </>
    );
  },
};
