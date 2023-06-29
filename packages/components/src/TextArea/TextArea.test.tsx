import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Theme, cva } from '@marigold/system';

import { TextArea } from './TextArea';
import { setup } from '../test.utils';

const theme = {
  name: 'test',
  components: {
    Field: cva(''),
    Label: {
      container: cva('', {
        variants: {
          variant: { lime: 'text-lime-500' },
          size: { small: 'text-sm' },
        },
      }),
      indicator: cva(),
    },
    HelpText: {
      container: cva('', {
        variants: {
          variant: {
            lime: 'text-lime-600',
          },
          size: {
            small: 'text-sm',
          },
        },
      }),
      icon: cva(''),
    },
    TextArea: cva('text-blue-500', {
      variants: {
        variant: { lime: 'text-lime-500' },
        size: { small: 'text-sm' },
      },
    }),
  },
} satisfies Theme;

const user = userEvent.setup();
const { render } = setup({ theme });

test('renders an textarea', () => {
  render(<TextArea label="Label" data-testid="textarea" />);

  const textArea = screen.getByTestId('textarea');
  expect(textArea).toBeInTheDocument();
  expect(textArea instanceof HTMLTextAreaElement).toBeTruthy();
});

test('textarea can be styled via "TextArea" styles', () => {
  render(<TextArea label="Label" data-testid="text-area" />);
  const textArea = screen.getByTestId('text-area');
  expect(textArea.className).toMatchInlineSnapshot(`"text-blue-500"`);
});

test('passes down variant and size', () => {
  render(
    <TextArea
      data-testid="text-area"
      label="Label"
      description="Description"
      variant="lime"
      size="small"
    />
  );

  const textArea = screen.getByTestId('text-area');
  expect(textArea.className).toMatchInlineSnapshot(`"text-lime-500 text-sm"`);

  const label = screen.getByText('Label');
  expect(label.className).toMatchInlineSnapshot(
    `"text-lime-500 text-sm flex w-[var(--labelWidth)]"`
  );

  const description = screen.getByText('Description');
  expect(description.className).toMatchInlineSnapshot(
    `"flex items-center gap-1 text-lime-600 text-sm"`
  );
});

test('supports disabled', () => {
  render(<TextArea label="A Label" disabled data-testid="textarea" />);

  const textArea = screen.getByTestId('textarea');
  expect(textArea).toBeDisabled();
});

test('supports required', () => {
  render(<TextArea label="A Label" required data-testid="textarea" />);

  const textArea = screen.getByTestId('textarea');
  /** Note that the required attribute is not passed down! */
  expect(textArea).toHaveAttribute('aria-required', 'true');
});

test('supports readonly', () => {
  render(<TextArea label="A Label" readOnly data-testid="textarea" />);

  const textArea = screen.getByTestId('textarea');
  expect(textArea).toHaveAttribute('readonly');
});

test('supports field structure', () => {
  render(
    <TextArea
      label="A Label"
      description="Some helpful text"
      errorMessage="Whoopsie"
    />
  );

  const label = screen.queryByText('A Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('Some helpful text');
  expect(description).toBeInTheDocument();

  const error = screen.queryByText('Whoopsie');
  expect(error).not.toBeInTheDocument();
});

test('supports field structure (with error)', () => {
  render(
    <TextArea
      label="A Label"
      description="Some helpful text"
      error={true}
      errorMessage="Whoopsie"
    />
  );

  const label = screen.queryByText('A Label');
  expect(label).toBeInTheDocument();

  const description = screen.queryByText('Some helpful text');
  expect(description).not.toBeInTheDocument();

  const error = screen.queryByText('Whoopsie');
  expect(error).toBeInTheDocument();
});

test('correctly sets up aria attributes', () => {
  render(
    <TextArea
      data-testid="textarea"
      label="A Label"
      description="Some helpful text"
      errorMessage="Whoopsie"
    />
  );

  const label = screen.getByText('A Label');
  const textarea = screen.getByTestId('textarea');
  const description = screen.getByText('Some helpful text');

  const htmlFor = label.getAttribute('for');
  const labelId = label.getAttribute('id');
  const inputId = textarea.getAttribute('id');

  expect(label).toHaveAttribute('for', inputId);
  expect(htmlFor).toEqual(inputId);
  expect(textarea).toHaveAttribute('aria-labelledby', labelId);

  expect(textarea).toHaveAttribute(
    'aria-describedby',
    description.getAttribute('id')
  );

  expect(textarea).not.toHaveAttribute('aria-invalid');
  expect(textarea).not.toHaveAttribute('aria-errormessage');
});

test('correctly sets up aria attributes (with error)', () => {
  render(
    <TextArea
      data-testid="textarea"
      label="A Label"
      description="Some helpful text"
      error={true}
      errorMessage="Whoopsie"
    />
  );

  const label = screen.getByText('A Label');
  const textArea = screen.getByTestId('textarea');
  const error = screen.getByText('Whoopsie');

  const htmlFor = label.getAttribute('for');
  const labelId = label.getAttribute('id');
  const inputId = textArea.getAttribute('id');

  expect(label).toHaveAttribute('for', inputId);
  expect(htmlFor).toEqual(inputId);
  expect(textArea).toHaveAttribute('aria-labelledby', labelId);

  expect(textArea).toHaveAttribute(
    'aria-describedby',
    error.getAttribute('id')
  );

  expect(textArea).toHaveAttribute('aria-invalid', 'true');
  expect(textArea).not.toHaveAttribute('aria-errormessage');
});

test('can have default value', () => {
  render(
    <TextArea
      data-testid="textarea"
      label="A Label"
      defaultValue="Default Value"
    />
  );

  const textArea = screen.getByTestId('textarea');
  expect(textArea).toHaveValue('Default Value');
});

test('passes down "rows" attribute', () => {
  render(
    <TextArea
      data-testid="textarea"
      label="A Label"
      defaultValue="Default Value"
      rows={5}
    />
  );

  const textArea = screen.getByTestId('textarea');
  expect(textArea).toHaveAttribute('rows', '5');
});

test('can be controlled', async () => {
  const Controlled = () => {
    const [value, setValue] = React.useState('');
    return (
      <>
        <TextArea data-testid="textarea" label="A Label" onChange={setValue} />
        <span data-testid="output">{value}</span>
      </>
    );
  };

  render(<Controlled />);

  user.type(screen.getByTestId('textarea'), 'Hello there!');
  await waitFor(() => {
    expect(screen.getByTestId('output')).toHaveTextContent('Hello there!');
  });
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLTextAreaElement>();
  render(<TextArea data-testid="text-area" label="A Label" ref={ref} />);

  expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
});
