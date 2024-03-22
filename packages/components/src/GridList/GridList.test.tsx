import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { createRef } from 'react';
import { useDragAndDrop } from 'react-aria-components';
import { DropIndicator } from 'react-aria-components';
import { act } from 'react-dom/test-utils';

import { Theme, ThemeProvider, cva } from '@marigold/system';

import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { GridList } from './GridList';

const theme: Theme = {
  name: 'test',
  components: {
    ListBox: {
      container: cva('border-border-light'),
      list: cva('outline-none'),
      option: cva('p-3 outline-none'),
      section: cva('border outline-none'),
      sectionTitle: cva('[&_header]:text-text-accent'),
    },
    Button: cva('bg-green-300'),
    Checkbox: {
      checkbox: cva('bg-red-300'),
      container: cva('flex'),
      label: cva('text-black-300'),
      group: cva('flex'),
    },
  },
};

describe('GridList', () => {
  beforeAll(() => {
    jest.useRealTimers();
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });
  let user: UserEvent;
  beforeAll(() => {
    user = userEvent.setup({ delay: null });
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runAllTimers();
    });
  });

  test('render with defautl classes', () => {
    render(
      <ThemeProvider theme={theme}>
        <GridList aria-label="Test">
          <GridList.Item id="cat" textValue="Cat">
            Cat
          </GridList.Item>
          <GridList.Item id="dog" textValue="Dog">
            Dog
          </GridList.Item>
          <GridList.Item id="kangaroo" textValue="Kangaroo">
            Kangaroo
          </GridList.Item>
        </GridList>
      </ThemeProvider>
    );
  });

  test('support DOM props', () => {
    render(
      <ThemeProvider theme={theme}>
        <GridList aria-label="Test" data-foo="bar">
          <GridList.Item data-bar="foo" id="cat" textValue="Cat">
            Cat
          </GridList.Item>
          <GridList.Item data-bar="foo" id="dog" textValue="Dog">
            Dog
          </GridList.Item>
          <GridList.Item data-bar="foo" id="kangaroo" textValue="Kangaroo">
            Kangaroo
          </GridList.Item>
        </GridList>
      </ThemeProvider>
    );
    let grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('data-foo', 'bar');

    for (let row of screen.getAllByRole('row')) {
      expect(row).toHaveAttribute('data-bar', 'foo');
    }
  });

  test('support slot', () => {
    render(
      <ThemeProvider theme={theme}>
        <GridList aria-label="Test" slot="test">
          <GridList.Item id="dog" textValue="Dog">
            {' '}
            Dog
          </GridList.Item>
          <GridList.Item id="kangaroo" textValue="Kangaroo">
            {' '}
            Kangaroo
          </GridList.Item>
        </GridList>
      </ThemeProvider>
    );
    let grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('slot', 'test');
  });

  test('support refs', () => {
    const gridListRef = createRef();
    let itemRef = createRef();
    render(
      <ThemeProvider theme={theme}>
        <GridList aria-label="Test" ref={gridListRef as any}>
          <GridList.Item ref={itemRef as any} id="dog" textValue="Dog">
            {' '}
            Dog
          </GridList.Item>
        </GridList>
      </ThemeProvider>
    );
    expect(gridListRef.current).toBeInstanceOf(HTMLElement);
    expect(itemRef.current).toBeInstanceOf(HTMLElement);
  });

  test('should support hover', async () => {
    render(
      <ThemeProvider theme={theme}>
        <GridList aria-label="Test">
          <GridList.Item id="dog" textValue="Dog">
            {' '}
            Dog
          </GridList.Item>
        </GridList>
      </ThemeProvider>
    );

    let row = screen.getAllByRole('row')[0];

    expect(row).not.toHaveAttribute('data-hovered');
    expect(row).not.toHaveClass('hover');
    await user.hover(row);

    setTimeout(() => {
      expect(row).toHaveAttribute('data-hovered', 'true');
      expect(row).toHaveClass('hover');
    }, 0);

    await user.unhover(row);

    expect(row).not.toHaveAttribute('data-hovered');
    expect(row).not.toHaveClass('hover');
  });

  test('should support focus ring', async () => {
    render(
      <ThemeProvider theme={theme}>
        <GridList aria-label="Test">
          <GridList.Item id="dog" textValue="Dog">
            {' '}
            Dog
          </GridList.Item>
        </GridList>
      </ThemeProvider>
    );
    let row = screen.getAllByRole('row')[0];

    expect(row).not.toHaveAttribute('data-focus-visible');
    expect(row).not.toHaveClass('focus');

    await user.tab();
    /* eslint-disable testing-library/no-node-access */
    expect(document.activeElement).toBe(row);
    expect(row).toHaveAttribute('data-focus-visible', 'true');

    await user.tab();
    expect(row).not.toHaveAttribute('data-focus-visible');
  });

  test('support rendering drop indicators', () => {
    const DraggableGridList = (props: any) => {
      const { dragAndDropHooks } = useDragAndDrop({
        getItems: keys => [...keys].map(key => ({ 'text/plain': key }) as any),
        ...props,
      });

      return (
        <ThemeProvider theme={theme}>
          <GridList aria-label="Test" dragAndDropHooks={dragAndDropHooks}>
            <GridList.Item id="cat" textValue="Cat">
              <Button data-testid="dragButton" slot="drag">
                ≡
              </Button>
              <Checkbox slot="selection" /> Cat
            </GridList.Item>
            <GridList.Item id="dog" textValue="Dog">
              <Button slot="drag">≡</Button>
              <Checkbox slot="selection" /> Dog
            </GridList.Item>
            <GridList.Item id="kangaroo" textValue="Kangaroo">
              <Button slot="drag">≡</Button>
              <Checkbox slot="selection" /> Kangaroo
            </GridList.Item>
          </GridList>
        </ThemeProvider>
      );
    };

    const onReorder = jest.fn();

    render(
      <DraggableGridList
        onReorder={onReorder}
        renderDropIndicator={(target: any) => (
          <DropIndicator target={target}>test</DropIndicator>
        )}
      />
    );
    // const button = screen.getByTestId('dragButton');
    const button = screen.getAllByRole('button')[0];
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyUp(button, { key: 'Enter' });
    act(() => jest.runAllTimers());

    const rows = screen.getAllByRole('row');

    expect(rows).toHaveLength(5);
    expect(rows[0]).toHaveAttribute('class', 'react-aria-DropIndicator');
    expect(rows[0]).toHaveAttribute('data-drop-target', 'true');
    expect(rows[0]).toHaveTextContent('test');
    expect(within(rows[0]).getByRole('button')).toHaveAttribute(
      'aria-label',
      'Insert before Cat'
    );
    expect(rows[2]).toHaveAttribute('class', 'react-aria-DropIndicator');
    expect(rows[2]).not.toHaveAttribute('data-drop-target');
    expect(within(rows[2]).getByRole('button')).toHaveAttribute(
      'aria-label',
      'Insert between Cat and Dog'
    );
    expect(rows[3]).toHaveAttribute('class', 'react-aria-DropIndicator');
    expect(rows[3]).not.toHaveAttribute('data-drop-target');
    expect(within(rows[3]).getByRole('button')).toHaveAttribute(
      'aria-label',
      'Insert between Dog and Kangaroo'
    );
    expect(rows[4]).toHaveAttribute('class', 'react-aria-DropIndicator');
    expect(rows[4]).not.toHaveAttribute('data-drop-target');
    expect(within(rows[4]).getByRole('button')).toHaveAttribute(
      'aria-label',
      'Insert after Kangaroo'
    );
  });
});
