import { render, screen } from '@testing-library/react';
import { Input, Label, TextField } from 'react-aria-components';
import { Basic } from './HelpText.stories';

test('render nothing when no props provided', async () => {
  render(<Basic.Component description={undefined} errorMessage={undefined} />);

  // HelpText should render nothing when no description or errorMessage
  expect(screen.queryByText(/./)).toBeNull();
});

test('render description', () => {
  render(<Basic.Component description="This is a help text description" />);

  const element = screen.getByText('This is a help text description');
  expect(element).toBeInTheDocument();
});

test('render description even if error message is defined', () => {
  render(
    <Basic.Component
      description="This is a help text description"
      errorMessage="Something went wrong"
    />
  );

  const element = screen.getByText('This is a help text description');
  expect(element).toBeInTheDocument();

  const error = screen.queryByText('Something went wrong');
  expect(error).not.toBeInTheDocument();
});

test('show error message when control is invalid', () => {
  render(
    <TextField isInvalid>
      <Label>Name</Label>
      <Input />
      <Basic.Component errorMessage="This can't be right" />
    </TextField>
  );

  const element = screen.getByText("This can't be right");
  expect(element).toBeInTheDocument();
});

test('show multiple error messages when control is invalid', () => {
  render(
    <TextField isInvalid>
      <Label>Name</Label>
      <Input />
      <Basic.Component
        errorMessage={["This can't be right", 'Oh god, no! What did you do!?']}
      />
    </TextField>
  );

  expect(screen.getByText("This can't be right")).toBeInTheDocument();
  expect(screen.getByText('Oh god, no! What did you do!?')).toBeInTheDocument();
});
