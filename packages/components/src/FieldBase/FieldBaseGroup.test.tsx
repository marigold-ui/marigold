import React from 'react';
import { render, screen } from '@testing-library/react';

import { FieldBase } from './FieldBase';
import { FieldBaseGroup } from './FieldBaseGroup';

test('renders FieldBaseGroup', () => {
  render(
    <FieldBaseGroup>
      <FieldBase label="Label" description="Description">
        <input type="text" />
      </FieldBase>
    </FieldBaseGroup>
  );

  // eslint-disable-next-line testing-library/no-node-access
  const group = screen.getByText('Label').parentElement;
  expect(group).toBeInTheDocument();
});

test('renders FieldBaseGroup by default without label width', () => {
  render(
    <FieldBaseGroup>
      <FieldBase label="Label" description="Description">
        <input type="text" />
      </FieldBase>
    </FieldBaseGroup>
  );

  const label = screen.getByText('Label');
  expect(label).not.toHaveAttribute('labelWidth');
});

test('renders FieldBaseGroup  with label width', () => {
  render(
    <FieldBaseGroup labelWidth="20px">
      <FieldBase label="Label" description="Description">
        <input type="text" />
      </FieldBase>
    </FieldBaseGroup>
  );

  const label = screen.getByText('Label');
  expect(label).toHaveStyle('width: 20px');
});

test('renders FieldBaseGroups children', () => {
  render(
    <FieldBaseGroup labelWidth="20px">
      <FieldBase label="Label" description="Description">
        <input type="text" />
      </FieldBase>
    </FieldBaseGroup>
  );

  expect(screen.getByText('Label')).toBeInTheDocument();
  expect(screen.getByText('Description')).toBeInTheDocument();
});
