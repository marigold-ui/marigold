import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components/Tabs';
import preview from '.storybook/preview';
import { Link } from '../Link/Link';
import { RouterProvider } from './RouterProvider';

const meta = preview.meta({
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
    useHref: {
      control: false,
      description:
        'Rewrites the href that links render, for example to prepend a router base path. The unprefixed path is still what `navigate` receives.',
      table: {
        type: { summary: '(href: string) => string' },
        defaultValue: { summary: 'href => href' },
      },
    },
  },
  args: {},
});

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

export const Basic = meta.story({
  render: () => {
    const [url, setUrl] = useState<string>('/FoR');
    return (
      <>
        <RouterProvider navigate={setUrl}>
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
});

/**
 * `useHref` prefixes the rendered href, while `navigate` still receives the
 * unprefixed path.
 */
// No snapshot: the whole point of this story is an `href` attribute value, and
// `/base/start` renders the same pixels as `/start`. The rendering itself is
// two default `Link`s, already captured by `Link.Basic`. The behaviour is
// covered by the unit tests in `Sidebar.test.tsx` and `SidebarRail.test.tsx`.
export const WithBasePath = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => {
    const [navigated, setNavigated] = useState<string>('/start');
    return (
      <>
        <RouterProvider
          navigate={setNavigated}
          useHref={href => `/base${href}`}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <Link href="/start">Start</Link>
            <Link href="/reports">Reports</Link>
          </div>
        </RouterProvider>
        <pre>
          <strong>Path passed to navigate</strong> {navigated}
        </pre>
      </>
    );
  },
});
