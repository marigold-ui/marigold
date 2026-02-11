import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Form } from './Form';

test('renders form element', () => {
  const { container } = render(
    <Form>
      <div>Form content</div>
    </Form>
  );

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const form = container.querySelector('form');
  expect(form).toBeInTheDocument();
});

test('forwards ref to form element', () => {
  const ref = createRef<HTMLFormElement>();

  render(
    <Form ref={ref}>
      <div>Form content</div>
    </Form>
  );

  expect(ref.current).toBeInstanceOf(HTMLFormElement);
  expect(ref.current?.tagName).toBe('FORM');
});

test('ref can access form methods', () => {
  const ref = createRef<HTMLFormElement>();

  render(
    <Form ref={ref} data-testid="test-form">
      <div>Form content</div>
    </Form>
  );

  const form = screen.getByTestId('test-form');
  expect(ref.current).toBe(form);
  expect(typeof ref.current?.reset).toBe('function');
  expect(typeof ref.current?.requestSubmit).toBe('function');
});

test('applies maxWidth styling', () => {
  render(
    <Form maxWidth={48} data-testid="form">
      <div>Form content</div>
    </Form>
  );

  const form = screen.getByTestId('form');
  expect(form).toHaveClass('max-w-48');
});

test('applies unstyled prop', () => {
  render(
    <Form unstyled data-testid="form">
      <div>Form content</div>
    </Form>
  );

  const form = screen.getByTestId('form');
  expect(form).toHaveClass('contents');
});

test('supports action prop', () => {
  render(
    <Form action="/submit" data-testid="form">
      <div>Form content</div>
    </Form>
  );

  const form = screen.getByTestId('form');
  expect(form).toHaveAttribute('action', '/submit');
});

test('supports onSubmit handler', () => {
  const handleSubmit = vi.fn(e => e.preventDefault());

  render(
    <Form onSubmit={handleSubmit} data-testid="form">
      <div>Form content</div>
    </Form>
  );

  const form = screen.getByTestId('form');
  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

  expect(handleSubmit).toHaveBeenCalled();
});
