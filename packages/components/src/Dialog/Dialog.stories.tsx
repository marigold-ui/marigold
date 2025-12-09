import { useState } from 'storybook/preview-api';
import { expect, waitFor } from 'storybook/test';
import preview from '../../../../config/storybook/.storybook/preview';
import { Button } from '../Button/Button';
import { Menu } from '../Menu/Menu';
import { Text } from '../Text/Text';
import { TextField } from '../TextField/TextField';
import { ConfirmationDialog } from './ConfirmationDialog';
import { Dialog } from './Dialog';

const meta = preview.meta({
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {
    size: {
      control: {
        type: 'radio',
      },
      description: 'Size of the dialog',
      options: ['default', 'xsmall', 'small', 'medium'],
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    dismissable: true,
    keyboardDismissable: true,
    size: 'small',
  },
});

export const Basic = meta.story({
  render: ({ size, ...args }) => (
    <Dialog.Trigger {...args}>
      <Button variant="primary">Open</Button>
      <Dialog size={size} closeButton>
        <Dialog.Title>Enable notifications</Dialog.Title>
        <Dialog.Content>
          Would you like to receive notifications for upcoming events and
          updates?
        </Dialog.Content>
        <Dialog.Actions>
          <Button variant="secondary" slot="close">
            Cancel
          </Button>
          <Button variant="primary" slot="close">
            Enable
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Dialog.Trigger>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(canvas.getByRole('dialog')).toBeInTheDocument());

    await userEvent.click(canvas.getByRole('button', { name: 'Cancel' }));
    await waitFor(() =>
      expect(canvas.queryByRole('dialog')).not.toBeInTheDocument()
    );
  },
});

export const Form = meta.story({
  render: ({ size, ...args }) => {
    return (
      <Dialog.Trigger {...args}>
        <Button variant="primary">Open</Button>
        <Dialog size={size} closeButton>
          <Dialog.Title>Please log into account</Dialog.Title>
          <Dialog.Content>
            <TextField label="Username" />
            <TextField label="Password" type="password" />
          </Dialog.Content>
          <Dialog.Actions>
            <Button slot="close" variant="secondary">
              Cancel
            </Button>
            <Button
              variant="primary"
              slot="close"
              onPress={() => alert('Dialog will be closed')}
            >
              Login
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Dialog.Trigger>
    );
  },
});

export const OpenFromMenu = meta.story({
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setDialogOpen] = useState(false);
    const handleAction = (action: 'save' | 'delete') => {
      switch (action) {
        case 'save':
          alert('saved!');
          break;
        case 'delete':
          setDialogOpen(true);
          break;
        default:
          throw new Error(`Unhandled action "${action}"!`);
      }
    };

    return (
      <>
        <Menu onAction={handleAction} label="Settings">
          <Menu.Item key="save" id="save">
            Save
          </Menu.Item>
          <Menu.Item key="delete" id="delete">
            Delete
          </Menu.Item>
        </Menu>
        <Dialog open={open} onOpenChange={setDialogOpen} closeButton>
          {({ close }) => (
            <>
              <Dialog.Title>Confirm delete</Dialog.Title>
              <Dialog.Content>
                <Text>Do you really wanna delete this?</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button slot="close">Cancel</Button>
                <Button variant="destructive" onPress={close}>
                  Delete
                </Button>
              </Dialog.Actions>
            </>
          )}
        </Dialog>
      </>
    );
  },
});

export const Confirmation = meta.story({
  render: ({ ...args }) => (
    <ConfirmationDialog.Trigger {...args}>
      <Button>Open</Button>
      <ConfirmationDialog title="Confirmation" confirmationLabel="Confirm">
        Are you sure you want to proceed with this action?
      </ConfirmationDialog>
    </ConfirmationDialog.Trigger>
  ),
});

export const VeryLongContent = meta.story({
  tags: ['component-test'],
  render: args => {
    const { size, ...triggerArgs } = args;
    return (
      <Dialog.Trigger {...triggerArgs}>
        <Button variant="primary">Open Dialog with Long Content</Button>
        <Dialog size={size} closeButton>
          <Dialog.Title>Terms and Conditions</Dialog.Title>
          <Dialog.Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Text>
            <Text>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </Text>
            <Text>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
              non numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem.
            </Text>
            <Text>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur, vel illum
              qui dolorem eum fugiat quo voluptas nulla pariatur?
            </Text>
            <Text>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga.
            </Text>
            <Text>
              Et harum quidem rerum facilis est et expedita distinctio. Nam
              libero tempore, cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus id quod maxime placeat facere possimus, omnis
              voluptas assumenda est, omnis dolor repellendus.
            </Text>
            <Text>
              Temporibus autem quibusdam et aut officiis debitis aut rerum
              necessitatibus saepe eveniet ut et voluptates repudiandae sint et
              molestiae non recusandae. Itaque earum rerum hic tenetur a
              sapiente delectus, ut aut reiciendis voluptatibus maiores alias
              consequatur aut perferendis doloribus asperiores repellat.
            </Text>
            <Text>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit.
            </Text>
            <Text>
              Sed quia non numquam eius modi tempora incidunt ut labore et
              dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur.
            </Text>
            <Text>
              Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At
              vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi.
            </Text>
            <Text>
              Id est laborum et dolorum fuga. Et harum quidem rerum facilis est
              et expedita distinctio. Nam libero tempore, cum soluta nobis est
              eligendi optio cumque nihil impedit quo minus id quod maxime
              placeat facere possimus, omnis voluptas assumenda est, omnis dolor
              repellendus.
            </Text>
            <Text>
              Temporibus autem quibusdam et aut officiis debitis aut rerum
              necessitatibus saepe eveniet ut et voluptates repudiandae sint et
              molestiae non recusandae. Itaque earum rerum hic tenetur a
              sapiente delectus, ut aut reiciendis voluptatibus maiores alias
              consequatur aut perferendis doloribus asperiores repellat.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Text>
            <Text>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Sed ut perspiciatis
              unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </Text>
            <Text>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
              ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia
              non numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem.
            </Text>
            <Text>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea
              voluptate velit esse quam nihil molestiae consequatur, vel illum
              qui dolorem eum fugiat quo voluptas nulla pariatur?
            </Text>
            <Text>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button variant="secondary" slot="close">
              Decline
            </Button>
            <Button variant="primary" slot="close">
              Accept
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Dialog.Trigger>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('Open Dialog with Long Content'));

    await waitFor(() => {
      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog).toBeVisible();
    });

    const dialog = document.querySelector('[role="dialog"]')!;

    const dialogContent = dialog.querySelector(
      '[data-testid="dialog-content"]'
    )!;
    expect(dialogContent.scrollHeight).toBeGreaterThan(
      dialogContent.clientHeight
    );

    // Test scroll functionality - scroll to bottom
    dialogContent.scrollTop = dialogContent.scrollHeight;
    expect(dialogContent.scrollTop).toBeGreaterThan(0);
  },
});
