import { Item } from '@react-stately/collections';
import { useListData } from '@react-stately/data';
import { ComboboxMultiBase } from './Combobox';

const meta = {
  title: 'Components/Multi',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Set the label of the Combobox',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: '' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Set the help text description.',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disable ComboBox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input invalid?',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Set the Error Message',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'Set the placeholder text',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'undefined' },
      },
    },
    menuTrigger: {
      control: {
        type: 'select',
      },
      options: ['focus', 'input', 'manual'],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'input' },
      },
      description: 'Set which interaction shows the menu',
    },
    width: {
      control: {
        type: 'text',
      },
      description:
        'The width of the field. For that we use the Tailwind tokens.',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'full' },
      },
    },
  },
  args: {
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
    error: false,
    disabled: false,
    width: 'full',
    menuTrigger: 'input',
    placeholder: undefined,
    label: 'Label',
  },
};

export default meta;

export const Basic = {
  render: () => {
    const fruits = [
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Banana' },
      { id: 3, name: 'Cherry' },
      { id: 4, name: 'Date' },
      { id: 5, name: 'Elderberry' },
      { id: 6, name: 'Fig' },
      { id: 7, name: 'Grape' },
      { id: 8, name: 'Honeydew' },
      { id: 9, name: 'Kiwi' },
      { id: 10, name: 'Lemon' },
      { id: 11, name: 'Mango' },
      { id: 12, name: 'Nectarine' },
      { id: 13, name: 'Orange' },
      { id: 14, name: 'Papaya' },
      { id: 15, name: 'Quince' },
      { id: 16, name: 'Raspberry' },
      { id: 17, name: 'Strawberry' },
      { id: 18, name: 'Tangerine' },
      { id: 19, name: 'Ugli Fruit' },
      { id: 20, name: 'Watermelon' },
    ];
    const selectedItems = useListData<any>({
      initialItems: [fruits[0]],
    });
    return (
      <div>
        <ComboboxMultiBase>
          <Item key="One">One</Item>
          <Item key="Two">Two</Item>
        </ComboboxMultiBase>
      </div>
    );
  },
};
