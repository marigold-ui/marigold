import { fireEvent, screen } from '@testing-library/react';

import { Theme, cva } from '@marigold/system';

import { setup } from '../test.utils';
import { Tabs } from './Tabs';

const theme: Theme = {
  name: 'tabs test',
  components: {
    Tabs: {
      container: cva('flex'),
      tabpanel: cva('border-3 border-solid border-red-400'),
      tabs: cva('mb-[10px]'),
      tab: cva(
        [
          'selected:border-red-500  selected:border-b-8  selected:border-solid ',
        ],
        {
          variants: {
            size: {
              small: 'px-1 pb-1',
              medium: 'px-2 pb-2 text-lg',
              large: 'px-4 pb-4 text-2xl',
            },
          },
        }
      ),
    },
  },
};

const { render } = setup({ theme });

test('rendering content correctly', () => {
  render(
    <Tabs>
      <Tabs.Item title="tab1" key={1}>
        tab-1 content
      </Tabs.Item>
      <Tabs.Item title="tab2" key={2}>
        tab-2 content
      </Tabs.Item>
      <Tabs.Item title="tab3" key={3}>
        tab-3 content
      </Tabs.Item>
    </Tabs>
  );

  // rendering the tab controller
  expect(screen.getByText('tab1')).toBeInTheDocument();
  // rendering tabpanel
  expect(screen.getByText(/tab-1/)).toBeInTheDocument();
});

test('Supporting default size', () => {
  render(
    <Tabs>
      <Tabs.Item key={1} title="tab">
        tab content
      </Tabs.Item>
    </Tabs>
  );
  expect(screen.getByText('tab').className).toMatchInlineSnapshot(
    `"flex cursor-pointer justify-center aria-disabled:cursor-not-allowed selected:border-red-500 selected:border-b-8 selected:border-solid px-2 pb-2 text-lg"`
  );
});

test('supports disabled prop', () => {
  render(
    <Tabs disabledKeys={['2']}>
      <Tabs.Item title="tab1" key={1}>
        tab-1 content
      </Tabs.Item>
      <Tabs.Item title="tab2" key={2}>
        tab-2 content
      </Tabs.Item>
    </Tabs>
  );
  const tab = screen.getByText('tab2');
  expect(tab).toHaveAttribute('aria-disabled');
  fireEvent.click(tab);
  expect(screen.getByText('tab-1 content')).toBeVisible();
});

test('set defaultValue via props in tabs', () => {
  render(
    <Tabs defaultSelectedKey={'2'}>
      <Tabs.Item key={1} title="tab1">
        tab-1 content
      </Tabs.Item>
      <Tabs.Item key={2} title="tab2">
        tab-2 content
      </Tabs.Item>
    </Tabs>
  );
  expect(screen.getByText('tab-2 content')).toBeVisible();
});

test('open tabpanel when its tab controller is clicked', () => {
  render(
    <Tabs>
      <Tabs.Item title="tab1" key="1">
        tab-1 content
      </Tabs.Item>
      <Tabs.Item title="tab2" key="2">
        tab-2 content
      </Tabs.Item>
    </Tabs>
  );
  const tab = screen.getByText('tab2');
  fireEvent.click(tab);
  expect(tab.className).toMatchInlineSnapshot(
    `"flex cursor-pointer justify-center aria-disabled:cursor-not-allowed selected:border-red-500 selected:border-b-8 selected:border-solid px-2 pb-2 text-lg"`
  );
  expect(screen.getByText('tab-2 content')).toBeVisible();
});

test('allows styling "focus" state via theme', () => {
  render(
    <Tabs selectedKey={3} disabledKeys={['2']}>
      <Tabs.Item key="1" title={'tab1'}>
        tab-1 content
      </Tabs.Item>
      <Tabs.Item key="2" title={'tab2'}>
        tab-2 content
      </Tabs.Item>
    </Tabs>
  );
  const tabs = screen.getAllByRole('tab');
  expect(tabs[0].className).toMatchInlineSnapshot(
    `"flex cursor-pointer justify-center aria-disabled:cursor-not-allowed selected:border-red-500 selected:border-b-8 selected:border-solid px-2 pb-2 text-lg"`
  );
  expect(tabs[1].className).toMatchInlineSnapshot(
    `"flex cursor-pointer justify-center aria-disabled:cursor-not-allowed selected:border-red-500 selected:border-b-8 selected:border-solid px-2 pb-2 text-lg"`
  );
});

test('allow styling TabPanel & container via theme', () => {
  render(
    <Tabs aria-label="tabs container" disabledKeys={['2']}>
      <Tabs.Item key="1" title={'tab1'}>
        tab-1 content
      </Tabs.Item>
      <Tabs.Item key="2" title={'tab2'}>
        tab-2 content
      </Tabs.Item>
    </Tabs>
  );
  const tabPanel = screen.getByText('tab-1 content');
  const container = screen.getByLabelText('tabs container');

  expect(container.className).toMatchSnapshot('flex gap-2');

  expect(tabPanel.className).toMatchInlineSnapshot(
    `"border-3 border-solid border-red-400"`
  );
});
