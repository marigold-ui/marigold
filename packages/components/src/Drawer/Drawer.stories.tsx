import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Form } from '../Form/Form';
import { Select } from '../Select/Select';
import { Slider } from '../Slider/Slider';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { Drawer, DrawerProps } from './Drawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    placement: {
      control: {
        type: 'radio',
      },
      description: 'The placement of the drawer on the screen.',
      options: ['right', 'left', 'top', 'bottom'],
    },
    size: {
      control: {
        type: 'radio',
      },
      description: 'The size of the drawer on the screen.',
      options: ['xsmall', 'small', 'medium'],
    },
  },
  args: {},
} satisfies Meta<DrawerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Stack space={8} alignX="left">
      <Drawer.Trigger>
        <Button>Open Drawer</Button>
        <Drawer {...args}>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Content>
            <p className="pb-4">
              Once upon a time in the quirky world of web design, there lived a
              lively Drawer Component named Daria. Unlike her staid companions,
              she loved to make a grand entrance by sliding in from the left,
              declaring, "Surprise! I've got filters and puns galore!"
            </p>

            <p className="pb-4">
              Every time a user clicked, Daria would pop out with flair, showing
              off her hidden treasures while her neighboring components—Header
              the Bold and Footer the Wise—watched in amused awe. They’d chuckle
              as Daria’s witty remarks filled the space between content
              sections.
            </p>

            <p className="pb-4">
              One day, Daria got a bit too excited. In a burst of enthusiasm,
              she slid out so fast that she disrupted the perfect grid layout!
              The Main Content, usually so composed, was thrown into disarray,
              muttering about lost pixels and wayward margins.
            </p>

            <p className="pb-4">
              But instead of sulking, Daria quipped, "Looks like I just broke
              the grid—guess I'm too stylish to be confined!" The users,
              entertained by her antics, cheered on as she restored order with a
              graceful slide back, proving that even a mischievous drawer could
              be the hero of responsive design.
            </p>
          </Drawer.Content>
          <Drawer.Actions>
            <Button slot="close">Close</Button>
            <Button
              slot="close"
              variant="primary"
              onPress={() => alert('Drawer will be closed')}
            >
              Save
            </Button>
          </Drawer.Actions>
        </Drawer>
      </Drawer.Trigger>
      <TextField
        label="Name"
        description="Can you interact with me when the drawer is open?"
        width={80}
      />
    </Stack>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open Drawer' }));
    await waitFor(() =>
      expect(canvas.getByText('Drawer Title')).toBeInTheDocument()
    );

    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
  },
};

export const LeftPlacement: Story = {
  args: {
    placement: 'left',
  },
  render: args => (
    <Drawer.Trigger>
      <Button>Open Left Drawer</Button>
      <Drawer {...args}>
        <Drawer.Title>Left Drawer</Drawer.Title>
        <Drawer.Content>
          <Stack space={8}>
            <Text>This drawer slides in from the left side of the screen.</Text>
            <Text>
              It's perfect for navigation menus or additional controls that
              should be easily accessible.
            </Text>
          </Stack>
        </Drawer.Content>
        <Drawer.Actions>
          <Button slot="close">Close</Button>
          <Button slot="close" variant="primary">
            Confirm
          </Button>
        </Drawer.Actions>
      </Drawer>
    </Drawer.Trigger>
  ),
};

export const WithForms: Story = {
  render: args => (
    <Drawer.Trigger>
      <Button>Configure Filter</Button>
      <Drawer {...args}>
        <Form unstyled>
          <Drawer.Title>Filter</Drawer.Title>
          <Drawer.Content>
            <Stack space={8}>
              <Slider
                label="Price"
                formatOptions={{ style: 'currency', currency: 'EUR' }}
                minValue={10}
                maxValue={140}
                defaultValue={[30, 60]}
                thumbLabels={['min', 'max']}
              />
              <Select label="Category">
                <Select.Option id="all">All</Select.Option>
                <Select.Option id="classic">Classic</Select.Option>
                <Select.Option id="rock">Rock</Select.Option>
                <Select.Option id="pop">Pop</Select.Option>
                <Select.Option id="jazz">Jazz</Select.Option>
              </Select>
              <Checkbox.Group label="Amenities">
                <Checkbox label="Fast Lane" value="fast-lane" />
                <Checkbox label="VIP Parking" value="parking" />
              </Checkbox.Group>
            </Stack>
          </Drawer.Content>
          <Drawer.Actions>
            <Button slot="close">Close</Button>
            <Button
              slot="close"
              variant="primary"
              onPress={() => alert('Apply filters and close dialog')}
            >
              Apply
            </Button>
          </Drawer.Actions>
        </Form>
      </Drawer>
    </Drawer.Trigger>
  ),
};

export const Controlled: Story = {
  render: args => {
    const [open, setOpen] = useState(false);
    const onOpenChange = (open: boolean) => {
      console.log('open', open);
      setOpen(open);
    };
    return (
      <Stack space={8} alignX="left">
        <Drawer.Trigger open={open} onOpenChange={onOpenChange}>
          <Button>Open Drawer</Button>
          <Drawer {...args}>
            <Drawer.Title>Drawer Title</Drawer.Title>
            <Drawer.Content>Drawer Content</Drawer.Content>
            <Drawer.Actions>
              <Button slot="close">Close</Button>
              <Button variant="primary">Apply</Button>
            </Drawer.Actions>
          </Drawer>
        </Drawer.Trigger>
        <pre>Drawer is {open ? 'open' : 'closed'}</pre>
      </Stack>
    );
  },
};
