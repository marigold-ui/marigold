import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { Theme } from '@marigold/system';
import { Tabs } from './Tabs';
import { cva } from 'class-variance-authority';
import { setup } from '../test.utils';

const theme: Theme = {
  name: 'tabs test',
  components: {
    Tabs: {
      tabs: cva('mb-[10px]'),
      tab: cva(
        [
          'min-h-[40px]',
          'data-[hover]:text-tabs-tab-text data-[hover]:border-b-tabs-tab-hover data-[hover]:border-b-8 data-[hover]:border-solid',
          'mg-disabled:text-tabs-tab-disabled',
          'mg-selected:border-b-primary-600 mg-selected:border-b-8 mg-selected:border-solid ',
        ],
        {
          variants: {
            size: {
              small: 'pb-1 px-1',
              medium: 'pb-2 px-2 text-lg',
              large: 'pb-4 px-4 text-2xl',
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
    `"mg-disabled:cursor-not-allowed flex cursor-pointer justify-center min-h-[40px] data-[hover]:text-tabs-tab-text data-[hover]:border-b-tabs-tab-hover data-[hover]:border-b-8 data-[hover]:border-solid mg-disabled:text-tabs-tab-disabled mg-selected:border-b-primary-600 mg-selected:border-b-8 mg-selected:border-solid pb-2 px-2 text-lg"`
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

test('cursor indicates interactivity', () => {
  render(
    <Tabs disabledKeys={['2']}>
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
    `"mg-disabled:cursor-not-allowed flex cursor-pointer justify-center min-h-[40px] data-[hover]:text-tabs-tab-text data-[hover]:border-b-tabs-tab-hover data-[hover]:border-b-8 data-[hover]:border-solid mg-disabled:text-tabs-tab-disabled mg-selected:border-b-primary-600 mg-selected:border-b-8 mg-selected:border-solid pb-2 px-2 text-lg"`
  );
  expect(tabs[1].className).toMatchInlineSnapshot(
    `"mg-disabled:cursor-not-allowed flex cursor-pointer justify-center min-h-[40px] data-[hover]:text-tabs-tab-text data-[hover]:border-b-tabs-tab-hover data-[hover]:border-b-8 data-[hover]:border-solid mg-disabled:text-tabs-tab-disabled mg-selected:border-b-primary-600 mg-selected:border-b-8 mg-selected:border-solid pb-2 px-2 text-lg"`
  );
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
    `"mg-disabled:cursor-not-allowed flex cursor-pointer justify-center min-h-[40px] data-[hover]:text-tabs-tab-text data-[hover]:border-b-tabs-tab-hover data-[hover]:border-b-8 data-[hover]:border-solid mg-disabled:text-tabs-tab-disabled mg-selected:border-b-primary-600 mg-selected:border-b-8 mg-selected:border-solid pb-2 px-2 text-lg"`
  );
  expect(screen.getByText('tab-2 content')).toBeVisible();
});
