import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { SelectList } from './SelectList';

// Configure userEvent with pointer events support
const user = userEvent.setup({ pointerEventsCheck: 0 });

const theme: Theme = {
  name: 'test',
  components: {
    ListBox: {
      container: cva({ base: 'border-border-light' }),
      list: cva({ base: 'outline-hidden' }),
      item: cva({ base: 'p-3 outline-hidden' }),
      section: cva({ base: 'border outline-hidden' }),
      header: cva({ base: '[&_header]:text-text-accent' }),
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

    await user.tab();
    /* eslint-disable testing-library/no-node-access */
    expect(document.activeElement).toBe(row);
    expect(row).toHaveAttribute('data-focus-visible', 'true');

    await user.tab();
    expect(row).not.toHaveAttribute('data-focus-visible');
  });
});
