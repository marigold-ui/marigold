import { screen } from '@testing-library/react';
import { createRef } from 'react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { Radio } from './Radio';

const theme: Theme = {
  name: 'test',
  components: {
    Field: cva({}),
    Label: cva({}),
    HelpText: {
      container: cva({
        base: '',
        variants: {
          variant: {
            lime: 'text-lime-600',
          },
          size: {
            small: 'p-2',
          },
        },
      }),
      icon: cva({ base: '' }),
    },
    Radio: {
      container: cva({
        base: '',
        variants: {
          variant: {
            green: 'text-green-800',
          },
          size: {
            large: 'p-9',
          },
        },
      }),
      radio: cva({ base: 'rounded-xs border-solid checked:text-blue-700' }),
      label: cva({ base: 'text-base' }),
      group: cva({}),
    },
  },
};

const { render } = setup({ theme });

// Tests
// ---------------
test('takes full width by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1">
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );

  const containerOne = screen.getByTestId('radio-1');
  expect(containerOne).toHaveClass(`w-full`);
});

test('set width via prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1" width="200px">
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );

  const containerOne = screen.getByTestId('radio-1');
  expect(containerOne).toHaveClass(`200px`);
});

test('forwards ref', () => {
  const ref = createRef<HTMLLabelElement>();
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1" ref={ref}>
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );

  expect(ref.current).toBeInstanceOf(HTMLLabelElement);
});

test('radio accepts helptext', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label" description="This is my Helptext.">
        <Radio value="1" data-testid="radio-1">
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );
  expect(screen.getByText('This is my Helptext.')).toBeInTheDocument();
});

test('radio accepts error message', () => {
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group
        label="With Label"
        error
        errorMessage="This is my error message"
      >
        <Radio value="1" data-testid="radio-1">
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );
  expect(screen.getByText('This is my error message')).toBeInTheDocument();
});

test('disabled prop and styles', () => {
  const ref = createRef<HTMLLabelElement>();
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label">
        <Radio value="1" data-testid="radio-1" ref={ref} disabled>
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );

  const radio1 = screen.getByTestId('radio-1');

  expect(radio1).toHaveAttribute('data-disabled');
  expect(radio1.className).toMatchInlineSnapshot(
    `"group/radio relative flex items-center gap-[1ch] w-full"`
  );
});

test('radio group can be horizontal', () => {
  const ref = createRef<HTMLLabelElement>();
  render(
    <ThemeProvider theme={theme}>
      <Radio.Group label="With Label" orientation="horizontal">
        <Radio value="1" data-testid="radio-1" ref={ref} disabled>
          Option 1
        </Radio>
        <Radio value="2" data-testid="radio-2">
          Option 2
        </Radio>
      </Radio.Group>
    </ThemeProvider>
  );

  const group = screen.getByTestId('group');

  expect(group.className).toMatchInlineSnapshot(
    `"flex items-start flex-row gap-[1.5ch]"`
  );
});
