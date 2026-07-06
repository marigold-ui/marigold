import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Description } from '../Description/Description';
import { TextValue } from '../TextValue/TextValue';
import { ListBox } from './ListBox';

const meta = preview.meta({
  title: 'Components/ListBox',
  parameters: {
    surface: false,
  },
});

export const Basic = meta.story({
  render: args => (
    <ListBox
      aria-labelledby="listbox"
      selectionMode="single"
      defaultSelectedKeys={['one']}
      {...args}
      disabledKeys={['four']}
    >
      <ListBox.Item id="one">one</ListBox.Item>
      <ListBox.Item id="two">Two</ListBox.Item>
      <ListBox.Item id="three">Three</ListBox.Item>
      <ListBox.Item id="four">Four</ListBox.Item>
    </ListBox>
  ),
});

export const WithDescription = meta.story({
  tags: ['component-test'],
  render: args => (
    <ListBox aria-labelledby="listbox" selectionMode="single" {...args}>
      <ListBox.Item id="public" textValue="Public">
        <TextValue>Public</TextValue>
        <Description>Anyone with the link can view.</Description>
      </ListBox.Item>
      <ListBox.Item id="restricted" textValue="Restricted">
        <TextValue>Restricted</TextValue>
        <Description>Only people you invite can view.</Description>
      </ListBox.Item>
    </ListBox>
  ),
});

WithDescription.test(
  'links each item to its description via aria-describedby',
  {
    parameters: { chromatic: { disableSnapshot: true } },
  },
  async ({ canvas }) => {
    const item = canvas.getByRole('option', { name: /Restricted/ });
    const description = canvas.getByText('Only people you invite can view.');

    expect(description.id).toBeTruthy();
    expect(item.getAttribute('aria-describedby') ?? '').toContain(
      description.id
    );
  }
);

export const WithSections = meta.story({
  render: args => (
    <ListBox aria-labelledby="listbox" selectionMode="single" {...args}>
      <ListBox.Section header="Veggies">
        <ListBox.Item id="lettuce">Lettuce</ListBox.Item>
        <ListBox.Item id="tomato">Tomato</ListBox.Item>
        <ListBox.Item id="onion">Onion</ListBox.Item>
      </ListBox.Section>
      <ListBox.Section header="Protein">
        <ListBox.Item id="ham">Ham</ListBox.Item>
        <ListBox.Item id="tuna">Tuna</ListBox.Item>
        <ListBox.Item id="tofu">Tofu</ListBox.Item>
      </ListBox.Section>
      <ListBox.Section header="Condiments">
        <ListBox.Item id="mayo">Mayonaise</ListBox.Item>
        <ListBox.Item id="mustard">Mustard</ListBox.Item>
        <ListBox.Item id="ranch">Ranch</ListBox.Item>
      </ListBox.Section>
    </ListBox>
  ),
});
