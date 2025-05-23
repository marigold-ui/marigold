import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { DropIndicator, useDragAndDrop } from 'react-aria-components';
import { vi } from 'vitest';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { SelectList } from './SelectList';

const theme: Theme = {
  name: 'test',
  components: {
    ListBox: {
      container: cva('border-border-light'),
      list: cva('outline-hidden'),
      item: cva('p-3 outline-hidden'),
      section: cva('border outline-hidden'),
      header: cva('[&_header]:text-text-accent'),
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

describe('SelectList', () => {
  test('support DOM props', () => {
    render(
      <ThemeProvider theme={theme}>
        <SelectList aria-label="Test" data-foo="bar">
          <SelectList.Item data-bar="foo" id="cat" textValue="Cat">
            Cat
          </SelectList.Item>
          <SelectList.Item data-bar="foo" id="dog" textValue="Dog">
            Dog
          </SelectList.Item>
          <SelectList.Item data-bar="foo" id="kangaroo" textValue="Kangaroo">
            Kangaroo
          </SelectList.Item>
        </SelectList>
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
        <SelectList aria-label="Test" slot="test">
          <SelectList.Item id="dog" textValue="Dog">
            {' '}
            Dog
          </SelectList.Item>
          <SelectList.Item id="kangaroo" textValue="Kangaroo">
            {' '}
            Kangaroo
          </SelectList.Item>
        </SelectList>
      </ThemeProvider>
    );
    let grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('slot', 'test');
  });

  test('support refs', () => {
    const SelectListRef = createRef();
    let itemRef = createRef();
    render(
      <ThemeProvider theme={theme}>
        <SelectList aria-label="Test" ref={SelectListRef as any}>
          <SelectList.Item ref={itemRef as any} id="dog" textValue="Dog">
            {' '}
            Dog
          </SelectList.Item>
        </SelectList>
      </ThemeProvider>
    );
    expect(SelectListRef.current).toBeInstanceOf(HTMLElement);
    expect(itemRef.current).toBeInstanceOf(HTMLElement);
  });

  test('should support hover', async () => {
    render(
      <ThemeProvider theme={theme}>
        <SelectList aria-label="Test">
          <SelectList.Item id="dog" textValue="Dog">
            {' '}
            Dog
          </SelectList.Item>
        </SelectList>
      </ThemeProvider>
    );

    let row = screen.getAllByRole('row')[0];

    expect(row).not.toHaveAttribute('data-hovered');
    expect(row).not.toHaveClass('hover');

    await userEvent.hover(row);

    setTimeout(() => {
      expect(row).toHaveAttribute('data-hovered', 'true');
      expect(row).toHaveClass('hover');
    }, 1000);

    await userEvent.unhover(row);

    expect(row).not.toHaveAttribute('data-hovered');
    expect(row).not.toHaveClass('hover');
  });

  test('should support focus ring-3', async () => {
    render(
      <ThemeProvider theme={theme}>
        <SelectList aria-label="Test">
          <SelectList.Item id="dog" textValue="Dog">
            {' '}
            Dog
          </SelectList.Item>
        </SelectList>
      </ThemeProvider>
    );
    let row = screen.getAllByRole('row')[0];

    expect(row).not.toHaveAttribute('data-focus-visible');
    expect(row).not.toHaveClass('focus');

    await userEvent.tab();
    /* eslint-disable testing-library/no-node-access */
    expect(document.activeElement).toBe(row);
    expect(row).toHaveAttribute('data-focus-visible', 'true');

    await userEvent.tab();
    expect(row).not.toHaveAttribute('data-focus-visible');
  });

  test('support rendering drop indicators', () => {
    const DraggableSelectList = (props: any) => {
      const { dragAndDropHooks } = useDragAndDrop({
        getItems: keys => [...keys].map(key => ({ 'text/plain': key }) as any),
        ...props,
      });

      return (
        <ThemeProvider theme={theme}>
          <SelectList aria-label="Test" dragAndDropHooks={dragAndDropHooks}>
            <SelectList.Item id="cat" textValue="Cat">
              <Button data-testid="dragButton" slot="drag">
                ≡
              </Button>
              <Checkbox slot="selection" /> Cat
            </SelectList.Item>
            <SelectList.Item id="dog" textValue="Dog">
              <Button slot="drag">≡</Button>
              <Checkbox slot="selection" /> Dog
            </SelectList.Item>
            <SelectList.Item id="kangaroo" textValue="Kangaroo">
              <Button slot="drag">≡</Button>
              <Checkbox slot="selection" /> Kangaroo
            </SelectList.Item>
          </SelectList>
        </ThemeProvider>
      );
    };

    const onReorder = vi.fn();

    render(
      <DraggableSelectList
        onReorder={onReorder}
        renderDropIndicator={(target: any) => (
          <DropIndicator target={target}>test</DropIndicator>
        )}
      />
    );

    act(() => vi.useFakeTimers());
    const button = screen.getAllByRole('button')[0];
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyUp(button, { key: 'Enter' });
    act(() => vi.runAllTimers());

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
