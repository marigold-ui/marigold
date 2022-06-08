import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@marigold/system';

import { TextArea } from './TextArea';

const theme = {
  colors: {
    blue: '#00f',
    lime: '#82c91e',
  },
  fontSizes: {
    'small-1': 12,
  },
  sizes: {
    none: 0,
    large: 60,
  },
  components: {
    Label: {
      variant: {
        lime: {
          color: 'lime',
        },
      },
      size: {
        small: {
          fontSize: 'small-1',
        },
      },
    },
    HelpText: {
      variant: {
        lime: {
          container: {
            color: 'lime',
          },
        },
      },
      size: {
        small: {
          container: {
            fontSize: 'small-1',
          },
        },
      },
    },
    TextArea: {
      base: {
        borderColor: 'blue',
      },
      variant: {
        lime: {
          color: 'lime',
        },
      },
      size: {
        small: {
          fontSize: 'small-1',
        },
      },
    },
  },
};

test('renders an textarea', () => {
  render(<TextArea label="Label" data-testid="textarea" />);

  const textArea = screen.getByTestId('textarea');
  expect(textArea).toBeInTheDocument();
  expect(textArea instanceof HTMLTextAreaElement).toBeTruthy();
});

test('textarea can be styled via "TextArea" styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <TextArea label="Label" data-testid="text-area" />
    </ThemeProvider>
  );
  const textArea = screen.getByTestId('text-area');
  expect(textArea).toHaveStyle(`border-color: ${theme.colors.blue}`);
});

test('passes down variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <TextArea
        data-testid="text-area"
        label="Label"
        description="Description"
        variant="lime"
        size="small"
      />
    </ThemeProvider>
  );

  const textArea = screen.getByTestId('text-area');
  expect(textArea).toHaveStyle(`color: ${theme.colors.lime}`);
  expect(textArea).toHaveStyle(`font-size: ${theme.fontSizes['small-1']}px`);

  const label = screen.getByText('Label');
  expect(label).toHaveStyle(`color: ${theme.colors.lime}`);
  expect(label).toHaveStyle(`font-size: ${theme.fontSizes['small-1']}px`);

  const description = screen.getByText('Description');
  expect(description).toHaveStyle(`color: ${theme.colors.lime}`);
  expect(description).toHaveStyle(`font-size: ${theme.fontSizes['small-1']}px`);
});

test('takes full width by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <TextArea data-testid="text-area" label="Label" />
    </ThemeProvider>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  expect(container).toHaveStyle('width: 100%');
});

test('allows to set custom width', () => {
  render(
    <ThemeProvider theme={theme}>
      <TextArea data-testid="text-area" label="Label" width="large" />
    </ThemeProvider>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const container = screen.getByText('Label').parentElement;
  expect(container).toHaveStyle(`width: ${theme.sizes.large}px`);
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

test('can be controlled', () => {
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

  userEvent.type(screen.getByTestId('textarea'), 'Hello there!');
  expect(screen.getByTestId('output')).toHaveTextContent('Hello there!');
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLTextAreaElement>();
  render(
    <ThemeProvider theme={theme}>
      <TextArea data-testid="text-area" label="A Label" ref={ref} />
    </ThemeProvider>
  );

  expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
});
