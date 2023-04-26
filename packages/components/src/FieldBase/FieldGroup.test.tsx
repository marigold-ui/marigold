import React from 'react';
import { render, screen } from '@testing-library/react';

import { FieldBase } from './FieldBase';
import { FieldGroup } from './FieldGroup';

test('renders FieldGroup', () => {
  render(
    <FieldGroup>
      <FieldBase label="Label" description="Description">
        <input type="text" />
      </FieldBase>
    </FieldGroup>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const group = screen.getByText('Label').parentElement;
  expect(group).toBeInTheDocument();
});

test('renders FieldGroup by default without label width', () => {
  render(
    <FieldGroup>
      <FieldBase label="Label" description="Description">
        <input type="text" />
      </FieldBase>
    </FieldGroup>
  );

  const label = screen.getByText('Label');
  expect(label).not.toHaveAttribute('labelWidth');
});

test('renders FieldGroup  with label width', () => {
  render(
    <FieldGroup labelWidth="20px">
      <FieldBase label="Label" description="Description">
        <input type="text" />
      </FieldBase>
    </FieldGroup>
  );

  const label = screen.getByText('Label');
  expect(label).toMatchInlineSnapshot(`
    <label
      class="flex w-[var(--labelWidth)]"
      style="--labelWidth: 20px;"
    >
      Label
    </label>
  `);
});

test('renders FieldGroups children', () => {
  render(
    <FieldGroup labelWidth="20px">
      <FieldBase label="Label" description="Description">
        <input type="text" />
      </FieldBase>
    </FieldGroup>
  );

  expect(screen.getByText('Label')).toBeInTheDocument();
  expect(screen.getByText('Description')).toBeInTheDocument();
});
