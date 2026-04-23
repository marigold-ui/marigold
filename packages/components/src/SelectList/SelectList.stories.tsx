import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Info } from '../icons/Info';
import { SelectList } from './SelectList';

const meta = preview.meta({
  title: 'Components/SelectList',
  component: SelectList,
  argTypes: {
    selectionMode: {
      control: { type: 'select' },
      options: ['none', 'single', 'multiple'],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'single' },
      },
      description: 'Set selection mode of the select list',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered'],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'default' },
      },
      description: 'Visual variant of the list.',
    },
  },
  args: {
    selectionMode: 'single',
    variant: 'default',
  },
});

export const Basic = meta.story({
  render: args => (
    <SelectList
      {...args}
      aria-labelledby="SelectList"
      defaultSelectedKeys={['one']}
      disabledKeys={['four']}
    >
      <SelectList.Item id="one">One</SelectList.Item>
      <SelectList.Item id="two">Two</SelectList.Item>
      <SelectList.Item id="three">Three</SelectList.Item>
      <SelectList.Item id="four">Four</SelectList.Item>
    </SelectList>
  ),
});

export const WithSingleSelection = meta.story({
  render: args => (
    <SelectList aria-labelledby="SelectList" {...args} selectionMode="single">
      <SelectList.Item id="one">One</SelectList.Item>
      <SelectList.Item id="two">Two</SelectList.Item>
      <SelectList.Item id="three">Three</SelectList.Item>
      <SelectList.Item id="four">Four</SelectList.Item>
    </SelectList>
  ),
});

export const WithMultiSelection = meta.story({
  render: args => (
    <SelectList aria-labelledby="SelectList" {...args} selectionMode="multiple">
      <SelectList.Item id="charizard">Charizard</SelectList.Item>
      <SelectList.Item id="blastoise">Blastoise</SelectList.Item>
      <SelectList.Item id="venusaur">Venusaur</SelectList.Item>
      <SelectList.Item id="pikachu">Pikachu</SelectList.Item>
    </SelectList>
  ),
});

export const WithDescription = meta.story({
  render: args => (
    <SelectList aria-labelledby="SelectList" {...args}>
      <SelectList.Item id="free" textValue="Free">
        <Text slot="label">Free</Text>
        <Text slot="description">For small teams trying things out.</Text>
      </SelectList.Item>
      <SelectList.Item id="pro" textValue="Pro">
        <Text slot="label">Pro</Text>
        <Text slot="description">
          For teams up to 50 members with priority support.
        </Text>
      </SelectList.Item>
      <SelectList.Item id="enterprise" textValue="Enterprise">
        <Text slot="label">Enterprise</Text>
        <Text slot="description">
          For organizations that need advanced controls and SLAs.
        </Text>
      </SelectList.Item>
    </SelectList>
  ),
});

export const WithImage = meta.story({
  render: args => (
    <SelectList aria-labelledby="SelectList" {...args}>
      <SelectList.Item id="mastercard" textValue="Mastercard">
        <img
          alt=""
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
        />
        <Text slot="label">Mastercard</Text>
        <Text slot="description">
          You can use this card with a label and a description.
        </Text>
      </SelectList.Item>
      <SelectList.Item id="visa" textValue="Visa">
        <img
          alt=""
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/200px-Visa_Logo.png"
        />
        <Text slot="label">Visa</Text>
        <Text slot="description">
          You can use this card with a label and a description.
        </Text>
      </SelectList.Item>
    </SelectList>
  ),
});

export const Bordered = meta.story({
  args: {
    variant: 'bordered',
  },
  render: args => (
    <SelectList aria-labelledby="SelectList" {...args}>
      <SelectList.Item id="free" textValue="Free">
        <Text slot="label">Free</Text>
        <Text slot="description">For small teams trying things out.</Text>
      </SelectList.Item>
      <SelectList.Item id="pro" textValue="Pro">
        <Text slot="label">Pro</Text>
        <Text slot="description">
          For teams up to 50 members with priority support.
        </Text>
      </SelectList.Item>
      <SelectList.Item id="enterprise" textValue="Enterprise">
        <Text slot="label">Enterprise</Text>
        <Text slot="description">
          For organizations that need advanced controls and SLAs.
        </Text>
      </SelectList.Item>
    </SelectList>
  ),
});

let rows = [
  { id: 1, name: 'Games' },
  { id: 2, name: 'Program Files' },
  { id: 3, name: 'bootmgr' },
  { id: 4, name: 'log.txt' },
];

export const Action = meta.story({
  render: args => (
    <SelectList
      aria-labelledby="SelectList"
      selectionMode="multiple"
      {...args}
      items={rows}
    >
      {(item: { id: number; name: string }) => (
        <SelectList.Item textValue={item.name}>
          <SelectList.Action>
            <Button
              aria-label="Info"
              onPress={() => alert(`Info for ${item.name}...`)}
            >
              <Info size={20} />
            </Button>
          </SelectList.Action>
          {item.name}
        </SelectList.Item>
      )}
    </SelectList>
  ),
});
