import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, test } from 'vitest';
import { parseFormData } from './form.utils';

describe('parseFormData', () => {
  test('parses single input value', async () => {
    let result: any;
    const user = userEvent.setup();

    render(
      <form
        data-testid="form"
        onSubmit={e => {
          e.preventDefault();
          result = parseFormData(e);
        }}
      >
        <input name="username" defaultValue="john" />
        <button type="submit">Submit</button>
      </form>
    );

    const button = screen.getByRole('button', { name: /submit/i });
    await user.click(button);

    expect(result).toEqual({ username: 'john' });
  });

  test('parses multiple inputs with different names', async () => {
    let result: any;
    const user = userEvent.setup();

    render(
      <form
        data-testid="form"
        onSubmit={e => {
          e.preventDefault();
          result = parseFormData(e);
        }}
      >
        <input name="email" defaultValue="test@example.com" />
        <input name="age" defaultValue="30" />
        <button type="submit">Submit</button>
      </form>
    );
    const button = screen.getByRole('button', { name: /submit/i });
    await user.click(button);

    expect(result).toEqual({ email: 'test@example.com', age: '30' });
  });

  test('parses multiple inputs with same name (checkboxes)', async () => {
    let result: any;
    const user = userEvent.setup();

    render(
      <form
        data-testid="form"
        onSubmit={e => {
          e.preventDefault();
          result = parseFormData(e);
        }}
      >
        <input type="checkbox" name="colors" value="red" defaultChecked />
        <input type="checkbox" name="colors" value="blue" defaultChecked />
        <button type="submit">Submit</button>
      </form>
    );
    const button = screen.getByRole('button', { name: /submit/i });
    await user.click(button);

    expect(result).toEqual({ colors: ['red', 'blue'] });
  });

  test.only('parses file input', async () => {
    let result: any;
    const user = userEvent.setup();
    const file = new File(['dummy content'], 'avatar.png', {
      type: 'image/png',
    });

    render(
      <form
        data-testid="form"
        onSubmit={e => {
          e.preventDefault();
          result = parseFormData(e);
        }}
      >
        <input type="file" name="avatar" data-testid="file-input" />
        <button type="submit">Submit</button>
      </form>
    );
    const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
    await user.upload(fileInput, file);

    const button = screen.getByRole('button', { name: /submit/i });
    await user.click(button);

    expect(result.avatar).toBeInstanceOf(File);
    expect((result.avatar as File).name).toBe('avatar.png');
  });

  test('returns array for multiple values and single value for one', async () => {
    let result: any;
    const user = userEvent.setup();

    render(
      <form
        data-testid="form"
        onSubmit={e => {
          e.preventDefault();
          result = parseFormData(e);
        }}
      >
        <input name="hobby" defaultValue="reading" />
        <input name="hobby" defaultValue="coding" />
        <button type="submit">Submit</button>
      </form>
    );
    const button = screen.getByRole('button', { name: /submit/i });
    await user.click(button);

    expect(result.hobby).toEqual(['reading', 'coding']);
  });

  test('returns empty object for empty form', async () => {
    let result: any;
    const user = userEvent.setup();

    render(
      <form
        data-testid="form"
        onSubmit={e => {
          e.preventDefault();
          result = parseFormData(e);
        }}
      >
        <button type="submit">Submit</button>
      </form>
    );
    const button = screen.getByRole('button', { name: /submit/i });
    await user.click(button);

    expect(result).toEqual({});
  });
});
