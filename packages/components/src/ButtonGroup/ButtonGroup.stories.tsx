import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Edit } from '@marigold/icons';
import { Button } from '../Button/Button';
import { ActionMenu } from '../Menu/ActionMenu';
import { ButtonGroup } from './ButtonGroup';

const meta = preview.meta({
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['ghost', 'secondary', 'destructive-ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'small', 'large', 'icon'],
    },
    disabled: { control: { type: 'boolean' } },
  },
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: () => (
    <ButtonGroup aria-label="Item actions">
      <Button aria-label="Edit">
        <Edit />
      </Button>
      <Button aria-label="Duplicate">Duplicate</Button>
      <Button aria-label="Delete">Delete</Button>
    </ButtonGroup>
  ),
});

Basic.test(
  'renders a labelled toolbar with all its buttons',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const toolbar = canvas.getByRole('toolbar', { name: 'Item actions' });
    const buttons = canvas.getAllByRole('button');

    await expect(toolbar).toBeInTheDocument();
    await expect(buttons).toHaveLength(3);
  }
);

Basic.test(
  'arrow keys move focus between buttons',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas, userEvent }) => {
    const [first, second, third] = canvas.getAllByRole('button');
    first.focus();

    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{ArrowRight}');

    await expect(second).not.toHaveFocus();
    await expect(third).toHaveFocus();
  }
);

export const DisabledCascade = meta.story({
  tags: ['component-test'],
  render: () => (
    <ButtonGroup aria-label="Disabled actions" disabled>
      <Button aria-label="Edit">Edit</Button>
      <Button aria-label="Delete">Delete</Button>
    </ButtonGroup>
  ),
});

DisabledCascade.test(
  'cascades disabled to every button',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button');

    for (const button of buttons) {
      await expect(button).toBeDisabled();
    }
  }
);

// Uniform precedence: a local prop ALWAYS wins over the group — including
// `size` (which is the change from the former `ActionGroup`, where the group
// won `size`).
export const CascadePrecedence = meta.story({
  render: () => (
    <ButtonGroup
      aria-label="Cascade precedence"
      size="small"
      variant="ghost"
      disabled
    >
      <Button aria-label="Outsized" size="large">
        Outsized
      </Button>
      <Button aria-label="Delete" variant="destructive-ghost">
        Delete
      </Button>
      <Button aria-label="Save" disabled={false}>
        Save
      </Button>
    </ButtonGroup>
  ),
});

export const WithActionMenu = meta.story({
  render: () => (
    <ButtonGroup aria-label="With ActionMenu" size="small" variant="ghost">
      <Button aria-label="Edit">Edit</Button>
      <Button aria-label="Duplicate">Duplicate</Button>
      <ActionMenu aria-label="More actions">
        <ActionMenu.Item id="archive">Archive</ActionMenu.Item>
        <ActionMenu.Item id="delete">Delete</ActionMenu.Item>
      </ActionMenu>
    </ButtonGroup>
  ),
});

// Fixture for the "local size wins" unit test, so not snapshotted. The ActionMenu
// sets an explicit `size="large"` that must beat the group's `small`, which
// `WithActionMenu` (its trigger inherits the group size) can't assert.
export const ActionMenuLocalSize = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <ButtonGroup aria-label="Item actions" size="small" variant="ghost">
      <Button aria-label="Edit">Edit</Button>
      <ActionMenu aria-label="More actions" size="large">
        <ActionMenu.Item id="archive">Archive</ActionMenu.Item>
        <ActionMenu.Item id="delete">Delete</ActionMenu.Item>
      </ActionMenu>
    </ButtonGroup>
  ),
});
