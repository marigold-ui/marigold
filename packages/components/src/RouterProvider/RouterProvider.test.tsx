import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
import { RouterProvider } from './RouterProvider';

test('change the routes', () => {
  const RouterProviderTest = () => {
    const [url, setUrl] = useState('/FoR');
    return (
      <RouterProvider navigate={setUrl}>
        <Tabs selectedKey={url}>
          <TabList
            aria-label="History of Ancient Rome"
            style={{ display: 'flex', gap: 8 }}
          >
            <Tab id="/FoR" href="/FoR">
              Founding of Rome
            </Tab>
            <Tab id="/MaR" href="/MaR">
              Monarchy and Republic
            </Tab>
            <Tab id="/Emp" href="/Emp">
              Empire
            </Tab>
          </TabList>
          <TabPanel id="/FoR">
            Arma virumque cano, Troiae qui primus ab oris.
          </TabPanel>
          <TabPanel id="/MaR">Senatus Populusque Romanus.</TabPanel>
          <TabPanel id="/Emp">Alea jacta est.</TabPanel>
        </Tabs>
      </RouterProvider>
    );
  };

  render(<RouterProviderTest />);

  const first = screen.getByText('Founding of Rome');
  const third = screen.getByText('Empire');
  expect(first).toHaveAttribute('data-selected', 'true');
  expect(third).not.toHaveAttribute('data-selected', 'true');

  fireEvent.click(third);
  expect(first).not.toHaveAttribute('data-selected', 'true');
  expect(third).toHaveAttribute('data-selected', 'true');
});
