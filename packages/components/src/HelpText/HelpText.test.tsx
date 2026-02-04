import { screen } from '@testing-library/react';
import { Input, Label, TextField } from 'react-aria-components';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { HelpText } from './HelpText';

const theme: Theme = {
  name: 'test',
  components: {
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
      icon: cva({ base: 'size-3' }),
    },
  },
};

const { render } = setup({ theme });

test('render nothing', async () => {
  render(<HelpText data-testid="help-text" />);

  const element = screen.queryByTestId('help-text');
  expect(element).not.toBeInTheDocument();
});

test('render description', () => {
  render(<HelpText description="This is a help text description" />);

  const element = screen.getByText('This is a help text description');
  expect(element).toBeInTheDocument();
});

test('render description even if error message is defined', () => {
  render(
    <HelpText
      description="This is a help text description"
      errorMessage="Something went wrong"
    />
  );

  const element = screen.getByText('This is a help text description');
  expect(element).toBeInTheDocument();

  const error = screen.queryByText('Something went wrong');
  expect(error).not.toBeInTheDocument();
});

test('uses description base styles', () => {
  render(
    <HelpText
      data-testid="help-text"
      description="This is a help text description"
    />
  );

  const element = screen.getByText('This is a help text description');
  expect(element).toBeInTheDocument();
});

test('show error message when control is invalid', () => {
  render(
    <TextField isInvalid>
      <Label>Name</Label>
      <Input />
      <HelpText errorMessage="This can't be right" />
    </TextField>
  );

  const element = screen.getByText("This can't be right");
  expect(element).toBeInTheDocument();
});

test('show multiple error message when control is invalid', () => {
  render(
    <TextField isInvalid>
      <Label>Name</Label>
      <Input />
      <HelpText
        errorMessage={["This can't be right", 'Oh god, no! What did you do!?']}
      />
    </TextField>
  );

  expect(screen.getByText("This can't be right")).toBeInTheDocument();
  expect(screen.getByText('Oh god, no! What did you do!?')).toBeInTheDocument();
});
