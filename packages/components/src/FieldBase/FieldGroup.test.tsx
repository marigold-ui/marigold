import { screen } from '@testing-library/react';
import React from 'react';

import { Theme, cva } from '@marigold/system';

import { setup } from '../test.utils';
import { FieldBase } from './FieldBase';
import { FieldGroup } from './FieldGroup';

const theme: Theme = {
  name: 'test',
  components: {
    Field: cva(),
    Label: {
      container: cva(),
      indicator: cva(),
    },
    HelpText: {
      container: cva(),
      icon: cva(),
    },
  },
};

const { render } = setup({ theme });

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
  expect(label.className).toMatchInlineSnapshot(`"flex w-[var(--labelWidth)]"`);
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
